import update from 'immutability-helper'

export const GET_BLOG_CATEGORY = 'flexhire/blog/GET_BLOG_CATEGORY'
export const SET_BLOG_CATEGORY = 'flexhire/blog/SET_BLOG_CATEGORY'
export const GET_BLOG_CATEGORIES = 'flexhire/blog/GET_BLOG_CATEGORIES'
export const SET_BLOG_CATEGORIES = 'flexhire/blog/SET_BLOG_CATEGORIES'

const initialState = {
  currentBlogCategory: {},
  currentBlogCategoryReceived: false,
  blogCategories: [],
  blogCategoriesReceived: false,
}

export function getBlogCategories() {
  return {
    type: GET_BLOG_CATEGORIES,
  }
}

/**
 * @param {Array} blogCategories The array of BlogCategory objects to set.
 */
export function setBlogCategories(blogCategories) {
  return {
    type: SET_BLOG_CATEGORIES,
    blogCategories: blogCategories,
  }
}

/**
 * @param {number} categoryID ID of the BlogCategory to get.
 */
export function getCategory(categoryID) {
  return {
    type: GET_BLOG_CATEGORY,
    id: categoryID,
  }
}

export function setCategory(blogCategory) {
  return {
    type: SET_BLOG_CATEGORY,
    blogCategory: blogCategory,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOG_CATEGORIES:
      return update(state, {
        blogCategoriesReceived: {
          $set: !state.currentBlogCategory || state.currentBlogCategory?.slug !== action.id,
        },
      })

    case SET_BLOG_CATEGORIES:
      return update(state, {
        blogCategories: { $set: action.blogCategories },
        blogCategoriesReceived: { $set: true },
      })

    case GET_BLOG_CATEGORY:
      return update(state, {
        currentBlogCategoryReceived: { $set: false },
      })

    case SET_BLOG_CATEGORY:
      return update(state, {
        currentBlogCategory: { $set: action.blogCategory },
        currentBlogCategoryReceived: { $set: true },
      })
  }

  return state
}
