import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { getFormSyncErrors, touch, getFormValues } from 'redux-form'
import { setEditingTimelineEntry } from 'scenes/FreelancerProfile/FreelancerProfileDucks'
import TimelineEntriesField from './TimelineEntriesField'

const mapStateToProps = (state: RootState) => ({
  syncErrors: getFormSyncErrors('myProfileForm')(state),
  freelancerTypeId: (getFormValues('myProfileForm')(state) as any)?.freelancer_type_id,
  currentItemIndex: state.freelancer.editingTimelineEntry.index,
  currentItemPreviousValue: state.freelancer.editingTimelineEntry.previousValue,
})

const mapDispatchToProps = dispatch => ({
  touch: (...fields) => dispatch(touch('myProfileForm', ...fields)),
  setCurrentItem: (index, previousValue?: any) => dispatch(setEditingTimelineEntry(index, previousValue)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TimelineEntriesField)
