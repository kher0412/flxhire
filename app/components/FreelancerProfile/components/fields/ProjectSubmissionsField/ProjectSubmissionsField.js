import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, CardContent, CardHeader } from '@material-ui/core'
import { ExternalLink, ConfirmButton } from 'components'
import { isMember } from 'services/user'
import { Delete, InsertPhoto, Visibility, VisibilityOff } from '@material-ui/icons'
import styles from './ProjectSubmissionsField.module.css'
import AddSampleWork from './components/AddSampleWork'
import TabPlaceholder from '../../TabPlaceholder'

export default class ProjectSubmissionsField extends React.PureComponent {
  render() {
    const { editable, input, user } = this.props
    const projectSubmissions = input.value || []
    // Sometimes "null" project submissions are present in the array
    const sortedSubmissions = (input.value || []).filter(x => Boolean(x)).sort(this.compareProjectSubmissions)
    const isProfileCreationMode = user && isMember(user) && user.status === 'pending'

    return (
      <div className={styles.container}>
        <Grid container spacing={2}>
          {sortedSubmissions.map((projectSubmission, i) => (
            <Grid key={projectSubmission.id} item xs={12} md={6}>
              <Card className={styles.card} data-cy={`sample-work-${i}`}>
                <CardHeader
                  title={(
                    <div className={styles.title} data-cy="title">
                      {projectSubmission.title}
                    </div>
                  )}
                  action={editable && (
                    <React.Fragment>
                      <ConfirmButton
                        icon
                        tooltip={projectSubmission.public ? 'Sample work is public - click to make it private' : 'Sample work is private - click to make it public'}
                        dialogTitle="Toggle visibility"
                        dialogMessage={projectSubmission.public ? 'This will hide your sample work from your profile. Continue?' : 'This will make your sample work show up on your profile to the public. Continue?'}
                        onClick={() => this.handleSetVisibility(projectSubmission.id, !projectSubmission.public)}
                        data-cy="toggle-visibility"
                      >
                        {projectSubmission.public ? <Visibility /> : <VisibilityOff />}
                      </ConfirmButton>

                      <ConfirmButton
                        icon
                        tooltip="Delete sample work submission"
                        dialogTitle="Delete sample work submission"
                        onClick={() => this.handleDelete(projectSubmission.id)}
                        data-cy="delete"
                      >
                        <Delete />
                      </ConfirmButton>
                    </React.Fragment>
                  )}
                />

                <CardActionArea className={styles['card-action-area']} onClick={() => this.handleItemClick(projectSubmission)}>
                  <CardMedia
                    className={styles.screenshot}
                    image={projectSubmission.screenshot_url}
                    alt={`${projectSubmission.title} screenshot`}
                  >
                    {!projectSubmission.screenshot_url && (
                      <div className={styles.placeholder}>
                        <InsertPhoto className={styles['placeholder-icon']} />
                      </div>
                    )}
                  </CardMedia>

                  <CardContent className={styles['card-content']}>
                    <div className={styles.description} data-cy="description">
                      {this.renderDescription(projectSubmission)}
                    </div>

                    <div className={styles.link}>
                      <ExternalLink href={projectSubmission.url} showExternalIcon data-cy="url" />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {projectSubmissions.length === 0 && (
          <TabPlaceholder
            title="No work samples posted yet"
          />
        )}

        {editable && (
          <AddSampleWork
            isProfileCreationMode={isProfileCreationMode}
            onProjectSubmissionSubmit={this.handleAdd}
          />
        )}
      </div>
    )
  }

  compareProjectSubmissions = (a, b) => {
    return a.title.localeCompare(b.title)
  }

  renderDescription(projectSubmission) {
    // Note: description can be null
    if (!projectSubmission?.description) return null
    if (projectSubmission.description.length > 190) {
      return `${projectSubmission.description.substring(0, 189)}...`
    }

    return projectSubmission.description
  }

  handleItemClick = (projectSubmission) => {
    // We could use window.open instead, but there are 2 issues. First, it may result in different behavior across browsers (in some cases, chrome does
    // not open the new content in a tab, but in a floating window instead). Second, there are security implications. Using a link to open the window is simple
    // and consistent and secure.
    let anchor = window.document.createElement('a')
    anchor.style.position = 'fixed'
    anchor.style.left = '-200px'
    anchor.href = projectSubmission.url
    anchor.rel = 'noreferrer noopener'
    anchor.target = '_blank'
    window.document.body.appendChild(anchor)
    anchor.click()
    window.document.body.removeChild(anchor)
  }

  handleSetVisibility = (id, isPublic) => {
    const { input, onSetProjectSubmissionVisibility } = this.props
    const projectSubmissions = (input.value || [])
    const projectSubmission = projectSubmissions.find(_projectSubmission => _projectSubmission.id === id)
    const projectSubmissionIndex = projectSubmissions.findIndex(_projectSubmission => _projectSubmission.id === id)

    const newProjectSubmissions = projectSubmissions.slice()

    newProjectSubmissions.splice(projectSubmissionIndex, 1, {
      ...projectSubmission,
      status: isPublic ? 'public' : 'private',
      public: isPublic,
    })

    input.onChange(newProjectSubmissions)
    onSetProjectSubmissionVisibility(id, isPublic)
  }

  handleDelete = (id) => {
    const { input, onDeleteProjectSubmission } = this.props
    input.onChange((input.value || []).filter(x => x?.id !== id))
    onDeleteProjectSubmission(id)
  }

  handleAdd = (projectSubmission) => {
    if (!projectSubmission) { return }
    const { input, onProjectSubmissionSubmit } = this.props
    input.onChange((input.value || []).concat(projectSubmission))
    onProjectSubmissionSubmit(projectSubmission)
  }
}
