import { buildQueryParams as bqp } from 'services/router'

const buildQueryParams = (params?: any) => `?${bqp(params)}`

export const api = {
  routes: {
    configuration: {
      index: '/configuration',
    },
    auth: {
      freelancer_signup: '/auth/register/freelancer',
      client_signup: '/auth/register/client',
      login: '/auth/log_in',
      confirm_email: '/auth/confirm_email',
      send_confirmation_email: '/auth/send_confirmation_email',
      logout: '/auth/log_out',
      forgot_password: '/auth/change_password',
      update_password: '/auth/update_password',
      github_callback: '/auth/github',
      linkedin_callback: '/auth/linkedin',
      linkedin_access_token: '/auth/linkedin/access_token',
      twitter_access_token: '/auth/twitter/access_token',
      twitter_request_token: '/auth/twitter/request_token',
    },
    billing_plans: {
      index: '/billing_plans',
    },
    blog: {
      posts: {
        member: (id: number) => `/blog/posts/${id}`,
        create: '/blog/posts/create',
        update: (id: number) => `/blog/posts/${id}/update`,
        publish: (id: number) => `/blog/posts/${id}/publish`,
        recent: '/blog/posts/recent',
        my_posts: '/blog/posts/my_posts',
      },
      categories: {
        index: '/blog/categories',
        member: (id: number) => `/blog/categories/${id}`,
        posts: (id: number) => `/blog/categories/${id}/posts`,
      },
    },
    users: {
      current: '/users/current',
      autosave_freelancer: '/users/autosave_freelancer',
      submit_application: '/users/submit_application',
      submit_profile: '/users/submit_profile',
      start_application: '/users/start_application',
      cancel_application: '/users/cancel_application',
      reference: (id: number) => `/users/${id}/show_for_reference`,
      member: (id: number) => `/users/${id}`,
      update: '/users/update_user',
      parse_resume: (id: number) => `/users/${id}/parse_resume`,
      update_availability: '/users/update_availability',
      payoneer_registration_url: '/users/payoneer_registration_url',
      download_1099_pdf: '/users/download_1099_pdf',
      check_password: (password: string) => `/users/check_password?password=${password}`,
      email_subscriptions: {
        index: '/email_subscriptions',
        member: (id: number) => `/email_subscriptions/${id}`,
        unsubscribe: (token: string) => `/email_subscriptions/unsubscribe${buildQueryParams({ token })}`,
      },
    },
    firms: {
      update: '/firms',
      clients: '/firms/clients',
    },
    screening_interviews: {
      index: (params?: any) => `/screening_interviews${buildQueryParams(params)}`,
      current: '/screening_interviews/current',
      book: (id: number) => `/screening_interviews/${id}/book`,
      postpone: (id: number) => `/screening_interviews/${id}/postpone`,
    },
    skills: {
      index: (params?: any) => `/skills${buildQueryParams(params)}`,
      featured: '/skills/featured',
      member: (id: number) => `/skills/${id}`,
      suggest: '/skills/suggest',
    },
    tags: {
      index: '/tags',
    },
    institutes: {
      index: (params?: any) => `/institutes${buildQueryParams(params)}`,
    },
    names: {
      index: (params?: any) => `/members${buildQueryParams(params)}`,
    },
    project: {
      index: (params?: any) => `/projects${buildQueryParams(params)}`,
    },
    project_submissions: {
      index: (params?: any) => `/project_submissions${buildQueryParams(params)}`,
      member: (id: number) => `/project_submissions/${id}`,
      validate_project_submission_url: (url: string) => `/project_submissions/validate_project_submission_url${buildQueryParams({ url: url })}`,
    },
    references: {
      index: '/references',
      complete: '/references/complete',
      member: (id: number) => `/references/${id}`,
    },
    videos: {
      member: (id: number) => `/videos/${id}`,
      index: (params?: any) => `/videos${buildQueryParams(params)}`,
      upload: '/videos/upload',
    },
    freelancers: {
      member: (id: number) => `/freelancers/${id}`,
      toggleHidden: (id: number) => `/freelancers/${id}/toggle_hidden`,
      topFreelancers: (params?: any) => `/freelancers/featured${buildQueryParams(params)}`,
      topFreelancersBySkill: (id: number, freelancer_type_id: number) => `/freelancers/featured/skill/${freelancer_type_id}/${id}`,
      freelancerProfile: (id: number) => `/freelancers/featured/${id}`,
    },
    members: {
      show: (slug: any, subslug = '') => `/members/${slug}/${subslug}`,
      masq: '/members/masq',
      unmasq: '/members/unmasq',
    },
    profile: {
      member: (id: number) => `/profiles/${id}`,
    },
    referrals: {
      member: (token: string) => `/referrals/${token}`,
      share_job: (jobSlug: string | number) => `/referrals/share_job${buildQueryParams({ job_slug: jobSlug })}`,
      invite_friend: (email: string) => `/referrals/invite_friend${buildQueryParams({ email })}`,
    },
    members_pipeline: {
      index: (params?: any) => `/members_pipeline${buildQueryParams(params)}`,
    },
    jobs: {
      index: (params?: any) => `/jobs${buildQueryParams(params)}`,
      direct_applications: (params?: any) => `/jobs/direct_applications${buildQueryParams(params)}`,
      applicant: (jobSlug: string, slug: string) => `/jobs/${jobSlug}/applicant?slug=${slug}`,
      apply: (id: number | string, params?: any) => `/jobs/${id}/apply${buildQueryParams(params)}`,
      skip: (id: number) => `/jobs/${id}/skip`,
      opportunity_recipients: (id: number) => `/jobs/${id}/opportunity_recipients`,
      notify_freelancer: (id: number, params?: any) => `/jobs/${id}/notify_freelancer${buildQueryParams(params)}`,
      member: (id: number) => `/jobs/${id}`,
      last_interview: (id: number) => `/jobs/${id}/last_interview`,
      candidates: (params?: any) => `/jobs/candidates${buildQueryParams(params)}`,
      toggle_bookmark: '/jobs/toggle_bookmark',
    },
    job_integrations: {
      index: '/job_integrations',
      test_api_key: '/job_integrations/test_api_key',
      jobs: (params?: any) => `/job_integrations/jobs${buildQueryParams(params)}`,
      linkedin_xml: '/job_integrations/linkedin',
    },
    questions: {
      index: (filters?: any) => `/questions${buildQueryParams(filters)}`,
      featured_in: (filters?: any) => `/questions/featured_in${buildQueryParams(filters)}`,
      screening: '/questions/screening',
      suggested: '/questions/suggested',
      featured_categories: '/questions/featured_categories',
    },
    answers: {
      index: '/answers',
      member: (id: number) => `/answers/${id}`,
    },
    payment_methods: {
      index: '/payment_methods',
      setup: '/payment_methods/setup',
      member: (id: number) => `/payment_methods/${id}`,
    },
    timesheets: {
      index: '/timesheets',
      stats: '/timesheets/stats',
      freelancer: (params?: any) => `/timesheets/freelancer${buildQueryParams(params)}`,
      client: (params?: any) => `/timesheets/client${buildQueryParams(params)}`,
      clientSummary: (params?: any) => `/timesheets/summary${buildQueryParams(params)}`,
      member: (id: number) => `/timesheets/${id}`,
      reject: (id: number) => `/timesheets/${id}/reject`,
      approve: (id: number) => `/timesheets/${id}/approve`,
      submit: (id: number) => `/timesheets/${id}/submit`,
      query: (id: number) => `/timesheets/${id}/query`,
    },
    invoices: {
      index: (params?: any) => `/invoices${buildQueryParams(params)}`,
      refreshPaymentStatus: (params?: any) => `/invoices/refresh_payment_status${buildQueryParams(params)}`,
      summary: (params?: any) => `/invoices/summary${buildQueryParams(params)}`,
      member: (id: number) => `/invoices/${id}`,
      checkout: (id: number) => `/invoices/${id}/checkout`,
      csv: (token: string) => `/invoices/${token}/csv`,
      charge: (id: number) => `/invoices/${id}/charge`,
    },
    feedbacks: {
      index: '/feedbacks',
    },
    contracts: {
      index: (params?: any) => `/contracts${buildQueryParams(params)}`,
      member: (id: number) => `/contracts/${id}`,
      update_many: '/contracts/update_many',
      stats: '/contracts/stats',
      generate_email_list: '/contracts/generate_email_list',
      pause: (id: number) => `/contracts/${id}/pause`,
      resume: (id: number) => `/contracts/${id}/resume`,
      expire: (id: number) => `/contracts/${id}/expire`,
      reject: (id: number) => `/contracts/${id}/reject`,
      accept: (id: number) => `/contracts/${id}/accept`,
      reject_freelancer: (id: number) => `/contracts/${id}/reject_freelancer`,
      preview_rate: (id: number) => `/contracts/${id}/preview_rate`,
      valid_timesheet_tracking_free: '/contracts/valid_timesheet_tracking_free',
    },
    contract_requests: {
      index: '/contract_requests',
      accept: '/contract_requests/accept',
      reject: '/contract_requests/reject',
    },
    contract_feedbacks: {
      index: (params?: any) => `/contract_feedbacks${buildQueryParams(params)}`,
      member: (id: number) => `/contract_feedbacks/${id}`,
    },
    discount: {
      show: (code: string) => `/discounts/${code}`,
    },
    freelancer_types: {
      index: '/freelancer_types',
    },
    freelancer_subtypes: {
      index: (freelancerTypeId: number) => `/freelancer_subtypes${buildQueryParams({ freelancer_type_id: freelancerTypeId })}`,
    },
    links: {
      index: '/links',
      member: (token: string) => `/links/${token}`,
    },
    chat_messages: {
      index: (params?: any) => `/chat_messages${buildQueryParams(params)}`,
      stats: '/chat_messages/stats',
    },
    chat_threads: {
      index: '/chat_threads',
      find: params => `/chat_threads/find${buildQueryParams(params)}`,
      member: id => `/chat_threads/${id}`,
      mark_read: id => `/chat_threads/${id}/mark_read`,
      add_user: id => `/chat_threads/${id}/add_user`,
      remove_user: id => `/chat_threads/${id}/remove_user`,
    },
    chat_contacts: {
      index: '/chat_contacts',
      member: id => `/chat_contacts/${id}`,
    },
    admin: {
      users: {
        index: params => `/admin/users${buildQueryParams(params)}`,
        member: id => `/admin/users/${id}`,
      },
    },
    graphql: {
      relay_id: params => `/graphql/relay_id${buildQueryParams(params)}`,
      raw_id: params => `/graphql/raw_id${buildQueryParams(params)}`,
    },
    database: {
      register_frontend_version: '/database/register_frontend_version',
      export: '/database/export',
    },
  },
}

export const oauth = {
  github: {
    api_url: 'https://github.com/login/oauth/authorize',
    params: {
      client_id: `${process.env.GITHUB_KEY}`,
      redirect_uri: `${process.env.GITHUB_REDIRECT_URI}`,
      scope: 'user:email',
    },
  },
  linkedin: {
    api_url: 'https://www.linkedin.com/oauth/v2/authorization',
    params: (readOnly: boolean) => ({
      client_id: `${process.env.LINKEDIN_KEY}`,
      response_type: 'code',
      redirect_uri: `${process.env.LINKEDIN_REDIRECT_URI}`,
      scope: readOnly ? 'r_liteprofile r_emailaddress' : 'r_liteprofile r_emailaddress w_member_social',
    }),
  },
  twitter: {

  },
}
