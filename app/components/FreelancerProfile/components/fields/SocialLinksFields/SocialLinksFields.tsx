import { PureComponent, Fragment } from 'react'
import MediaQuery from 'components/MediaQuery'
import { Tooltip, IconButton, DialogTitle, DialogContent, DialogActions, Button, Grid, InputAdornment } from '@material-ui/core'
import { FaDribbble, FaLinkedin, FaGithub } from 'react-icons/fa'
import { ResponsiveDialog, TextField, MoreButtonCard } from 'components'
import { FormValue } from 'types'
import { Create, Description, Web } from '@material-ui/icons'
import styles from './SocialLinksFields.module.css'

interface ISocialLinksFieldsProps {
  editable?: boolean
  url_resume: FormValue<string>
  url_blog: FormValue<string>
  url_github: FormValue<string>
  url_linkedin: FormValue<string>
  url_dribbble: FormValue<string>
}

interface ISocialLinksFieldsState {
  isEditMode: boolean
}

export default class SocialLinksFields extends PureComponent<ISocialLinksFieldsProps, ISocialLinksFieldsState> {
  state = {
    isEditMode: false,
  }

  render() {
    // eslint-disable-next-line camelcase
    const { editable, url_blog, url_github, url_linkedin, url_dribbble, url_resume } = this.props
    const hasAnyLink = url_blog.input.value || url_github.input.value || url_linkedin.input.value || url_dribbble.input.value

    const numSocialLinks = [
      url_resume.input.value,
      url_blog.input.value,
      url_github.input.value,
      url_linkedin.input.value,
      url_dribbble.input.value,
    ].filter(url => !!url).length

    const hasErrors = [
      url_resume.meta.error,
      url_blog.meta.error,
      url_github.meta.error,
      url_linkedin.meta.error,
      url_dribbble.meta.error,
    ].some(error => !!error)

    const breakPoint = (numSocialLinks <= 3 ? 321 : 397) + (editable ? 48 : 0)

    if (editable || hasAnyLink) {
      return (
        <Fragment>
          {numSocialLinks <= 1 && (
            // We can always fit 1 button.
            <Fragment>
              {this.renderAllSocialLinks()}
            </Fragment>
          )}

          {numSocialLinks > 1 && (
            <Fragment>
              <MediaQuery minWidth={breakPoint} component="span">
                {this.renderAllSocialLinks()}
              </MediaQuery>

              <MediaQuery maxWidth={breakPoint - 1} component="span">
                <MoreButtonCard>
                  {this.renderAllSocialLinks()}
                </MoreButtonCard>
              </MediaQuery>
            </Fragment>
          )}

          {this.renderEditDialog()}

          {editable && (
            <div className={styles.edit}>
              {!hasAnyLink && (
                <span className={styles.description}>
                  <MediaQuery maxWidth={600}>
                    {mobile => mobile ? 'Links' : 'Your Links'}
                  </MediaQuery>
                </span>
              )}

              <div className={styles.button}>
                <IconButton onClick={this.handleDialogOpen}>
                  <Create />
                </IconButton>
              </div>

              {hasErrors && <div className={styles.error} />}
            </div>
          )}
        </Fragment>
      )
    }

    return null
  }

  renderAllSocialLinks() {
    // eslint-disable-next-line camelcase
    const { url_blog, url_github, url_linkedin, url_dribbble, url_resume } = this.props

    return (
      <Fragment>
        {this.renderSocialLink(url_resume.input.value, 'Resume', !!url_resume.meta.error)}
        {this.renderSocialLink(url_blog.input.value, 'Website or Blog', !!url_blog.meta.error)}
        {this.renderSocialLink(url_github.input.value, 'Github', !!url_github.meta.error)}
        {this.renderSocialLink(url_linkedin.input.value, 'LinkedIn', !!url_linkedin.meta.error)}
        {this.renderSocialLink(url_dribbble.input.value, 'Dribbble', !!url_dribbble.meta.error)}
      </Fragment>
    )
  }

  renderSocialLink(url, type, error) {
    if (url) {
      if (type === 'Website or Blog') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} data-cy="website-blog">
            <Tooltip title={`${type}`}>
              <IconButton className={styles.iconButton}>
                <Web className={error ? styles['has-error'] : undefined} />
              </IconButton>
            </Tooltip>
          </a>
        )
      }

      if (type === 'Github') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} data-cy="github">
            <Tooltip title={`${type} profile`}>
              <IconButton className={styles.iconButton}>
                <FaGithub className={error ? styles['has-error'] : undefined} />
              </IconButton>
            </Tooltip>
          </a>
        )
      }

      if (type === 'LinkedIn') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} data-cy="linkedin">
            <Tooltip title={`${type} profile`}>
              <IconButton className={styles.iconButton}>
                <FaLinkedin className={error ? styles['has-error'] : undefined} />
              </IconButton>
            </Tooltip>
          </a>
        )
      }

      if (type === 'Dribbble') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} data-cy="dribbble">
            <Tooltip title={`${type} profile`}>
              <IconButton className={styles.iconButton}>
                <FaDribbble className={error ? styles['has-error'] : undefined} />
              </IconButton>
            </Tooltip>
          </a>
        )
      }

      if (type === 'Resume') {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} data-cy="resume">
            <Tooltip title="Résumé/CV">
              <IconButton className={styles.iconButton}>
                <Description className={error ? styles['has-error'] : undefined} />
              </IconButton>
            </Tooltip>
          </a>
        )
      }
    }
    return null
  }

  renderEditDialog() {
    // eslint-disable-next-line camelcase
    const { url_blog, url_github, url_linkedin, url_dribbble } = this.props
    const { isEditMode } = this.state

    if (!isEditMode) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <DialogTitle>
          Social Links
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 99999 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                name="url_linkedin"
                label="LinkedIn"
                input={url_linkedin.input}
                meta={url_linkedin.meta}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLinkedin />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                name="url_github"
                label="Github"
                input={url_github.input}
                meta={url_github.meta}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaGithub />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                name="url_blog"
                label="Your Personal Website or Blog"
                input={url_blog.input}
                meta={url_blog.meta}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Web />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                name="url_dribbble"
                label="Dribbble"
                input={url_dribbble.input}
                meta={url_dribbble.meta}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDribbble />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isEditMode: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditMode: false,
    })
  }
}
