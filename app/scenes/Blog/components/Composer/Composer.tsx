import React from 'react'
import { Field } from 'redux-form'
import { LoadingPage, PageContainer, PageWrapper, ConfirmButton, PageHeader, PageHeaderTitle, FormErrorSummary } from 'components'
import { Card, CardActions, CardContent, MenuItem, Grid, Divider, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Collapse } from '@material-ui/core'
import { Button, TextField, TextArea, SelectField } from 'components/themed'
import { DeleteForever, FlashOn, Save } from '@material-ui/icons'
import Preview from './components/Preview'
import MarkdownField from './components/MarkdownField'
import VideoField from './components/VideoField'
import styles from './Composer.module.css'
import { ComposerContainerProps } from './ComposerContainer'

export interface IComposerProps {
  isEditMode: boolean
  blogPostHasVideo: boolean
}

export interface IComposerState {
  isSubmitting: boolean
  isPreviewOpen: boolean
  videoContentMode: number
}

export default class Composer extends React.Component<IComposerProps & ComposerContainerProps, IComposerState> {
  publishButton: HTMLElement

  constructor(props: IComposerProps & ComposerContainerProps) {
    super(props)

    this.state = {
      isPreviewOpen: false,
      isSubmitting: false,
      videoContentMode: props.blogPostHasVideo ? 1 : 0,
    }
  }

  componentDidMount() {
    const { isEditMode, getCategories, getBlogPost } = this.props

    getCategories()

    if (isEditMode) {
      getBlogPost()
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { isSubmitting } = this.state

    if (nextProps.submitFailed && isSubmitting) {
      this.setState({
        isSubmitting: false,
      })
    }

    if (!this.props.blogPostHasVideo && nextProps.blogPostHasVideo) {
      this.setState({
        videoContentMode: 1,
      })
    }
  }

  render() {
    const { isEditMode } = this.props

    return (
      <div>
        <PageHeader compact>
          <PageHeaderTitle>
            {isEditMode ? 'Edit' : 'Create'} A Blog Article - Help Drive Traffic to Your Profile
          </PageHeaderTitle>
        </PageHeader>

        <PageContainer>
          <PageWrapper withoutCard>
            {this.renderContent()}
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }

  renderContent() {
    const { user, submitFailed, blogCategories = [], blogPostContent, blogPostTitle, blogPost = {}, isEditMode, isLoading } = this.props
    const { isPreviewOpen, isSubmitting, videoContentMode } = this.state
    const isPublished = ((blogPost.status === 'published' || blogPost.status === 'approved') && isEditMode)

    if (isLoading) {
      return (
        <LoadingPage />
      )
    }

    return (
      <form onSubmit={this.handleSubmit(false)}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onKeyDown={this.handleKeyEvent} onKeyPress={this.handleKeyEvent}>
          <Card raised>
            <CardContent className={styles['card-content']}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Blog Post Summary
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Field name="title" label="Title" component={TextField} fullWidth />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Field name="blog_category_id" label="Category" component={SelectField} fullWidth>
                    {blogCategories.map(category => (
                      <MenuItem key={category.id} value={category.id} button>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Field
                    name="excerpt"
                    label="Excerpt"
                    placeholder="In just a sentence or two, summarize what your article is about..."
                    component={TextArea}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <Divider />

            <CardContent className={styles['card-content']}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Video content
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <div className={styles.radio}>
                    <FormControl component="fieldset">
                      <RadioGroup value={videoContentMode} onChange={this.handleVideoContentModeChange}>
                        <FormControlLabel
                          value={0}
                          control={<Radio color="primary" />}
                          label={user?.video ? 'Video introduction on my profile' : 'None'}
                        />

                        <FormControlLabel
                          value={1}
                          control={<Radio color="primary" />}
                          label="Custom video I specify below"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </CardContent>

            <Collapse in={videoContentMode === 1}>
              <div className={styles.video}>
                <Field
                  name="video_id"
                  component={VideoField}
                />
              </div>
            </Collapse>

            <Divider />

            <CardContent className={styles['card-content']}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Post content
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Field
                    name="content"
                    label="Content"
                    placeholder="Post content, you can use full markdown for formatting..."
                    component={MarkdownField}
                    onPreviewOpen={this.handlePreviewOpen}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <Divider />

            <CardActions className={styles['card-actions']}>
              <FormErrorSummary show={submitFailed} />

              <Button type="submit" disabled={isSubmitting} style={{ marginRight: 12 }}>
                <Save style={{ marginRight: 12 }} />
                {isEditMode ? 'Update' : 'Save'} {isPublished ? 'post' : 'draft'}
              </Button>

              {!isPublished && (
                <ConfirmButton
                  disabled={isSubmitting}
                  color="primary"
                  onClick={this.handleSubmit(true)}
                  dialogTitle="Publish"
                  dialogMessage="Submit your blog post for publication? This will make your blog post public."
                  dialogConfirmLabel="Submit"
                  style={{ marginRight: 12 }}
                >
                  <FlashOn style={{ marginRight: 12 }} />

                  <span ref={btn => this.publishButton = btn}>
                    Publish
                  </span>
                </ConfirmButton>
              )}

              {isEditMode && blogPost && (
                <ConfirmButton
                  onClick={() => this.props.deletePost(blogPost.id)}
                  dialogTitle={`Delete ${isPublished ? 'post' : 'draft'}`}
                  dialogMessage={`Delete the ${isPublished ? 'post' : 'draft'} '${blogPostTitle || 'Untitled'}'? This cannot be undone.`}
                  dialogConfirmLabel="Delete"
                  style={{ marginRight: 12 }}
                  critical
                >
                  <DeleteForever style={{ marginRight: 12 }} /> Delete {isPublished ? 'post' : 'draft'}
                </ConfirmButton>
              )}

              <Preview
                content={blogPostContent}
                title={blogPostTitle}
                isOpen={isPreviewOpen}
                onClose={this.handlePreviewClose}
                onPublish={() => this.publishButton.click()}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }

  /**
   * @param {Event} e
   */
  handleVideoContentModeChange = (e) => {
    this.setState({
      videoContentMode: parseInt(e.target.value, 10),
    })
  }

  /**
   * @param {publish} boolean
   */
  handleSubmit = (publish) => {
    const { handleSubmit, submitForm, isEditMode } = this.props

    return handleSubmit((formData) => {
      this.setState({
        isSubmitting: true,
      })

      if (this.state.videoContentMode === 0 && formData.video_id) {
        formData.video_id = 0 // clear
      }

      submitForm(formData, isEditMode, publish)
    })
  }

  handlePreviewOpen = () => {
    this.setState({
      isPreviewOpen: true,
    })
  }

  handlePreviewClose = () => {
    this.setState({
      isPreviewOpen: false,
    })
  }

  handleKeyEvent = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      if (e.target?.tagName !== 'TEXTAREA') {
        (document.activeElement as any)?.blur()
        e.preventDefault()
      }
      e.stopPropagation()
    }
  }
}
