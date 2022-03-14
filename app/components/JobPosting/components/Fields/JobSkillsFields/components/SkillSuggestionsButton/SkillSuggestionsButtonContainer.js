import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import SkillSuggestionsButton from './SkillSuggestionsButton'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: async (formData) => {
      try {
        await getAPIClient().suggestSkill(formData)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Skill suggestion submitted' }))
      } catch (error) {
        trackError(error)
      }
    },
  }
}

const formSettings = {
  form: 'skillSuggestionsForm',
  validate: (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    if (!values.description) {
      errors.description = 'Required'
    } else if (values.description.length > 800) {
      errors.description = '800 characters max'
    }

    return errors
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formSettings)(SkillSuggestionsButton))
