import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { isMember } from 'services/user'
import { getBlogCategories } from '../../BlogCategoryDucks'
import { getRecentBlogPosts } from '../../BlogPostDucks'
import BlogCategoryList from './BlogCategoryList'

const mapStateToProps = state => ({
  blogCategories: state.blogCategories.blogCategories,
  blogCategoriesReceived: state.blogCategories.blogCategoriesReceived,
  recentBlogPosts: state.blogPosts.recentBlogPosts,
  recentBlogPostsReceived: state.blogPosts.recentBlogPostsReceived,
  canCreatePost: isMember(state.auth.currentUser),
})

const mapDispatchToProps = dispatch => ({
  getBlogCategories: () => dispatch(getBlogCategories()),
  getRecentBlogPosts: () => dispatch(getRecentBlogPosts()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogCategoryList))
