import { api as apiConfig } from 'config'
import { envFlag } from 'services/environment'
import { PromiseQueue } from 'services/promiseQueue'
import { isPrerendering } from 'services/prerender'
import {
  IJob,
  IFreelancer,
  ILink,
  IFreelancerType,
  IFreelancerSubtype,
  IContractForClient,
  IContractForFreelancer,
  ICurrentUser,
  IFirm,
  IClient,
  IContractRequest,
  IClientInvoice,
  ITimesheetForClient,
  ISkill,
  ICandidate,
  IContractStatsForClient,
  IReferral,
  IChatThread,
  IChatMessage,
  IEmailSubscription,
  IJobIntegrationType,
  IBillingPlan,
  IAPIError,
  IPaymentMethod,
  IPaymentMethodType,
} from 'types'
import { ReduxStore } from 'Store'
import { trackError, trackEvent } from 'services/analytics'
import { isCypress } from 'services/browserAgent'
import { IResponseWithHeaders } from './responseWithHeaders'

// Wait this amount of time when retrying requests. Each failed retry sums this amount
// To the wait time
const REQUEST_RETRY_WAIT_MS = 1000

const SERVICE_UNAVAILABLE_ERROR = 'Oops! All our servers are busy. Please try again in a short while'

export function getBaseURL(): string {
  return isPrerendering() ? (process.env.BACKEND_API_ROOT_URL || process.env.API_ROOT_URL) : process.env.API_ROOT_URL
}

function waitMs(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * @deprecated use Relay instead
 */
export default class FlexhireAPI {
  baseUrl: string;

  requestQueue?: any;

  cookie?: string;

  store: ReduxStore;

  constructor(cookie = null, store = null) {
    this.cookie = cookie
    this.store = store
    this.baseUrl = getBaseURL()
    if (envFlag(process.env.FLEXHIRE_QUEUE_API_CALLS)) {
      // Queue requests to avoid rails backend freezing in dev mode (probably because of code-reload).
      this.requestQueue = new PromiseQueue()
    }
  }

  private async fetchWithRetry(url: string, settings: RequestInit, maxTries: number = 0) : Promise<Response> {
    let response: Response
    let timesTried = 0
    let waitTime = 0
    while (timesTried === 0 || timesTried < maxTries) {
      try {
        timesTried++
        waitTime += REQUEST_RETRY_WAIT_MS
        if (timesTried > 1) {
          if (waitTime > 0) {
            console.log(`Waiting ${waitTime}ms before retrying request`)
            await waitMs(waitTime)
          }
          console.log(`Retrying request: try #${timesTried}`)
        }
        response = await fetch(url, settings)
        if ([502, 503, 504].indexOf(response.status) < 0) break
      } catch (error) {
        if (timesTried >= maxTries) throw error
      }
    }
    return response
  }

  private perform(url: string, settings: RequestInit) : Promise<Response> {
    const maxTries = settings.method === 'GET' ? 3 : 0
    if (this.requestQueue) {
      return this.requestQueue.enqueue((resolve, reject) => this.fetchWithRetry(url, settings, maxTries).then(resolve).catch(reject))
    }
    return this.fetchWithRetry(url, settings, maxTries)
  }

  private getAuthHeaders() {
    if (this.cookie && isPrerendering()) {
      return {
        Cookie: this.cookie,
      }
    }
    return {}
  }

  private getLogRocketHeaders() {
    if (!isPrerendering()) {
      const logRocketSessionURL = (window as any).logrocketsessionurl
      if (logRocketSessionURL) {
        return {
          'X-LogRocket-URL': logRocketSessionURL,
        }
      }
    }
    return {}
  }

  private async execute<T = any>(path: string, payload?: any, method?: string, options: any = {}) : Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
      ...this.getLogRocketHeaders(),
    }
    if (isCypress()) headers.Cypress = 'true'
    const settings: RequestInit = {
      method,
      headers,
      credentials: 'include', // https://github.com/developit/unfetch#fetchurl-string-options-object
    }
    if (options.isFormData) {
      // Delete it to avoid this bug with multipart forms
      // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
      delete settings.headers['Content-Type']
    }
    if (method !== 'GET') {
      settings.body = options.isFormData ? payload : JSON.stringify(payload)
    }
    let response: Response
    try {
      const fullPath = path.startsWith('http') ? path : this.baseUrl + path
      response = await this.perform(fullPath, settings)
    } catch (error) {
      // This happens if the backend is unreachable for network reasons
      if (isPrerendering()) {
        error.response = 'Something went wrong. Please try again'
      } else {
        error.response = 'Could not reach Flexhire. Check your internet connection'
      }
      throw error
    }
    const responseBody = await this.getResponseBody(response) // this parses the response body if it's JSON
    this.dispatchServerAction(responseBody) // this dispatches a redux action if the server included it in the response
    this.handleServerError(response, responseBody) // This throws the proper error if the response code was not ok
    return options.transformResponse ? options.transformResponse(response, responseBody) : responseBody
  }

  private async getResponseBody(response) {
    if (response.status === 204) return null
    if (response.headers.get('content-type').match(/^application\/json(;|$)/)) {
      try {
        return await response.json()
      } catch (e) {
        const error: any = new Error() // TODO: create a IError interface for errors with a message
        error.response = 'Could not read server response'
        error.message = `Error during response JSON parse: ${e.message}`
        console.error(`API Response Body Parsing Error: ${error.response} - ${error.message}`)
        throw error
      }
    }
    return null
  }

  private async downloadFile(url: string, filename: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      credentials: 'include', // https://github.com/developit/unfetch#fetchurl-string-options-object
    })
    // In case a JSON is returned, we get its value in order to do error display to the user
    const body = await this.getResponseBody(response)
    await this.handleServerError(response, body)
    const blob = await response.blob()
    const objectURL = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectURL
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  private dispatchServerAction(responseBody) {
    try {
      const action = responseBody?.dispatch
      if (typeof action?.type === 'string') {
        const dispatch = this.store?.dispatch
        if (typeof dispatch === 'function') dispatch(action)
      }
    } catch (error) {
      trackError(error)
    }
  }

  private handleServerError(response, responseBody) {
    if (response.ok) return null
    const error = new Error() as IAPIError
    error.name = responseBody?.error_type || 'GenericAPIError'
    error.code = response.status
    error.message = response.statusText
    error.response = responseBody?.error || responseBody?.message
    // For 422 and other codes, there is no status text associated
    // In those cases we try to make up some error message
    if (!error.message) {
      error.message = error.response || (response.status ? `Error Code ${response.status}` : 'Unknown Error')
    }
    if ([502, 503, 504].indexOf(response.status) >= 0) {
      // TODO: dispatch an action in this case so that we can display some special UI message.
      if (!error.response) error.response = SERVICE_UNAVAILABLE_ERROR
    }
    console.error(`${error.message} ${error.response}`)
    throw error
  }

  private getBodyWithHeaders(response, responseBody) {
    return {
      body: responseBody,
      headers: {
        totalCount: Number(response.headers.get('x-total-count')),
      },
    }
  }

  // Generic handlers

  // eslint-disable-next-line arrow-parens
  getWithHeaders = <T = any>(path: string, payload: any = {}): Promise<IResponseWithHeaders<T[]>> => {
    return this.execute(path, payload, 'GET', { transformResponse: this.getBodyWithHeaders })
  }

  get = <T = any>(path: string, payload: any = {}) => this.execute<T>(path, payload, 'GET')

  post = (path: string, payload?: any) => this.execute(path, payload, 'POST')

  postForm = (path: string, payload: any) => this.execute(path, payload, 'POST', { isFormData: true })

  put = (path: string, payload: any) => this.execute(path, payload, 'PUT')

  patch = (path: string, payload: any = {}) => this.execute(path, payload, 'PATCH', () => {})

  delete = (path: string, payload: any = {}) => this.execute(path, payload, 'DELETE')

  // API Calls

  getBillingPlans() {
    return this.get<IBillingPlan[]>(apiConfig.routes.billing_plans.index)
  }

  getContracts(params?: any): Promise<IContractForClient[] | IContractForFreelancer[]> {
    return this.get(apiConfig.routes.contracts.index(params))
  }

  getContractsPaginated(params?: any) {
    return this.getWithHeaders<IContractForClient | IContractForFreelancer>(apiConfig.routes.contracts.index(params))
  }

  getContractStats(): Promise<IContractStatsForClient> {
    return this.get(apiConfig.routes.contracts.stats)
  }

  deleteContract = (id: number) => this.delete(apiConfig.routes.contracts.member(id))

  getConfiguration() {
    return this.get(apiConfig.routes.configuration.index)
  }

  getVideo(id: number) {
    return this.get(apiConfig.routes.videos.member(id))
  }

  updateVideo(id: number, formData: any) {
    return this.put(apiConfig.routes.videos.member(id), formData)
  }

  deleteVideo(id: number) {
    return this.delete(apiConfig.routes.videos.member(id))
  }

  /**
   * Upload video to Rails backend directly
   * @param {FormData} formData
   */
  postVideoUpload = async (formData) => {
    trackEvent('Video Upload Start')
    const video = await this.postForm(apiConfig.routes.videos.upload, formData)
    trackEvent('Video Upload Completed')
    return video
  }

  parseResume = async (userId: number, data, waitForProcessing = false) : Promise<IFreelancer> => {
    // Use this to upload a json with the URL to the resume
    let freelancer : IFreelancer = await this.post(apiConfig.routes.users.parse_resume(userId), data)
    const retryStatuses = ['unprocessed', 'processing_queued', 'processing']
    while (retryStatuses.includes(freelancer.resume.status) && waitForProcessing) {
      await new Promise(resolve => window.setTimeout(resolve, 2000))
      freelancer = await this.getFreelancer(freelancer.id)
    }
    return freelancer
  }

  toggleHidden(id: number) {
    return this.post(apiConfig.routes.freelancers.toggleHidden(id))
  }

  getSkills(params?: any) : Promise<ISkill[]> {
    return this.get(apiConfig.routes.skills.index(params))
  }

  getFeaturedSkills() : Promise<ISkill[]> {
    return this.get(apiConfig.routes.skills.featured)
  }

  getSkillBySlug(slug) : Promise<ISkill> {
    return this.get(apiConfig.routes.skills.member(slug))
  }

  suggestSkill(data: Partial<ISkill>) {
    return this.post(apiConfig.routes.skills.suggest, { skill: data })
  }

  getBlogPost(id: number) {
    return this.get(apiConfig.routes.blog.posts.member(id))
  }

  getBlogPostsForCategory(categoryID) {
    return this.get(apiConfig.routes.blog.categories.posts(categoryID))
  }

  getRecentBlogPosts() {
    return this.get(apiConfig.routes.blog.posts.recent)
  }

  getMyBlogPosts() {
    return this.get(apiConfig.routes.blog.posts.my_posts)
  }

  createBlogPost(data) {
    return this.post(apiConfig.routes.blog.posts.create, { blog_post: data })
  }

  updateBlogPost(id, data) {
    return this.post(apiConfig.routes.blog.posts.update(id), { blog_post: data })
  }

  publishBlogPost(id, data) {
    return this.post(apiConfig.routes.blog.posts.publish(id), { blog_post: data })
  }

  deleteBlogPost(id: number) {
    return this.delete(apiConfig.routes.blog.posts.member(id))
  }

  getBlogCategories() {
    return this.get(apiConfig.routes.blog.categories.index)
  }

  getBlogCategory(id: number) {
    return this.get(apiConfig.routes.blog.categories.member(id))
  }

  getQuestions(filters) {
    return this.getWithHeaders(apiConfig.routes.questions.index(filters))
  }

  createQuestion(data) {
    return this.post(apiConfig.routes.questions.index(), { question: data })
  }

  getFeaturedQuestionCategories() {
    return this.get(apiConfig.routes.questions.featured_categories)
  }

  getQuestionsFeaturedInCategory(slug: string) {
    return this.get(apiConfig.routes.questions.featured_in({ slug }))
  }

  unsubscribe(token: string) {
    return this.get(apiConfig.routes.users.email_subscriptions.unsubscribe(token))
  }

  // Freelancer

  sendAvailabilityAndRateForm(formData: any) {
    return this.post(apiConfig.routes.users.update_availability, { user: formData })
  }

  getFreelancer(id: number): Promise<IFreelancer> {
    return this.get(apiConfig.routes.freelancers.member(id))
  }

  getMember(slug: string, subslug?: string, params?: any) : Promise<IJob | IFirm | IFreelancer> {
    return this.get(apiConfig.routes.members.show(slug, subslug), params)
  }

  getTopFreelancers(params?: any): Promise<IFreelancer[]> {
    return this.get(apiConfig.routes.freelancers.topFreelancers(params))
  }

  getTopFreelancerById(id?: number): Promise<IFreelancer> {
    return this.get(apiConfig.routes.freelancers.freelancerProfile(id))
  }

  getTopFreelancersBySkill(skillId?: number, freelancerTypeId?: number) : Promise<IFreelancer[]> {
    return this.get(apiConfig.routes.freelancers.topFreelancersBySkill(skillId, freelancerTypeId))
  }

  getProfile(id: number) {
    return this.get(apiConfig.routes.profile.member(id))
  }

  getFreelancerTimesheets(params) {
    return this.getWithHeaders(apiConfig.routes.timesheets.freelancer(params))
  }

  getTimesheetStats() {
    return this.get(apiConfig.routes.timesheets.stats)
  }

  sendSubmitTimesheet(id: number) {
    return this.post(apiConfig.routes.timesheets.submit(id))
  }

  rejectContract(id, formData) {
    return this.post(apiConfig.routes.contracts.reject(id), { contract: formData })
  }

  getInstitutes(params?: any) {
    return this.get(apiConfig.routes.institutes.index(params))
  }

  getNames(params?: any) {
    return this.get(apiConfig.routes.names.index(params))
  }

  getSubmittedProjects() {
    return this.get(apiConfig.routes.project_submissions.index())
  }

  sendProfileProjectForm(project, submission) {
    return this.post(apiConfig.routes.project_submissions.index(), { project, project_submission: submission })
  }

  // references page
  getReferences() {
    return this.get(apiConfig.routes.references.index)
  }

  sendProfileReferenceForm(formData) {
    return this.post(apiConfig.routes.references.index, { reference: formData })
  }

  sendDeleteReference(id: number) {
    return this.delete(apiConfig.routes.references.member(id))
  }

  sendProfileGiveReferenceForm(formData) {
    return this.post(apiConfig.routes.references.complete, { reference: formData })
  }

  sendSubmitProfile() {
    return this.post(apiConfig.routes.users.submit_profile)
  }

  // screening
  sendStartApplication() {
    return this.post(apiConfig.routes.users.start_application)
  }

  sendSubmitApplication() {
    return this.post(apiConfig.routes.users.submit_application)
  }

  sendCancelApplication() {
    return this.post(apiConfig.routes.users.cancel_application)
  }

  sendTimesheet(formData) {
    return this.post(apiConfig.routes.timesheets.index, { timesheet: formData })
  }

  sendUpdateTimesheet(id, formData) {
    return this.put(apiConfig.routes.timesheets.member(id), { timesheet: formData })
  }

  updateUser(id: number, formData: Partial<IFreelancer | IClient | ICurrentUser>) : Promise<IClient | ICurrentUser> {
    return this.post(apiConfig.routes.users.update, { id, user: formData })
  }

  adminUpdateUser(id: number, formData: any) : Promise<ICurrentUser> {
    return this.put(apiConfig.routes.admin.users.member(id), formData)
  }

  autosaveFreelancer(formData: Partial<IFreelancer>) {
    return this.post(apiConfig.routes.users.autosave_freelancer, { user: formData })
  }

  sendFeedback(formData) {
    return this.post(apiConfig.routes.feedbacks.index, { feedback: formData })
  }

  sendRejectFreelancer(id, formData) {
    return this.post(apiConfig.routes.contracts.reject_freelancer(id), formData)
  }

  acceptContract(id, formData) {
    return this.post(apiConfig.routes.contracts.accept(id), { contract: formData })
  }

  applyUserToJob(jobId: number | string, params?: any) {
    return this.post(apiConfig.routes.jobs.apply(jobId, params))
  }

  downloadFreelancer1099PDF() : Promise<void> {
    return this.downloadFile(apiConfig.routes.users.download_1099_pdf, 'member_1099.pdf')
  }

  getScreeningInterviews(params) {
    return this.getWithHeaders(apiConfig.routes.screening_interviews.index(params))
  }

  getCurrentScreeningInterview() {
    return this.get(apiConfig.routes.screening_interviews.current)
  }

  bookScreeningInterview(id: number) {
    return this.post(apiConfig.routes.screening_interviews.book(id))
  }

  postponeScreeningInterview(id, reason) {
    return this.post(apiConfig.routes.screening_interviews.postpone(id), { reason })
  }

  getScreeningAssignments() {
    return this.get(apiConfig.routes.project.index({ screening: true }))
  }

  submitProjectSubmission(projectId, projectSubmission) {
    return this.post(apiConfig.routes.project_submissions.index(), { project_id: projectId, project_submission: projectSubmission })
  }

  updateProjectSubmission(id, params) {
    return this.put(apiConfig.routes.project_submissions.member(id), params)
  }

  deleteProjectSubmission(id: number) {
    return this.delete(apiConfig.routes.project_submissions.member(id))
  }

  getProjectSubmissionForProject(projectId) {
    return this.get(apiConfig.routes.project_submissions.index({ project_id: projectId }))
  }

  getProjectSubmissionURLValidity(url) {
    return this.get(apiConfig.routes.project_submissions.validate_project_submission_url(url))
  }

  getReferral(token: string) : Promise<IReferral> {
    return this.get(apiConfig.routes.referrals.member(token))
  }

  shareJob(slug: string | number) {
    return this.get(apiConfig.routes.referrals.share_job(slug))
  }

  getLink(token: string) : Promise<ILink> {
    return this.get(apiConfig.routes.links.member(token))
  }

  createLink(freelancerId: number, jobId: number) : Promise<ILink> {
    return this.post(apiConfig.routes.links.index, { freelancer_id: freelancerId, job_id: jobId })
  }

  inviteFriend(email) {
    return this.get(apiConfig.routes.referrals.invite_friend(email))
  }

  getFreelancerTypes() : Promise<IFreelancerType[]> {
    return this.get(apiConfig.routes.freelancer_types.index)
  }

  getFreelancerSubtypes(freelancerTypeId?: number) : Promise<IFreelancerSubtype[]> {
    return this.get(apiConfig.routes.freelancer_subtypes.index(freelancerTypeId))
  }

  getScreeningQuestions() {
    return this.get(apiConfig.routes.questions.screening)
  }

  getSuggestedQuestions() {
    return this.get(apiConfig.routes.questions.suggested)
  }

  // Client

  getDiscount = code => this.get(apiConfig.routes.discount.show(code))

  getJobs(params?: any): Promise<IJob[]> {
    return this.get(apiConfig.routes.jobs.index(params))
  }

  getJobsPaginated(params?: any): Promise<IResponseWithHeaders<IJob[]>> {
    return this.getWithHeaders(apiConfig.routes.jobs.index(params))
  }

  getJob(jobId): Promise<IJob> {
    return this.get(apiConfig.routes.jobs.member(jobId))
  }

  getTags() {
    return this.get(apiConfig.routes.tags.index)
  }

  getMembersPipeline(params?: any) {
    return this.getWithHeaders(apiConfig.routes.members_pipeline.index(params))
  }

  getJobCandidates(params?: any) {
    return this.getWithHeaders<ICandidate>(apiConfig.routes.jobs.candidates(params))
  }

  getDirectApplications(params: any = {}) {
    return this.getWithHeaders(apiConfig.routes.jobs.direct_applications(params)) as any as Promise<IResponseWithHeaders<{
      applications: IContractForClient[],
      highlight_count: number,
      highlight_count_my_team: number,
      total_count: number,
      total_count_my_team: number,
      filtered_out_count: number,
      filtered_out_ids: number[],
    }>>
  }

  getJobOpportunityRecipients(jobId: number) {
    return this.get(apiConfig.routes.jobs.opportunity_recipients(jobId)) as Promise<{
      potential_referrers_count: number
      potential_applicants_count: number
      already_messaged_count: number
      aware_users_count: number
    }>
  }

  showApplicant(jobSlug, slug): Promise<IContractForClient | IFreelancer> {
    return this.get(apiConfig.routes.jobs.applicant(jobSlug, slug))
  }

  getClientsFirm(): Promise<IClient[]> {
    return this.get(apiConfig.routes.firms.clients)
  }

  getIntegrationProviders() {
    return this.get<IJobIntegrationType[]>(apiConfig.routes.job_integrations.index)
  }

  listJobsForIntegration(params) {
    return this.get(apiConfig.routes.job_integrations.jobs(params))
  }

  createJobIntegration(params): Promise<IJob> {
    return this.post(apiConfig.routes.job_integrations.index, params)
  }

  testJobIntegrationAPIKey(params): Promise<{ valid: boolean }> {
    return this.post(apiConfig.routes.job_integrations.test_api_key, params)
  }

  sendSkipFreelancer(data) {
    return this.post(apiConfig.routes.jobs.skip(data.job_id), { skip: data })
  }

  sendContractRequest(data: Partial<IContractRequest>) {
    return this.post(apiConfig.routes.contract_requests.index, data)
  }

  acceptContractRequests(contractId: number) : Promise<IContractRequest[]> {
    return this.post(apiConfig.routes.contract_requests.accept, { contract_id: contractId })
  }

  createAnswer(data) {
    return this.post(apiConfig.routes.answers.index, data)
  }

  deleteAnswer(id: number) {
    return this.delete(apiConfig.routes.answers.member(id))
  }

  rejectContractRequests(contractId: number, message?: string) : Promise<IContractRequest[]> {
    return this.post(apiConfig.routes.contract_requests.reject, { contract_id: contractId, message })
  }

  sendJobOpportunity(jobId, data) {
    return this.post(apiConfig.routes.jobs.notify_freelancer(jobId, data))
  }

  getLastInterview(id: number) {
    return this.get(apiConfig.routes.jobs.last_interview(id))
  }

  getClientTimesheets(params) {
    return this.getWithHeaders<ITimesheetForClient>(apiConfig.routes.timesheets.client(params))
  }

  getClientTimesheetsSummary(params?: any) {
    return this.getWithHeaders(apiConfig.routes.timesheets.clientSummary(params)) as any as Promise<{ body: { count: number, balance: number, hours: number } }>
  }

  getTimesheet(id: number) {
    return this.get(apiConfig.routes.timesheets.member(id))
  }

  deleteTimesheet(id: number) {
    return this.delete(apiConfig.routes.timesheets.member(id))
  }

  sendRejectTimesheet(id: number) {
    return this.post(apiConfig.routes.timesheets.reject(id))
  }

  sendApproveTimesheet(id, fields) {
    return this.post(apiConfig.routes.timesheets.approve(id), fields)
  }

  sendQueryTimesheet(id, formData) {
    return this.post(apiConfig.routes.timesheets.query(id), { timesheet: formData })
  }

  getContract(id: number) : Promise<IContractForClient | IContractForFreelancer> {
    return this.get(apiConfig.routes.contracts.member(id))
  }

  updateContract(id, formData, preview = false) {
    return this.put(apiConfig.routes.contracts.member(id), { contract: formData, preview })
  }

  updateFirm(formData): Promise<IFirm> {
    return this.post(apiConfig.routes.firms.update, formData)
  }

  updateContracts(params) {
    return this.post(apiConfig.routes.contracts.update_many, params)
  }

  generateEmailList(params) {
    return this.post(apiConfig.routes.contracts.generate_email_list, params)
  }

  previewContractRate(contractId, clientRate) {
    return this.patch(apiConfig.routes.contracts.preview_rate(contractId), { client_rate: clientRate })
  }

  getClientInvoicesSummary(params?: any) {
    return this.getWithHeaders(apiConfig.routes.invoices.summary(params))
  }

  getClientInvoice(id: number) {
    return this.get<IClientInvoice>(apiConfig.routes.invoices.member(id))
  }

  refreshPaymentStatus(paymentIntentId: string) {
    return this.get<IClientInvoice>(apiConfig.routes.invoices.refreshPaymentStatus({ payment_intent_id: paymentIntentId }))
  }

  getClientInvoices(params?: any) {
    return this.getWithHeaders<IClientInvoice>(apiConfig.routes.invoices.index(params))
  }

  setupPaymentMethod(paymentMethodType: IPaymentMethodType, callbackUrl?: string): Promise<{ session_id: string }> {
    return this.post(apiConfig.routes.payment_methods.setup, { callback_url: callbackUrl, payment_method_type: paymentMethodType })
  }

  createPaymentMethod(params): Promise<IPaymentMethod> {
    return this.post(apiConfig.routes.payment_methods.index, params)
  }

  deletePaymentMethod(id: number): Promise<void> {
    return this.delete(apiConfig.routes.payment_methods.member(id))
  }

  getPaymentMethods(params?: any): Promise<IPaymentMethod[]> {
    return this.get(apiConfig.routes.payment_methods.index, params)
  }

  invoiceCheckout(id): Promise<{ session_id: string } | { client_secret: string }> {
    return this.post(apiConfig.routes.invoices.checkout(id))
  }

  validateUsersAmountFreeTimesheetTracking() {
    return this.get(apiConfig.routes.contracts.valid_timesheet_tracking_free)
  }

  getProjects(params) {
    return this.get(apiConfig.routes.project.index(params))
  }

  // Auth
  sendClientSignupForm(formData) {
    return this.post(apiConfig.routes.auth.client_signup, { user: formData })
  }

  sendLoginForm(formData) {
    return this.post(apiConfig.routes.auth.login, { user: formData })
  }

  confirmEmail(params) {
    return this.post(apiConfig.routes.auth.confirm_email, params)
  }

  sendConfirmationEmail() {
    return this.post(apiConfig.routes.auth.send_confirmation_email)
  }

  sendLogout() {
    return this.post(apiConfig.routes.auth.logout)
  }

  sendForgotPasswordForm(formData) {
    return this.post(apiConfig.routes.auth.forgot_password, { user: formData })
  }

  sendChangePasswordForm(formData) {
    return this.post(apiConfig.routes.auth.update_password, formData)
  }

  masq(formData): Promise<ICurrentUser> {
    return this.post(apiConfig.routes.members.masq, formData)
  }

  unmasq() {
    return this.post(apiConfig.routes.members.unmasq)
  }

  oauth(providerName: string, accessToken: string, userType: string) {
    let url = `${apiConfig.routes.auth[`${providerName}_callback`]}?code=${accessToken}&user_type=${userType}`
    if (process.env.NODE_ENV === 'development') url += '&mode=development'
    return this.get(url)
  }

  async getLinkedInAccessToken(authCode: string) {
    let url = `${apiConfig.routes.auth.linkedin_access_token}?code=${authCode}`
    if (process.env.NODE_ENV === 'development') url += '&mode=development'
    return (await this.get<{ access_token: string }>(url)).access_token
  }

  async getTwitterRequestToken() {
    return (await this.get<{ request_token: string }>(apiConfig.routes.auth.twitter_request_token)).request_token
  }

  async getTwitterAccessToken(requestToken: string = '', verifierToken: string = ''): Promise<string> {
    return (await this.get(`${apiConfig.routes.auth.twitter_access_token}?request_token=${requestToken}&oauth_verifier=${verifierToken}`)).access_token
  }

  getCurrentUser() : Promise<ICurrentUser> {
    return this.get(apiConfig.routes.users.current)
  }

  getReferenceUser(id: number) {
    return this.get(apiConfig.routes.users.reference(id))
  }

  getEmailSubscriptions() : Promise<IEmailSubscription[]> {
    return this.get(apiConfig.routes.users.email_subscriptions.index)
  }

  updateEmailSubscription(id, params) : Promise<IEmailSubscription> {
    return this.put(apiConfig.routes.users.email_subscriptions.member(id), params)
  }

  deleteUser(id: number, data?: any) {
    return this.delete(apiConfig.routes.users.member(id), data)
  }

  sendChatMessage(message: Partial<IChatMessage>) : Promise<IChatMessage> {
    return this.post(apiConfig.routes.chat_messages.index(), message)
  }

  getChatMessages(params?: any) : Promise<IChatMessage[]> {
    return this.get(apiConfig.routes.chat_messages.index(params))
  }

  getChatThread(id: number) : Promise<IChatThread> {
    return this.get(apiConfig.routes.chat_threads.member(id))
  }

  findChatThread(params: any) : Promise<IChatThread> {
    return this.get(apiConfig.routes.chat_threads.find(params))
  }

  getChatThreads() : Promise<IChatThread[]> {
    return this.get(apiConfig.routes.chat_threads.index)
  }

  getChatStats() {
    return this.get(apiConfig.routes.chat_messages.stats)
  }

  markChatThreadRead(id: number) {
    return this.post(apiConfig.routes.chat_threads.mark_read(id))
  }

  createChatThread(params: any) {
    return this.post(apiConfig.routes.chat_threads.index, params)
  }

  updateChatThread(id: number, params: any) {
    return this.put(apiConfig.routes.chat_threads.member(id), params)
  }

  addUserToChatThread(chatThreadId: number, userId: number) {
    return this.post(apiConfig.routes.chat_threads.add_user(chatThreadId), { user_id: userId })
  }

  removeUserFromChatThread(chatThreadId: number, userId: number) {
    return this.post(apiConfig.routes.chat_threads.remove_user(chatThreadId), { user_id: userId })
  }

  getChatContacts() {
    return this.get(apiConfig.routes.chat_contacts.index)
  }

  getChatContact(id: number) {
    return this.get(apiConfig.routes.chat_contacts.member(id))
  }

  getUsersAdmin(params: any) {
    return this.get(apiConfig.routes.admin.users.index(params))
  }

  getRelayId(tableName: string, rawId: number) {
    return this.get(apiConfig.routes.graphql.relay_id({ table_name: tableName, raw_id: rawId }))
  }

  getRawId(relayId: string) {
    return this.get(apiConfig.routes.graphql.raw_id({ relay_id: relayId }))
  }

  registerFrontendVersion(buildId: string, key: string) {
    return this.post(apiConfig.routes.database.register_frontend_version, { build_id: buildId, key })
  }

  getFrontendServerVersion() {
    return this.get(`${process.env.ROOT_URL}/api/build_id`)
  }

  downloadJobIntegrationsXML() {
    return this.downloadFile(apiConfig.routes.job_integrations.linkedin_xml, 'linkedin_integration.xml')
  }
}

export type IFlexhireAPI = typeof FlexhireAPI

export function getAPIClient(...params) : InstanceType<IFlexhireAPI> {
  if (isPrerendering()) return new FlexhireAPI(...params)
  const w = window as any
  if (w.flexhireAPI) return w.flexhireAPI
  w.flexhireAPI = new FlexhireAPI(null, w.reduxStore)
  return w.flexhireAPI
}
