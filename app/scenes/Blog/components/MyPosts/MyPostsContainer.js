import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { getMyBlogPosts } from '../../BlogPostDucks'
import MyPosts from './MyPosts'

const mapStateToProps = state => ({
  blogPosts: state.blogPosts.myBlogPosts,
  blogPostsReceived: state.blogPosts.myBlogPostsReceived
})

const mapDispatchToProps = dispatch => ({
  getMyBlogPosts: () => dispatch(getMyBlogPosts()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPosts))
