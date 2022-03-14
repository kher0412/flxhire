import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { isMember } from 'services/user'
import { getBlogPostsForCategory } from '../../BlogPostDucks'
import { getCategory } from '../../BlogCategoryDucks'
import BlogPostList from './BlogPostList'

const mapStateToProps = state => ({
  category: state.blogCategories.currentBlogCategory,
  categoryReceived: state.blogCategories.currentBlogCategoryReceived,
  blogPosts: state.blogPosts.blogPosts,
  blogPostsReceived: state.blogPosts.blogPostsReceived,
  canCreatePost: isMember(state.auth.currentUser),
})

const mapDispatchToProps = dispatch => ({
  getBlogCategory: categoryId => dispatch(getCategory(categoryId)),
  getPostsForCategory: categoryId => dispatch(getBlogPostsForCategory(categoryId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogPostList))
