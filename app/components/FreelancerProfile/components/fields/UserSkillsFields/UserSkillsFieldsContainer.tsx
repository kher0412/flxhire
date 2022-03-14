import { PureComponent } from 'react'
import { FormValue, ISkill, IUserSkill } from 'types'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import UserSkillsFields from './UserSkillsFields'

export interface IUserSkillsFieldsContainerProps {
  editable: boolean
  user_skills: FormValue<IUserSkill[]>
  freelancer_type_id: FormValue<number>
}

export interface IUserSkillsFieldsContainerState {
  editableSkills: ISkill[]
  editableSkillsReceived: boolean
}

export default class UserSkillsFieldsContainer extends PureComponent<IUserSkillsFieldsContainerProps, IUserSkillsFieldsContainerState> {
  state = {
    editableSkills: [],
    editableSkillsReceived: false,
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    const freelancerTypeId = this.props.freelancer_type_id?.input?.value
    const oldFreelancerTypeId = prevProps.freelancer_type_id?.input?.value
    if (freelancerTypeId !== oldFreelancerTypeId && this.props.editable) this.refresh()
  }

  async refresh() {
    const { editable, freelancer_type_id: { input: { value: freelancerTypeId } } } = this.props

    if (editable) {
      try {
        this.setState({
          editableSkills: await getAPIClient().getSkills({ freelancer_type_id: freelancerTypeId }),
          editableSkillsReceived: true,
        })
      } catch (error) {
        trackError(error)
      }
    }
  }

  render() {
    const { editableSkills, editableSkillsReceived } = this.state

    return (
      <UserSkillsFields
        editableSkills={editableSkills}
        editableSkillsReceived={editableSkillsReceived}
        {...this.props}
      />
    )
  }
}
