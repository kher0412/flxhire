import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { getBlogPost } from '../../BlogPostDucks'
import BlogPost from './BlogPost'

const mapStateToProps = state => ({
  blogPost: state.blogPosts.currentBlogPost,
  blogPostReceived: state.blogPosts.currentBlogPostReceived,
  error: state.blogPosts.currentBlogPostError,
  isEditable: state.blogPosts.currentBlogPost.is_own_post,
})

const mapDispatchToProps = dispatch => ({
  getBlogPost: id => dispatch(getBlogPost(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogPost))
