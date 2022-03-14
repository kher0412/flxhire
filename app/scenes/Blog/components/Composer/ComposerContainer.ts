import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { reduxForm, formValueSelector, InjectedFormProps } from 'redux-form'
import { RootState } from 'reducers'
import { getBlogCategories } from '../../BlogCategoryDucks'
import Composer, { IComposerProps } from './Composer'
import { createBlogPost, updateBlogPost, publishBlogPost, getBlogPost, deleteBlogPost } from '../../BlogPostDucks'

const blogComposerForm = {
  form: 'blogComposerForm',
  enableReinitialize: true,
  validate: (values) => {
    const errors = {} as { [name: string]: string }

    if (!values.title) {
      errors.title = 'Required'
    }

    if (!values.excerpt) {
      errors.excerpt = 'Required'
    } else if (values.excerpt.length > 350) {
      errors.excerpt = 'Max 350 characters'
    }

    if (!values.content) {
      errors.content = 'Required'
    }

    if (!values.blog_category_id) {
      errors.blog_category_id = 'Required'
    }

    return errors
  },
}

const mapStateToProps = (state, props) => {
  let isEditMode = !!props.router.query.post
  let initialValues = {} as any

  if (isEditMode) {
    initialValues = {
      ...state.blogPosts.currentBlogPost,
      video_id: state.blogPosts.currentBlogPost.video?.id,
    }
  }

  return {
    user: state.auth.currentUser,
    formName: 'blogComposerForm',
    isEditMode: isEditMode,
    isLoading: !state.blogCategories.blogCategoriesReceived || (isEditMode && !state.blogPosts.currentBlogPostReceived),
    initialValues: initialValues,
    blogPostHasVideo: (initialValues.video_id !== undefined),
    blogPostTitle: formValueSelector('blogComposerForm')(state, 'title'),
    blogPostContent: formValueSelector('blogComposerForm')(state, 'content'),
    blogPost: state.blogPosts.currentBlogPost,
    blogCategories: state.blogCategories.blogCategories,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getCategories: () => dispatch(getBlogCategories()),
    getBlogPost: () => dispatch(getBlogPost(props.router.query.post)),
    deletePost: (id) => {
      dispatch(deleteBlogPost(id))
    },
    submitForm: (formData, isEditMode, publish) => {
      if (publish) {
        dispatch(publishBlogPost(formData))
      } else if (isEditMode) {
        dispatch(updateBlogPost(formData))
      } else {
        dispatch(createBlogPost(formData))
      }
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ComposerContainerProps = InjectedFormProps<any, IComposerProps> & ConnectedProps<typeof connector>

export default withRouter(connector(reduxForm<any, IComposerProps>(blogComposerForm)(Composer)))
