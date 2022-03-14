import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { openChat } from 'reducers/Chat'
import { IChatUser } from 'types'
import Contact from './Contact'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDirectChat: () => dispatch(openChat({ user_id: ownProps.contact.id, user: ownProps.contact })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & {
  contact: IChatUser
}

export default connector(Contact)
