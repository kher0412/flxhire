import { takeEvery, put, all } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { GET_BLOG_CATEGORIES, setBlogCategories, GET_BLOG_CATEGORY, setCategory } from './BlogCategoryDucks'

function* watchGetBlogCategories() {
  yield takeEvery(GET_BLOG_CATEGORIES, function* () {
    try {
      const blogCategories = yield getAPIClient().getBlogCategories()

      yield put(setBlogCategories(blogCategories))
    } catch (err) {
      console.error(err)
      trackError(err)
    }
  })
}

function* watchGetBlogCategory() {
  yield takeEvery(GET_BLOG_CATEGORY, function* (action) {
    try {
      const blogCategory = yield getAPIClient().getBlogCategory(action.id)

      yield put(setCategory(blogCategory))
    } catch (err) {
      console.error(err)
      trackError(err)
    }
  })
}

function* watch() {
  yield all([
    watchGetBlogCategories(),
    watchGetBlogCategory(),
  ])
}

export default watch
