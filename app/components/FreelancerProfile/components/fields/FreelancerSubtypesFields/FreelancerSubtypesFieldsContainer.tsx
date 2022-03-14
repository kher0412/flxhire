import { PureComponent } from 'react'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { FormValue, IFreelancerSubtype } from 'types'
import FreelancerSubtypesFields from './FreelancerSubtypesFields'

export interface IFreelancerSubtypesFieldsContainerProps {
  editable: boolean
  freelancer_subtype_ids: FormValue<number[]>
  freelancer_type_id: FormValue<number>
}

export interface IFreelancerSubtypesFieldsContainerState {
  editableFreelancerSubtypes: IFreelancerSubtype[]
  editableFreelancerSubtypesReceived: boolean
}

export default class FreelancerSubtypesFieldsContainer extends PureComponent<IFreelancerSubtypesFieldsContainerProps, IFreelancerSubtypesFieldsContainerState> {
  state = {
    editableFreelancerSubtypes: [],
    editableFreelancerSubtypesReceived: false,
  }

  async componentDidMount() {
    const { freelancer_type_id: { input: { value: freelancerTypeId } } } = this.props

    if (freelancerTypeId) {
      this.refresh()
    }
  }

  async componentDidUpdate(prevProps) {
    const { freelancer_type_id: { input: { value: freelancerTypeId } } } = this.props

    if (freelancerTypeId && freelancerTypeId !== prevProps.freelancer_type_id.input.value) {
      // freelancer_type_id changed, re-fetch subtypes for new freelancer type.
      this.refresh()
    }
  }

  async refresh() {
    try {
      const { freelancer_type_id: { input: { value: freelancerTypeId } } } = this.props

      this.setState({
        editableFreelancerSubtypes: await getAPIClient().getFreelancerSubtypes(freelancerTypeId),
        editableFreelancerSubtypesReceived: true,
      })
    } catch (error) {
      trackError(error)
    }
  }

  render() {
    const { editableFreelancerSubtypes, editableFreelancerSubtypesReceived } = this.state

    return (
      <FreelancerSubtypesFields
        editableFreelancerSubtypes={editableFreelancerSubtypes}
        editableFreelancerSubtypesReceived={editableFreelancerSubtypesReceived}
        {...this.props}
      />
    )
  }
}
