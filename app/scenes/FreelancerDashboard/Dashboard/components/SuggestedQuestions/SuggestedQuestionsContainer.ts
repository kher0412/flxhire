import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import SuggestedQuestions from './SuggestedQuestions'

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(null, mapDispatchToProps)
export type SuggestedQuestionsContainerProps = ConnectedProps<typeof connector>

export default connect(null, mapDispatchToProps)(SuggestedQuestions)
