import update from 'immutability-helper'

export const GET_BLOG_POST = 'flexhire/blog/GET_BLOG_POST'
export const SET_BLOG_POST = 'flexhire/blog/SET_BLOG_POST'
export const SET_BLOG_POST_ERROR = 'flexhire/blog/SET_BLOG_POST_ERROR'
export const GET_BLOG_POSTS_FOR_CATEGORY = 'flexhire/blog/GET_BLOG_POSTS_FOR_CATEGORY'
export const SET_BLOG_POSTS_FOR_CATEGORY = 'flexhire/blog/SET_BLOG_POSTS_FOR_CATEGORY'
export const GET_RECENT_BLOG_POSTS = 'flexhire/blog/GET_RECENT_BLOG_POSTS'
export const SET_RECENT_BLOG_POSTS = 'flexhire/blog/SET_RECENT_BLOG_POSTS'
export const GET_MY_BLOG_POSTS = 'flexhire/blog/GET_MY_BLOG_POSTS'
export const SET_MY_BLOG_POSTS = 'flexhire/blog/SET_MY_BLOG_POSTS'
export const CREATE_BLOG_POST = 'flexhire/blog/CREATE_BLOG_POST'
export const UPDATE_BLOG_POST = 'flexhire/blog/UPDATE_BLOG_POST'
export const PUBLISH_BLOG_POST = 'flexhire/blog/PUBLISH_BLOG_POST'
export const DELETE_BLOG_POST = 'flexhire/blog/DELETE_BLOG_POST'

const initialState = {
  currentBlogPost: {},
  currentBlogPostReceived: false,
  currentBlogPostError: undefined,
  blogPosts: [],
  blogPostsReceived: false,
  recentBlogPosts: [],
  recentBlogPostsReceived: false,
}

/**
 * @param {number} id ID of the BlogPost to get.
 */
export function getBlogPost(id) {
  return {
    type: GET_BLOG_POST,
    id: id,
  }
}

/**
 * @param {Object} blogPost The BlogPost object to set.
 */
export function setBlogPost(blogPost) {
  return {
    type: SET_BLOG_POST,
    blogPost: blogPost,
  }
}

export function setBlogPostError(err) {
  return {
    type: SET_BLOG_POST_ERROR,
    error: err,
  }
}

/**
 * @param {number} categoryId BlogCategory ID.
 */
export function getBlogPostsForCategory(categoryID) {
  return {
    type: GET_BLOG_POSTS_FOR_CATEGORY,
    categoryID: categoryID,
  }
}

/**
 * @param {number} categoryId BlogCategory ID.
 * @param {Array} blogPosts Blog posts for category.
 */
export function setBlogPostsForCategory(categoryId, blogPosts) {
  return {
    type: SET_BLOG_POSTS_FOR_CATEGORY,
    blogPosts: blogPosts,
  }
}

export function getRecentBlogPosts() {
  return {
    type: GET_RECENT_BLOG_POSTS,
  }
}

/**
 * @param {Array} blogPosts Blog posts for category.
 */
export function setRecentBlogPosts(blogPosts) {
  return {
    type: SET_RECENT_BLOG_POSTS,
    blogPosts: blogPosts,
  }
}

export function getMyBlogPosts() {
  return {
    type: GET_MY_BLOG_POSTS,
  }
}

/**
 * @param {Array} blogPosts Blog posts for category.
 */
export function setMyBlogPosts(blogPosts) {
  return {
    type: SET_MY_BLOG_POSTS,
    blogPosts: blogPosts,
  }
}

/**
 * @param {Object} blogPost The BlogPost object to create.
 */
export function createBlogPost(blogPost) {
  return {
    type: CREATE_BLOG_POST,
    blogPost: blogPost,
  }
}

/**
 * @param {Object} blogPost The BlogPost object to update.
 */
export function updateBlogPost(blogPost, shouldRedirect = true) {
  return {
    type: UPDATE_BLOG_POST,
    blogPost: blogPost,
    shouldRedirect: shouldRedirect,
  }
}

/**
 * @param {Object} blogPost The BlogPost object to publish.
 */
export function publishBlogPost(blogPost) {
  return {
    type: PUBLISH_BLOG_POST,
    blogPost: blogPost,
  }
}

/**
 * @param {number} blogPostId The ID of the BlogPost to delete.
 */
export function deleteBlogPost(blogPostId, shouldRedirect = true) {
  return {
    type: DELETE_BLOG_POST,
    blogPostId: blogPostId,
    shouldRedirect: shouldRedirect,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOG_POST:
      return update(state, {
        currentBlogPostReceived: {
          $set: !state.currentBlogPostReceived || action.id !== action.blogPost?.slug,
        },
      })

    case SET_BLOG_POST:
      return update(state, {
        currentBlogPost: { $set: action.blogPost },
        currentBlogPostReceived: { $set: true },
      })

    case SET_BLOG_POST_ERROR:
      return update(state, {
        currentBlogPostError: { $set: action.error },
      })

    case GET_BLOG_POSTS_FOR_CATEGORY:
      return update(state, {
        blogPostsReceived: { $set: false },
      })

    case SET_BLOG_POSTS_FOR_CATEGORY:
      return update(state, {
        blogPosts: { $set: action.blogPosts },
        blogPostsReceived: { $set: true },
      })

    case GET_RECENT_BLOG_POSTS:
      return update(state, {
        recentBlogPostsReceived: { $set: false },
      })

    case SET_RECENT_BLOG_POSTS:
      return update(state, {
        recentBlogPosts: { $set: action.blogPosts },
        recentBlogPostsReceived: { $set: true },
      })

    case GET_MY_BLOG_POSTS:
      return update(state, {
        myBlogPostsReceived: { $set: false },
      })

    case SET_MY_BLOG_POSTS:
      return update(state, {
        myBlogPosts: { $set: action.blogPosts },
        myBlogPostsReceived: { $set: true },
      })
  }

  return state
}
