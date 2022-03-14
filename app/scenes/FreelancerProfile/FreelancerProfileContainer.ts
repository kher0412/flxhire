import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RootState } from 'reducers'
import { IContractForClient } from 'types'
import { createAction } from 'redux-actions'
import { DELETE_CONTRACT } from 'scenes/ClientManage/ManageDucks'
import {
  SEND_NOTIFICATION,
  RESEND_INVITATION,
} from 'scenes/ClientHire/HireDucks'
import { refreshFreelancer, getContracts } from './FreelancerProfileDucks'
import FreelancerProfile from './FreelancerProfile'

const mapStateToProps = (state: RootState) => {
  return {
    user: state.auth.currentUser,
    contracts: state.freelancer.contracts,
    contacts: state.chat.contacts,
  }
}

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(refreshFreelancer()),
  getContracts: () => dispatch(getContracts()),
  notifyFreelancer: (jobId, freelancerId) => dispatch(createAction(SEND_NOTIFICATION)({ jobId, freelancerId })),
  resendInvitation: (contract: IContractForClient) => dispatch(createAction(RESEND_INVITATION)({ contract })),
  deleteContract: (contract: IContractForClient) => dispatch(createAction(DELETE_CONTRACT)({ contract })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(FreelancerProfile))
