export const tourSteps: Array<{ selector?: string, content: string, mobileDisabled?: boolean }> = [
  {
    content: 'Welcome to your company Dashboard where you can get a quick overview of your FlexHire account. This brief tour will guide you through the major features.',
  },
  // {
  //   selector: '[data-tour="client-menu-company"]',
  //   content: 'Your company page lists all your open positions -- you can easily embed this on your own company website to get more applicants',
  // },
  // {
  //   selector: '[data-tour="client-menu-hire"]',
  //   content: 'FlexATS is your Applicant Tracing System, where you can create jobs, identify potential candidates, review and screen',
  // },
  // {
  //   selector: '[data-tour="client-menu-manage"]',
  //   content: 'FlexManage is your Freelancer Management System - freelance work hired through FlexHire is managed & paid through FlexManage',
  // },
  {
    selector: '[data-tour="client-dashboard-hire"]',
    content: 'FlexHire is a simple Applicant Tracing System, where you can create jobs, identify potential candidates, review applicants, automate initial screening, setup interviews and make job offers',
  },
  {
    selector: '[data-tour="client-dashboard-jobs"]',
    content: 'Click the jobs icon to see all of the jobs you have created, as well as your company overall jobs page that you can embed on your own website\'s career page and share on social media.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-candidates"]',
    content: 'Click the candidates icon to see existing FlexHire members that might be a good fit for your job.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-applications"]',
    content: 'Click on applications to see people who have applied to your job. You and your team can review their profiles and manually or automatically request them to initiate a pre-interview screening',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-screening"]',
    content: 'The screening step shows you applicants that you requested to respond to pre-interview initial screening and their responses to your questions.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-interviews"]',
    content: 'Click on the interviews step to see your scheduled interviews with applicants and to leave internal feedback on each candidate across your team.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-offers"]',
    content: 'Click on the offers step to see offers you have made to hire people for your positions.',
    mobileDisabled: true,
  },

  {
    selector: '[data-tour="client-dashboard-manage"]',
    content: 'FlexManage is your Freelancer Management System. Freelance work hired through FlexHire is managed & paid through FlexManage',
  },
  {
    selector: '[data-tour="client-dashboard-team"]',
    content: 'In the teams tab, you can manage your freelance team\'s contracts, managers, etc.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-timesheets"]',
    content: 'Work Reports are weekly reports of the work your freelance team delivers to you.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-invoices"]',
    content: 'Our invoices support simple one-click payment via credit card or wire transfer. We automate payment to your team members in over 150 countries around the world.',
    mobileDisabled: true,
  },
  {
    selector: '[data-tour="client-dashboard-help"]',
    content: 'Click this button to revisit this tour anytime.',
  },
]
