import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { isPristine } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RESET_JOB_FORM } from 'scenes/ClientHire/HireDucks'
import { setAvoidBillingSetupDialog } from 'reducers/Common'
import AddJob from './AddJob'

// Legacy container
const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser,
  companyDataComplete: (state.auth.currentUser?.firm?.name && state.auth.currentUser?.firm?.description) ? true : false,
  jobDetailsUnsaved: !isPristine('editJobDetailsForm')(state),
})

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(createAction(RESET_JOB_FORM)()),
  setAvoidBillingSetupDialog: (avoid: boolean) => dispatch(setAvoidBillingSetupDialog(avoid)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(AddJob))
