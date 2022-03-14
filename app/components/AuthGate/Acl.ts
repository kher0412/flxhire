import { get } from 'lodash'
import {
  oneOf,
  all_allowed,
  guest_allowed,
  freelancer_allowed,
  freelancer_applied_allowed,
  freelancer_in_screening_allowed,
  freelancer_unverified_allowed,
  freelancer_deleted_allowed,
  client_allowed,
  admin_allowed,
  recruiter_allowed,
  sales_allowed,
  unconfirmed_email_allowed,
  password_setup_required_allowed,
} from './Authorizers'

const Acl = {
  Layout: all_allowed,
  ConfirmEmail: oneOf(unconfirmed_email_allowed, guest_allowed),
  PasswordSetup: password_setup_required_allowed,
  Job: all_allowed,
  SampleSkills: all_allowed,
  Account: oneOf(client_allowed, freelancer_allowed),
  // If there is a `token` parameter, then we have to allow the Login view to be seen
  // so the component can log in as the new user
  Login: oneOf(guest_allowed, (user, { router }) => Boolean(get(router, 'query.token'))),
  HowItWorks: all_allowed,
  ForCompanies: all_allowed,
  ForTalent: all_allowed,
  Faq: all_allowed,
  Terms: all_allowed,
  Home: guest_allowed,
  Signup: guest_allowed,
  SignupTimesheets: guest_allowed,
  OauthProvider: guest_allowed,
  GithubCallback: guest_allowed,
  LinkedinCallback: all_allowed,
  TwitterCallback: all_allowed,
  ForgotPassword: guest_allowed,
  ChangePassword: guest_allowed,
  ActivateAccount: guest_allowed,
  GiveReference: all_allowed,
  ReferenceSubmitted: all_allowed,
  Questions: all_allowed,

  Profile: freelancer_allowed,
  MyProfile: freelancer_allowed,
  Skills: freelancer_allowed,
  TaxCompliance: freelancer_allowed,
  VideoIntroduction: freelancer_in_screening_allowed,
  References: freelancer_in_screening_allowed,
  ScreeningFinalStep: freelancer_in_screening_allowed,
  ScreeningAssignments: freelancer_in_screening_allowed,
  Review: freelancer_allowed,

  ApplicationSubmitted: freelancer_applied_allowed,

  FreelancerDashboard: oneOf(freelancer_unverified_allowed, freelancer_deleted_allowed),
  JobScreening: freelancer_unverified_allowed,
  FreelancerTimesheets: freelancer_unverified_allowed,
  TimesheetForm: freelancer_unverified_allowed,
  FreelancerTimesheet: freelancer_unverified_allowed,
  EditTimesheet: freelancer_unverified_allowed,
  FreelancerProfile: freelancer_unverified_allowed,

  Referrals: freelancer_unverified_allowed,

  InvitationTeam: client_allowed,
  ClientDashboard: client_allowed,
  ClientHire: oneOf(client_allowed, admin_allowed, sales_allowed, recruiter_allowed),
  ClientInvoice: client_allowed,
  Freelancer: all_allowed,
  AddJob: client_allowed,
  ClientManage: client_allowed,
  ClientTimesheet: client_allowed,

  MembersPipeline: recruiter_allowed,

  VideoMeet: oneOf(freelancer_allowed, client_allowed),
  DeveloperAPI: all_allowed,
}

export default Acl
