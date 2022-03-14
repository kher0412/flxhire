import React from 'react'
import { Field } from 'redux-form'
import { DialogContentText, DialogContent, DialogTitle, DialogActions, Button, Grid } from '@material-ui/core'
import { MoreButtonDialog, TextField, TextArea } from 'components'

export default class SkillSuggestionsButton extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <MoreButtonDialog
        component={props => (
          <div {...props}>
            Can't find a skill?
          </div>
        )}
        style={{ color: '#0057FF', cursor: 'pointer', fontSize: '14px', marginBottom: 6 }}
      >
        {({ closeDialog }) => (
          <form onSubmit={handleSubmit(formData => this.performSubmit(formData, closeDialog))}>
            <DialogTitle>
              Add New Skill
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                If you can't find a relevant skill for your job, you can add it here.
                Please note that it may take up to 24 hours for your submission to appear.
              </DialogContentText>

              <div style={{ paddingBottom: 12 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Field
                      name="name"
                      label="Name"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Field
                      name="description"
                      component={TextArea}
                      label="Description"
                      placeholder="I'm adding this skill because..."
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={closeDialog}>
                Cancel
              </Button>

              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      </MoreButtonDialog>
    )
  }

  performSubmit = (formData, closeDialog) => {
    const { submitForm } = this.props

    submitForm(formData)
    closeDialog()
  }
}
