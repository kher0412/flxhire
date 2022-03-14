import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { submit } from 'redux-form'
import InterviewDialog from './InterviewDialog'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  submit: () => dispatch(submit('hireInterviewForm')),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(InterviewDialog)
