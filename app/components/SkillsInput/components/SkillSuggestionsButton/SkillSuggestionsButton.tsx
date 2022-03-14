import React from 'react'
import { Field } from 'redux-form'
import { DialogContentText, DialogContent, DialogTitle, DialogActions, Button, Grid } from '@material-ui/core'
import { MoreButtonDialog, Suspense } from 'components'
import { TextField } from 'components/themed'
import FreelancerTypeField from '../FreelancerTypeField'
import { ContainerProps } from './SkillSuggestionsButtonContainer'

const SkillSuggestionsButton = ({ handleSubmit }: ContainerProps) => {
  return (
    <Suspense>
      <MoreButtonDialog
        component={props => (
          <div {...props}>
            I can't find a skill
          </div>
        )}
        style={{ color: 'rgb(46, 203, 128)', cursor: 'pointer', fontSize: '14px', marginBottom: 2, padding: 6, marginRight: 6 }}
      >
        {({ closeDialog }) => (
          <form>
            <DialogTitle>
              Add New Skill
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                If you can't find a relevant skill for your job, you can add a custom one.
              </DialogContentText>

              <div style={{ paddingBottom: 12 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Field
                      name="name"
                      label="Name"
                      component={TextField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Field
                      name="freelancer_types"
                      component={FreelancerTypeField}
                      label="Freelancer Types"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={closeDialog}>
                Cancel
              </Button>

              <Button color="primary" onClick={(e) => { handleSubmit(e); closeDialog() }}>
                Submit
              </Button>
            </DialogActions>
          </form>
        )}
      </MoreButtonDialog>
    </Suspense>
  )
}

export default SkillSuggestionsButton
