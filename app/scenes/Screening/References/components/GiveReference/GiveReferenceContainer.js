import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'next/router'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import GiveReference from './GiveReference'
import { setReferenceUser, submitGiveReferenceForm } from './GiveReferenceDucks'

const form = {
  form: 'profileGiveReference',
  validate: (values) => {
    const errors = {}
    if (!values.name) { errors.name = 'Required' }
    return errors
  },
  initialValues: {
    relation: 'friend',
    rating_professional: '5',
    would_recommend: true,
  },
}

const mapStateToProps = state => ({
  serverError: state.screening.giveReference.serverError,
  user: state.screening.giveReference.user,
})

const mapDispatchToProps = dispatch => ({
  submitForm: (formData) => { dispatch(submitGiveReferenceForm(formData)) },
  formAction: (action) => { dispatch(action) },
  getUser: async (userId) => {
    try {
      const user = await getAPIClient().getReferenceUser(userId)
      dispatch(setReferenceUser(user))
    } catch (error) {
      trackError(error)
    }
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(form)(GiveReference)))
