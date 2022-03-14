import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { PAUSE_CONTRACT, END_CONTRACT, RESUME_CONTRACT } from './ClientDucks'
import Client from './Client'

const mapDispatchToProps = dispatch => ({
  pauseContract: contract => dispatch(createAction(PAUSE_CONTRACT)({ contract })),
  endContract: contract => dispatch(createAction(END_CONTRACT)({ contract })),
  resumeContract: contract => dispatch(createAction(RESUME_CONTRACT)({ contract })),
})

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Client)
