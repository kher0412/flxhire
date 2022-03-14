import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CodeTest, MediaQuery } from 'components'
import { Button } from 'components/themed'
import { FormValueInput, IProject } from 'types'
import { Create, Delete, LibraryAdd, NoteAdd } from '@material-ui/icons'
import EditCodeTestDialog from './components/EditCodeTestDialog'
import ExistingCodeTestsBrowser from './components/ExistingCodeTestsBrowser'
import { ProjectType } from '../../JobScreeningFormContainer'

interface ICodeTestsProps {
  input: FormValueInput<ProjectType>
  enabled: boolean
}

interface ICodeTestsState {
  browserDialogOpen: boolean
  editDialogOpen: boolean
}

class CodeTests extends React.Component<ICodeTestsProps, ICodeTestsState> {
  state = {
    browserDialogOpen: false,
    editDialogOpen: false,
  }

  render() {
    // eslint-disable-next-line camelcase
    const { input, enabled } = this.props
    const { browserDialogOpen, editDialogOpen } = this.state

    const codeTestExists = input.value?.title || input.value?.description

    if (!enabled && !codeTestExists) {
      return null
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Code Tests
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">
            Adding a code test can help you evaluate your candidates' ability.
            Create a new one or use one of our pre-made tests.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CodeTest
            title={input.value?.title}
            description={input.value?.description}
            footNote="Once ready, submit the link to the project, any additional instructions, and optionally a screenshot through Flexhire."
          />

          <div>
            {codeTestExists && (
              <React.Fragment>
                <Button
                  data-cy="edit-code-test"
                  onClick={this.handleOpenEditDialog}
                  style={{ marginRight: 12, marginBottom: 12 }}
                >
                  <Create style={{ marginRight: 12 }} /> Edit
                </Button>

                <Button
                  data-cy="remove-code-test"
                  onClick={this.handleRemove}
                  style={{ marginRight: 12, marginBottom: 12 }}
                >
                  <Delete style={{ marginRight: 12 }} /> Remove
                </Button>
              </React.Fragment>
            )}

            <MediaQuery maxWidth={500}>
              {isMobile => (
                <React.Fragment>
                  <Button
                    onClick={this.handleOpenBrowserDialog}
                    data-cy="browse-code-tests"
                    color="secondary"
                    fullWidth={isMobile}
                    style={{ marginRight: 12, marginBottom: 12 }}
                  >
                    <LibraryAdd style={{ marginRight: 12 }} /> Browse Existing code tests
                  </Button>

                  {!codeTestExists && (
                    <Button
                      color="secondary"
                      fullWidth={isMobile}
                      data-cy="add-new-code-test"
                      onClick={this.handleOpenEditDialog}
                      style={{ marginBottom: 12 }}
                    >
                      <NoteAdd style={{ marginRight: 12 }} /> Create new code test
                    </Button>
                  )}
                </React.Fragment>
              )}
            </MediaQuery>

            <EditCodeTestDialog
              open={editDialogOpen}
              onClose={this.handleCloseEditDialog}
              codeTest={input.value}
              onChange={this.handleChange}
            />

            <ExistingCodeTestsBrowser
              open={browserDialogOpen}
              onClose={this.handleCloseBrowserDialog}
              onAdd={this.handleSelectExisting}
            />
          </div>
        </Grid>
      </Grid>
    )
  }

  handleSelectExisting = (codeTest: IProject) => {
    const { input } = this.props

    this.handleCloseBrowserDialog()

    if (input?.onChange) {
      input.onChange(codeTest)
    }
  }

  handleChange = (codeTest: Partial<IProject>) => {
    const { input } = this.props

    this.handleCloseEditDialog()

    if (input?.onChange) {
      input.onChange(codeTest)
    }
  }

  handleRemove = () => {
    const { input } = this.props

    if (input?.onChange) {
      input.onChange(false)
    }
  }

  handleOpenEditDialog = () => this.setState({ editDialogOpen: true })

  handleCloseEditDialog = () => this.setState({ editDialogOpen: false })

  handleOpenBrowserDialog = () => this.setState({ browserDialogOpen: true })

  handleCloseBrowserDialog = () => this.setState({ browserDialogOpen: false })
}

export default CodeTests
