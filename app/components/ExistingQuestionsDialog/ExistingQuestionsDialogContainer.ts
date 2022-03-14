import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import ExistingQuestionsDialog from './ExistingQuestionsDialog'

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ExistingQuestionsDialog)
