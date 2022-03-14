import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, formValueSelector, InjectedFormProps, ConfigProps } from 'redux-form'
import moment from 'moment'
import { findIndex, get } from 'lodash'
import { RootState } from 'reducers'
import storage from 'services/localStorage'
import { trackError } from 'services/analytics'
import { fetchQuery } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { InvitationFormContainer_asyncValidateQuery } from '__generated__/InvitationFormContainer_asyncValidateQuery.graphql'
import { IRecipientEntry } from 'scenes/InvitationTeam/RecipientEntry'
import { FormErrors } from 'types'
import InvitationForm, { IInvitationFormProps } from './InvitationForm'

export interface IInvitationFormFields {
  recipients: Partial<IRecipientEntry>[]
  start_date: string
  end_date: string
  client_rate: number
  payments_enabled: boolean
  rate_mode: 'hour' | 'month'
  enable_timesheets: boolean
  allow_manage_access: boolean
  invoice_manager_id: 'self' | string
  require_timesheet_approval_for_payments: boolean
  job_id: string
  client_id: string
  freelancer_id: string
  discount_code: string
  currency: string
  annual_compensation: number
  invoice_schedule: 'weekly' | 'monthly'
  bonus_client_rate: number
  bonus_period: 'monthly' | 'yearly'
  team_invitation_message: string
}

// TODO: this (and dependent code) can be removed once stripe redirection is phased out
export const INVITATION_FORM_LOCAL_STORAGE_KEY = 'InvitationTeamFormValues'

export const INVITATION_FORM: ConfigProps<IInvitationFormFields, IInvitationFormProps> = {
  form: 'InvitationTeamForm',
  validate: (values, props) => {
    const errors: FormErrors<IInvitationFormFields> = {}

    if (!props.offerMode) {
      if (values.recipients?.length > 0) {
        const recipientsErrors = {}

        for (let i = 0, n = values.recipients.length; i < n; i++) {
          let entry = values.recipients[i]

          if (!entry?.first_name) {
            recipientsErrors[i] = recipientsErrors[i] || {}
            recipientsErrors[i].first_name = 'Required'
          }

          if (!entry?.last_name) {
            recipientsErrors[i] = recipientsErrors[i] || {}
            recipientsErrors[i].last_name = 'Required'
          }

          if (!entry?.email) {
            recipientsErrors[i] = recipientsErrors[i] || {}
            recipientsErrors[i].email = 'Required'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(entry.email)) {
            recipientsErrors[i] = recipientsErrors[i] || {}
            recipientsErrors[i].email = 'Invalid email address'
          }

          if (!entry?.invitation_type) {
            recipientsErrors[i] = recipientsErrors[i] || {}
            recipientsErrors[i].invitation_type = 'Required'
          }
        }

        if (Object.keys(recipientsErrors).length > 0) {
          errors.recipients = recipientsErrors
        }
      } else {
        errors.recipients = {
          _error: 'At least 1 recipient required',
        }
      }
    }

    if (values.end_date && values.start_date && !moment(values.end_date).isAfter(moment(values.start_date))) {
      errors.end_date = 'Must be after start date'
    }

    let invitationType = (values.recipients || [])[0]?.invitation_type

    if (invitationType === 'individual') {
      if (values.payments_enabled) {
        if (!values.client_rate) {
          errors.client_rate = 'Required'
        }

        if (values.rate_mode === 'hour') {
          if (!values.enable_timesheets) {
            errors.enable_timesheets = 'Required for hourly rate'
          }
        }

        if (values.rate_mode === 'month' && values.require_timesheet_approval_for_payments) {
          errors.require_timesheet_approval_for_payments = 'Cannot be used with a monthly fixed salary'
        } else if (values.require_timesheet_approval_for_payments && !values.enable_timesheets) {
          errors.require_timesheet_approval_for_payments = 'Requires "Enable Work Reports" to be on'
        }

        const minClientRate = get(props, 'currentUser.configuration.invitation_min_client_rate_usd')

        if (values.client_rate && minClientRate && values.client_rate < minClientRate) {
          errors.client_rate = `Hourly rate must be ${minClientRate} or greater`
        }
      }
    } else if (invitationType === 'manager' || invitationType === 'admin') {
      if (!values.invoice_manager_id) {
        errors.invoice_manager_id = 'Required'
      }
    }

    return errors
  },
  asyncBlurFields: ['email'],
  asyncValidate: async (values, dispatch, props) => {
    const errors: FormErrors<IInvitationFormFields> = {}
    // TODO: we should not need to check "props" to know this is an offer and not an invitation
    // it should be part of the values of the form
    // TODO: this only checks the first invited recipient. We need to fix it so it checks all of them
    const email = values?.recipients?.[0]?.email
    if (email && !props.offerMode) {
      try {
        const data = await fetchQuery<InvitationFormContainer_asyncValidateQuery>(graphql`
        query InvitationFormContainer_asyncValidateQuery($freelancerEmail: String!) {
          contract(freelancerEmail: $freelancerEmail) {
            id
            status
          }
        }
      `, {
          freelancerEmail: email,
        })
        if (data?.contract?.id && data?.contract?.status !== 'deleted') {
          errors.recipients._error = `${email} has already been invited`
        }
      } catch (error) {
        trackError(error)
      }
    }

    if (Object.keys(errors).length > 0) throw errors
  },
}

function getStoredInitialValues(): Partial<IInvitationFormFields> {
  try {
    return JSON.parse(storage.getItem(INVITATION_FORM_LOCAL_STORAGE_KEY)) || {}
  } catch (err) {
    return {}
  }
}

type IInvitationFormContainerProps = IInvitationFormProps & { defaultValues?: Partial<IInvitationFormFields> }

const mapStateToProps = (state: RootState, ownProps: IInvitationFormContainerProps) => ({
  payments_enabled: formValueSelector(INVITATION_FORM.form)(state, 'payments_enabled'),
  recipients: (formValueSelector(INVITATION_FORM.form)(state, 'recipients') || []) as IRecipientEntry[],
  currencyCode: formValueSelector(INVITATION_FORM.form)(state, 'currency'),
  initializeAccountSetupStep: Object.keys(getStoredInitialValues()).length > 0,
  firstInvitation: state.auth.currentUser?.firm?.active_members_count === 0,
  initialValues: {
    recipients: [{ first_name: '', last_name: '', email: '', invitation_type: '' }],
    payments_enabled: true,
    enable_timesheets: true,
    require_timesheet_approval_for_payments: true,
    allow_manage_access: ownProps.allowGivingManageAccess,
    start_date: moment().add(1, 'day').toDate(),
    end_date: moment().add(1, 'day').add(6, 'months').toDate(),
    team_invitation_message: state.auth.currentUser?.team_invitation_message,
    invoice_manager_id: 'self',
    invoice_schedule: state.auth.currentUser?.firm?.invoice_schedule,
    currency: state.auth.currentUser.firm?.currency || 'USD',
    rate_mode: 'hour',
    client_id: ownProps?.managers?.find(m => m.self)?.id || ownProps.managers?.[0]?.id,
    bonus_period: 'yearly',
    ...getStoredInitialValues(),
    ...(ownProps.defaultValues || {}) as IInvitationFormFields,
  } as IInvitationFormFields,
})

const connector = connect(mapStateToProps)

export type InvitationFormContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<IInvitationFormFields, IInvitationFormProps>

export default connector(reduxForm<IInvitationFormFields, IInvitationFormContainerProps>(INVITATION_FORM)(InvitationForm))
