import React from 'react'
import { capitalize } from 'lodash'
import {
  Admin, AuthProvider, DataProvider, Resource,
} from 'react-admin'

import { CurrencyList, EditCurrency, CreateCurrency, ShowCurrency } from 'admin/currency/Currency'
import { CreateFinancial, EditFinancial, FinancialList, ShowFinancial } from 'admin/financials/Financial'
import { BlogCategoryList, ShowBlogCategory, EditBlogCategory, CreateBlogCategory } from './blogCategories/BlogCategory'
import { BlogSubcategoryList, ShowBlogSubcategory, EditBlogSubcategory, CreateBlogSubcategory } from './blogSubcategories/BlogSubcategory'
import { BlogPostList, ShowBlogPost, EditBlogPost, CreateBlogPost } from './blogPosts/BlogPost'
import { JobList, ShowJob, EditJob } from './jobs/Job'
import {
  SkillList, ShowSkill, EditSkill, CreateSkill,
} from './skills/Skill'
import {
  FreelancerTypeList, ShowFreelancerType, EditFreelancerType, CreateFreelancerType,
} from './freelancerTypes/FreelancerType'
import { FreelancerSubtypeList, EditFreelancerSubtype, CreateFreelancerSubtype } from './freelancerSubtypes/FreelancerSubtype'
import {
  FirmList, ShowFirm, EditFirm, CreateFirm,
} from './firm/Firm'
import {
  ContractList, ShowContract, EditContract, CreateContract,
} from './contract/Contract'
import { ReferenceList, ShowReference } from './references/References'
import {
  InvoiceList, InvoiceEdit, ShowInvoice, CreateInvoice,
} from './invoice/Invoice'
import { InvoiceItemList, EditInvoiceItem, CreateInvoiceItem, ShowInvoiceItem } from './invoice/InvoiceItem'
import { CreatePayout, EditPayout, PayoutList, ShowPayout } from './payout/Payout'
import { TimesheetList, ShowTimesheet, EditTimesheet } from './timesheet/Timesheet'

import ListTaxCompilanceForm from './tax_compilance/tax_compilance'
import { Stats } from './stats/Stats'
import { Financials } from './financials/Financials'
import {
  ScreeningInterviewList,
  ShowScreeningInterview,
  EditScreeningInterview,
  CreateScreeningInterview,
} from './screeningInterview/ScreeningInterview'
import { ProjectList, ShowProject, EditProject, CreateProject } from './project/Project'
import { ProjectSubmissionList, ShowProjectSubmission, EditProjectSubmission, CreateProjectSubmission } from './projectSubmission/ProjectSubmission'
import { ReferralList, EditReferral, CreateReferral, ShowReferral } from './referral/referral'
import { DiscountList, EditDiscount, CreateDiscount } from './discounts/Discounts'
import { SubscriptionList, EditSubscription } from './emailSubscriptions/emailSubscriptions'
import { InstitutesList, EditInstitute, CreateInstitute } from './institutes/Institutes'
import { EditConfiguration, CreateConfiguration, ConfigurationList } from './Configuration/Configuration'
import { EditQuestion, CreateQuestion, QuestionList } from './questions/questions'
import { TagList, CreateTag, EditTag } from './tags/tags'
import { VideoList, EditVideo, ShowVideo } from './videos/videos'
import { StripeChargeList, ShowStripeCharge, EditStripeCharge, CreateStripeCharge } from './stripeCharges/StripeCharge'
import { SkipList, EditSkip, CreateSkip } from './skips/Skip'
import { EditLink, CreateLink, LinkList } from './link/Link'
import { JobIntegrationList, ShowJobIntegration, EditJobIntegration, CreateJobIntegration } from './jobIntegration/JobIntegration'
import { JobIntegrationProviderList } from './jobIntegrationProvider/JobIntegrationProvider'
import { ResumeList, ShowResume, EditResume, CreateResume } from './resume/Resume'
import { ChatMessageList, ShowChatMessage } from './chat_message/ChatMessage'
import { ChatThreadList, ShowChatThread } from './chat_thread/ChatThread'
import { ShowUserIntegration, UserIntegrationList } from './userIntegration/userIntegration'
import { ContractIntegrationList, ShowContractIntegration } from './contractIntegration/contractIntegration'
import { CreateTrackingLog, EditTrackingLog, TrackingLogList, ShowTrackingLog } from './TrackingLog/TrackingLog'
import { BillingPlanList, CreateBillingPlan, EditBillingPlan, ShowBillingPlan } from './billingPlans/BillingPlan'
import { InfrastructureEventList, ShowInfrastructureEvent } from './infrastructureEvent/InfrastructureEvent'
import { EmailLogList, ShowEmailLog } from './emailLog/emailLog'
import { CreateFinancialReport, EditFinancialReport, FinancialReportList, ShowFinancialReport } from './financialReport/FinancialReport'
import { CreateFinancialReportItem, EditFinancialReportItem, FinancialReportItemList, ShowFinancialReportItem } from './financialReportItem/FinancialReportItem'
import { UserList, CreateUser, EditUser, ShowUser } from './user/User'
import { ShowPaymentMethod, PaymentMethodList, EditPaymentMethod } from './paymentMethods/paymentMethods'
import { JobSocialIntegrationList, ShowJobSocialIntegration, EditJobSocialIntegration, CreateJobSocialIntegration } from './jobSocialIntegration/JobSocialIntegration'
import { IdentityList } from './identities/Identity'
import { PayoutMethodList, ShowPayoutMethod } from './payoutMethods/payoutMethods'
import { PayoneerIpcnList } from './payoneerIpcn/PayoneerIpcn'
import { CreatePayrollItem, EditPayrollItem, PayrollItemList, ShowPayrollItem } from './payrollItem/PayrollItem'
import { CreateFrontendVersion, EditFrontendVersion, FrontendVersionList, ShowFrontendVersion } from './frontendVersion/frontendVersion'
import { ApiKeyList, CreateApiKey, EditApiKey, ShowApiKey } from './apiKey/ApiKey'
import { CreateWebhook, EditWebhook, ShowWebhook, WebhookList } from './webhook/Webhook'
import { CreateWebhookDelivery, EditWebhookDelivery, ShowWebhookDelivery, WebhookDeliveryList } from './webhookDelivery/WebhookDelivery'
import { CreatePaycheck, EditPaycheck, PaycheckList, ShowPaycheck } from './paycheck/Paycheck'
import { BonusesList, ShowBonus, EditBonus, CreateBonus } from './bonuses/Bonuses'
import { CreateExchangeRate, EditExchangeRate, ExchangeRateList, ShowExchangeRate } from './exchangeRates/ExchangeRate'

const adminResources = [
  <Resource name="stats" list={Stats} />,
  <Resource name="financial_stats" list={Financials} />,
  <Resource name="financials" list={FinancialList} create={CreateFinancial} edit={EditFinancial} show={ShowFinancial} />,
  <Resource name="financial_reports" list={FinancialReportList} show={ShowFinancialReport} edit={EditFinancialReport} create={CreateFinancialReport} />,
  <Resource name="financial_report_items" list={FinancialReportItemList} show={ShowFinancialReportItem} edit={EditFinancialReportItem} create={CreateFinancialReportItem} />,
  <Resource name="users" list={UserList} show={ShowUser} edit={EditUser} create={CreateUser} />,
  <Resource name="identities" list={IdentityList} />,
  <Resource name="api_keys" list={ApiKeyList} show={ShowApiKey} edit={EditApiKey} create={CreateApiKey} />,
  <Resource name="webhooks" list={WebhookList} show={ShowWebhook} edit={EditWebhook} create={CreateWebhook} />,
  <Resource name="webhook_deliveries" list={WebhookDeliveryList} show={ShowWebhookDelivery} edit={EditWebhookDelivery} create={CreateWebhookDelivery} />,
  <Resource name="blog_categories" list={BlogCategoryList} show={ShowBlogCategory} edit={EditBlogCategory} create={CreateBlogCategory} />,
  <Resource name="blog_subcategories" list={BlogSubcategoryList} show={ShowBlogSubcategory} edit={EditBlogSubcategory} create={CreateBlogSubcategory} />,
  <Resource name="blog_posts" list={BlogPostList} show={ShowBlogPost} edit={EditBlogPost} create={CreateBlogPost} />,
  <Resource name="discounts" list={DiscountList} edit={EditDiscount} create={CreateDiscount} />,
  <Resource name="institutes" list={InstitutesList} edit={EditInstitute} create={CreateInstitute} />,
  <Resource name="jobs" list={JobList} show={ShowJob} edit={EditJob} />,
  <Resource name="job_integrations" list={JobIntegrationList} show={ShowJobIntegration} edit={EditJobIntegration} create={CreateJobIntegration} />,
  <Resource name="job_social_integrations" list={JobSocialIntegrationList} show={ShowJobSocialIntegration} edit={EditJobSocialIntegration} create={CreateJobSocialIntegration} />,
  <Resource name="tracking_logs" list={TrackingLogList} show={ShowTrackingLog} edit={EditTrackingLog} create={CreateTrackingLog} />,
  <Resource name="job_integration_providers" list={JobIntegrationProviderList} />,
  <Resource name="user_integrations" list={UserIntegrationList} show={ShowUserIntegration} />,
  <Resource name="contract_integrations" list={ContractIntegrationList} show={ShowContractIntegration} />,
  <Resource name="resumes" list={ResumeList} show={ShowResume} edit={EditResume} create={CreateResume} />,
  <Resource name="projects" list={ProjectList} show={ShowProject} edit={EditProject} create={CreateProject} />,
  <Resource name="project_submissions" list={ProjectSubmissionList} show={ShowProjectSubmission} edit={EditProjectSubmission} create={CreateProjectSubmission} />,
  <Resource name="screening_interviews" list={ScreeningInterviewList} show={ShowScreeningInterview} edit={EditScreeningInterview} create={CreateScreeningInterview} />,
  <Resource name="skills" list={SkillList} show={ShowSkill} edit={EditSkill} create={CreateSkill} />,
  <Resource name="freelancer_types" list={FreelancerTypeList} show={ShowFreelancerType} edit={EditFreelancerType} create={CreateFreelancerType} />,
  <Resource name="freelancer_subtypes" list={FreelancerSubtypeList} edit={EditFreelancerSubtype} create={CreateFreelancerSubtype} />,
  <Resource name="references" list={ReferenceList} show={ShowReference} />,
  <Resource name="payroll_items" list={PayrollItemList} show={ShowPayrollItem} edit={EditPayrollItem} create={CreatePayrollItem} />,
  <Resource name="bonuses" list={BonusesList} show={ShowBonus} edit={EditBonus} create={CreateBonus} />,
  <Resource name="paychecks" list={PaycheckList} show={ShowPaycheck} edit={EditPaycheck} create={CreatePaycheck} />,
  <Resource name="payouts" list={PayoutList} show={ShowPayout} edit={EditPayout} create={CreatePayout} />,
  <Resource name="payoneer_ipcns" list={PayoneerIpcnList} />,
  <Resource name="billing_plans" list={BillingPlanList} edit={EditBillingPlan} show={ShowBillingPlan} create={CreateBillingPlan} />,
  <Resource name="firms" list={FirmList} edit={EditFirm} show={ShowFirm} create={CreateFirm} />,
  <Resource name="contracts" list={ContractList} show={ShowContract} edit={EditContract} create={CreateContract} />,
  <Resource name="invoices" list={InvoiceList} edit={InvoiceEdit} show={ShowInvoice} create={CreateInvoice} />,
  <Resource name="invoice_items" list={InvoiceItemList} show={ShowInvoiceItem} edit={EditInvoiceItem} create={CreateInvoiceItem} />,
  <Resource name="timesheets" list={TimesheetList} show={ShowTimesheet} edit={EditTimesheet} />,
  <Resource name="timesheet_entries" />,
  <Resource name="expenses" />,
  <Resource name="payment_methods" list={PaymentMethodList} show={ShowPaymentMethod} edit={EditPaymentMethod} />,
  <Resource name="payout_methods" list={PayoutMethodList} show={ShowPayoutMethod} />,
  <Resource name="stripe_charges" list={StripeChargeList} show={ShowStripeCharge} edit={EditStripeCharge} create={CreateStripeCharge} />,
  <Resource name="tax_compliances" list={ListTaxCompilanceForm} />,
  <Resource name="referrals" list={ReferralList} edit={EditReferral} create={CreateReferral} show={ShowReferral} />,
  <Resource name="email_subscriptions" list={SubscriptionList} edit={EditSubscription} />,
  <Resource name="configurations" list={ConfigurationList} edit={EditConfiguration} create={CreateConfiguration} />,
  <Resource name="questions" list={QuestionList} edit={EditQuestion} create={CreateQuestion} />,
  <Resource name="tags" list={TagList} edit={EditTag} create={CreateTag} />,
  <Resource name="videos" list={VideoList} edit={EditVideo} show={ShowVideo} />,
  <Resource name="skips" list={SkipList} edit={EditSkip} create={CreateSkip} />,
  <Resource name="links" list={LinkList} edit={EditLink} create={CreateLink} />,
  <Resource name="chat_threads" list={ChatThreadList} show={ShowChatThread} />,
  <Resource name="chat_messages" list={ChatMessageList} show={ShowChatMessage} />,
  <Resource name="currencies" list={CurrencyList} show={ShowCurrency} edit={EditCurrency} create={CreateCurrency} />,
  <Resource name="infrastructure_events" list={InfrastructureEventList} show={ShowInfrastructureEvent} />,
  <Resource name="email_logs" list={EmailLogList} show={ShowEmailLog} />,
  <Resource name="frontend_versions" list={FrontendVersionList} create={CreateFrontendVersion} edit={EditFrontendVersion} show={ShowFrontendVersion} />,
  <Resource name="exchange_rates" list={ExchangeRateList} create={CreateExchangeRate} edit={EditExchangeRate} show={ShowExchangeRate} />,
]

const salesResources = [
  <Resource name="users" list={UserList} show={ShowUser} edit={EditUser} create={CreateUser} />,
  <Resource name="jobs" list={JobList} show={ShowJob} edit={EditJob} />,
  <Resource name="questions" list={QuestionList} edit={EditQuestion} create={CreateQuestion} />,
  <Resource name="tags" list={TagList} edit={EditTag} create={CreateTag} />,
  <Resource name="firms" list={FirmList} edit={EditFirm} show={ShowFirm} create={CreateFirm} />,
  <Resource name="videos" />,
  <Resource name="freelancer_types" />,
  <Resource name="freelancer_subtypes" />,
  <Resource name="projects" />,
  <Resource name="screening_interviews" />,
  <Resource name="references" />,
  <Resource name="skills" />,
]

const screeningResources = [
  <Resource name="users" list={UserList} show={ShowUser} edit={EditUser} create={CreateUser} />,
  <Resource name="projects" list={ProjectList} show={ShowProject} edit={EditProject} create={CreateProject} />,
  <Resource name="project_submissions" list={ProjectSubmissionList} show={ShowProjectSubmission} edit={EditProjectSubmission} create={CreateProjectSubmission} />,
  <Resource name="screening_interviews" list={ScreeningInterviewList} show={ShowScreeningInterview} edit={EditScreeningInterview} create={CreateScreeningInterview} />,
  <Resource name="references" list={ReferenceList} show={ShowReference} />,
  <Resource name="questions" list={QuestionList} edit={EditQuestion} create={CreateQuestion} />,
  <Resource name="videos" list={VideoList} edit={EditVideo} show={ShowVideo} />,
  <Resource name="tags" list={TagList} edit={EditTag} create={CreateTag} />,
  <Resource name="firms" />,
  <Resource name="freelancer_types" />,
  <Resource name="freelancer_subtypes" />,
  <Resource name="jobs" />,
  <Resource name="skills" />,
]

type AdminDashboardProps = {
  permissions?: string,
  dataProvider: DataProvider,
  authProvider: AuthProvider,
  history: any
}

const AdminDashboard = ({ permissions, dataProvider, authProvider, history }: AdminDashboardProps) => (
  <Admin
    title={`Flexhire ${capitalize(permissions || 'admin')} Console`}
    // NOTICE: custom admin console sagas are broken in our setup
    // Do not add custom sagas unless you want to try to fix it
    dataProvider={dataProvider}
    authProvider={authProvider}
    history={history}
  >
    {(role) => {
      if (role === 'admin') return adminResources
      if (role === 'sales') return salesResources
      if (role === 'screening') return screeningResources
      return null
    }}
  </Admin>
)

export default AdminDashboard
