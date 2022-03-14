import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import JobFormWrapper from './JobFormWrapper'

const readonlyJobDetailsForm = {
  form: 'readonlyJobDetailsForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
}

const mapStateToProps = (state, ownProps) => {
  const job = ownProps.job || {}

  return {
    initialValues: {
      ...job,
    },
  }
}

export default connect(mapStateToProps)(reduxForm(readonlyJobDetailsForm)(JobFormWrapper))
