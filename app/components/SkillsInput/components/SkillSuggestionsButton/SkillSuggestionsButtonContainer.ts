import { InjectedFormProps, reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { FormErrors } from 'types'
import { graphql } from 'react-relay'
import { SkillSuggestionsButtonContainer_CreateCustomSkillMutation } from '__generated__/SkillSuggestionsButtonContainer_CreateCustomSkillMutation.graphql'
import { commitMutation } from 'api/graphql'
import SkillSuggestionsButton from './SkillSuggestionsButton'

interface FormValues {
  name: string
  freelancer_types: { id: number }[]
}

export default reduxForm<FormValues>({
  form: 'skillSuggestionsForm',
  validate: (values) => {
    const errors: FormErrors<FormValues> = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    if (values.freelancer_types?.length < 1) {
      errors.freelancer_types = 'Required'
    }

    return errors
  },
  onSubmit: async (formData, dispatch) => {
    try {
      const input: SkillSuggestionsButtonContainer_CreateCustomSkillMutation['variables']['input'] = {
        name: formData.name,
        freelancerTypeIds: formData.freelancer_types.map(x => x.id),
      }
      await commitMutation<SkillSuggestionsButtonContainer_CreateCustomSkillMutation>({
        mutation: graphql`
            mutation SkillSuggestionsButtonContainer_CreateCustomSkillMutation($input: CreateCustomSkillInput!) {
              createCustomSkill(input: $input) {
                skill{
                  name
                }
              }
            }
          `,
        variables: {
          input,
        },
      })
      // TODO: make the skill appear without a hard refresh
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Skill successfully created. Refresh the page to use it' }))
    } catch (error) {
      trackError(error)
    }
  },
})(SkillSuggestionsButton)

export type ContainerProps = InjectedFormProps
