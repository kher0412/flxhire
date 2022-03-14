import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import FileUploader from './FileUploader'

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

export default connect(null, mapDispatchToProps)(FileUploader)
