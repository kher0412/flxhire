import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { updateBlogPost, deleteBlogPost } from 'scenes/Blog/BlogPostDucks'
import { RootState } from 'reducers'
import BlogPostsField from './BlogPostsField'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  onSetBlogPostVisibility: (id, visible) => {
    try {
      dispatch(updateBlogPost({ id: id, status: visible ? 'published' : 'draft' }, false))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Blog post updated' }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not update post' }))
    }
  },
  onDeleteBlogPost: (id) => {
    try {
      dispatch(deleteBlogPost(id, false))
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Blog post deleted' }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'An error occurred while deleting post' }))
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(BlogPostsField)
