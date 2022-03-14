import { connect } from 'react-redux'
import { browserHistory } from 'services/router'
import { createAction } from 'redux-actions'
import References from './References'
import { SET_REFERENCES_COUNT_ERROR } from './ReferencesDucks'

const mapStateToProps = state => ({
  referencesCount: state.screening.referenceForm.references.length,
  referencesError: state.screening.references.referencesError,
})

const mapDispatchToProps = dispatch => ({
  next: (count) => {
    if (count >= 2) {
      browserHistory.push('/application/interview')
    } else {
      dispatch(createAction(SET_REFERENCES_COUNT_ERROR)())
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(References)
