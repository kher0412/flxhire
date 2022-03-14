import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { TimelineEntryType, Institute, ISkill } from 'types'
import { RootState } from 'reducers'
import EditTimelineEntryDialog from './EditTimelineEntryDialog'

interface IEditTimelineEntryDialogContainerProps {
  open: boolean
  fieldName: string
  type: TimelineEntryType
  isNew: boolean
  freelancerTypeId: number
  onCancel: () => void
  onSave: () => void
}

class EditTimelineEntryDialogContainer extends React.PureComponent<IEditTimelineEntryDialogContainerProps> {
  state = {
    editableInstitutes: [] as Institute[],
    editableskills: [] as ISkill[],
  }

  async componentDidMount() {
    try {
      this.setState({
        editableInstitutes: await getAPIClient().getInstitutes(),
        editableskills: await getAPIClient().getSkills({ freelancer_type_id: this.props.freelancerTypeId }),
      })
    } catch (error) {
      trackError(error)
    }
  }

  render() {
    const { editableInstitutes, editableskills } = this.state

    return (
      <EditTimelineEntryDialog
        editableInstitutes={editableInstitutes}
        editableSkills={editableskills}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: Omit<IEditTimelineEntryDialogContainerProps, 'type'>) => ({
  type: formValueSelector('myProfileForm')(state, `${ownProps.fieldName}.entry_type`),
})

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export type ContainerProps = PropsFromRedux & IEditTimelineEntryDialogContainerProps

export default connector(EditTimelineEntryDialogContainer)
