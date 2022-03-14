import moment from 'moment'
import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { reduxForm, formValueSelector, InjectedFormProps } from 'redux-form'
import { get } from 'lodash'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import EnablePaymentsButton from './EnablePaymentsButton'

const form = {
  form: 'EnablePaymentsForContract',
  validate: (values, props) => {
    const minRate = get(props, 'configuration.invitation_min_client_rate_usd', 20)
    const errors: any = {}

    if (!values.freelancer_rate) {
      errors.freelancer_rate = 'Required'
    } else if (values.freelancer_rate < minRate) {
      errors.freelancer_rate = `Must be at least ${minRate}`
    }

    return errors
  },
}

const mapStateToProps = (state: RootState) => ({
  configuration: state.auth.currentUser.configuration,
  clientRate: formValueSelector(form.form)(state, 'client_rate') || 0,
  initialValues: {
    end_date: moment().add(1, 'month').toDate(),
  },
})

const mapDispatchToProps = dispatch => ({
  submitForm: async (contractId, formData) => {
    try {
      // TODO: replace with GraphQL mutation
      await getAPIClient().updateContract(contractId, {
        ...formData,
        end_date: moment(formData.end_date).format('YYYY-MM-DD'),
        payments_enabled: true,
      })

      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Payments processing enabled' }))
    } catch (err) {
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: err.response || err.message || err }))
      trackError(err)
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(form)(EnablePaymentsButton))
