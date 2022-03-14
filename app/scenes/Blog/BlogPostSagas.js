import { takeEvery, put, all } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { showSnackbarMessage } from 'sagas/__helpers'
import { trackError } from 'services/analytics'
import {
  GET_BLOG_POST,
  setBlogPost,
  GET_BLOG_POSTS_FOR_CATEGORY,
  setBlogPostsForCategory,
  CREATE_BLOG_POST,
  UPDATE_BLOG_POST,
  PUBLISH_BLOG_POST,
  GET_RECENT_BLOG_POSTS,
  setRecentBlogPosts,
  setMyBlogPosts,
  GET_MY_BLOG_POSTS,
  DELETE_BLOG_POST,
  setBlogPostError,
} from './BlogPostDucks'

function* watchCreateBlogPost() {
  yield takeEvery(CREATE_BLOG_POST, function* (action) {
    try {
      const blogPost = yield getAPIClient().createBlogPost(action.blogPost)

      browserHistory.push('/blog/[category]/[post]', `/blog/${blogPost.blog_category_slug}/${blogPost.slug}`)
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchUpdateBlogPost() {
  yield takeEvery(UPDATE_BLOG_POST, function* (action) {
    try {
      const blogPost = yield getAPIClient().updateBlogPost(action.blogPost.id, action.blogPost)

      if (action.shouldRedirect) {
        browserHistory.push('/blog/[category]/[post]', `/blog/${blogPost.blog_category_slug}/${blogPost.slug}`)
      }
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchPublishBlogPost() {
  yield takeEvery(PUBLISH_BLOG_POST, function* (action) {
    try {
      const blogPost = yield getAPIClient().publishBlogPost(action.blogPost.id, action.blogPost)

      browserHistory.push('/blog/[category]/[post]', `/blog/${blogPost.blog_category_slug}/${blogPost.slug}`)
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchDeleteBlogPost() {
  yield takeEvery(DELETE_BLOG_POST, function* (action) {
    try {
      yield getAPIClient().deleteBlogPost(action.blogPostId)
      yield showSnackbarMessage('Blog post deleted')

      if (action.shouldRedirect) {
        browserHistory.push('/blog/my_posts')
      }
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchGetBlogPost() {
  yield takeEvery(GET_BLOG_POST, function* (action) {
    try {
      const blogPost = yield getAPIClient().getBlogPost(action.id)

      yield put(setBlogPost(blogPost))
    } catch (err) {
      yield put(setBlogPostError(err))
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchGetBlogPostsForCategory() {
  yield takeEvery(GET_BLOG_POSTS_FOR_CATEGORY, function* (action) {
    try {
      const blogPosts = yield getAPIClient().getBlogPostsForCategory(action.categoryID)

      yield put(setBlogPostsForCategory(action.categoryID, blogPosts))
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchGetRecentBlogPosts() {
  yield takeEvery(GET_RECENT_BLOG_POSTS, function* () {
    try {
      const blogPost = yield getAPIClient().getRecentBlogPosts()

      yield put(setRecentBlogPosts(blogPost))
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watchGetMyBlogPosts() {
  yield takeEvery(GET_MY_BLOG_POSTS, function* () {
    try {
      const blogPost = yield getAPIClient().getMyBlogPosts()

      yield put(setMyBlogPosts(blogPost))
    } catch (err) {
      yield showSnackbarMessage(err.response || err.message || err)
      trackError(err)
    }
  })
}

function* watch() {
  yield all([
    watchGetBlogPost(),
    watchGetBlogPostsForCategory(),
    watchGetRecentBlogPosts(),
    watchGetMyBlogPosts(),
    watchCreateBlogPost(),
    watchUpdateBlogPost(),
    watchPublishBlogPost(),
    watchDeleteBlogPost(),
  ])
}

export default watch
