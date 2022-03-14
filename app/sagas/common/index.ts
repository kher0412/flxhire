import watchJob from 'scenes/Job/JobSaga'
import watchSampleSkills from 'scenes/SampleSkills/SampleSkillsSaga'
import watchBlogPosts from 'scenes/Blog/BlogPostSagas'
import watchBlogCategories from 'scenes/Blog/BlogCategorySagas'
import watchAccount from 'scenes/Account/sagas'

const commonSagas = [
  watchJob(),
  watchSampleSkills(),
  watchBlogPosts(),
  watchBlogCategories(),
  watchAccount(),
]

export default commonSagas
