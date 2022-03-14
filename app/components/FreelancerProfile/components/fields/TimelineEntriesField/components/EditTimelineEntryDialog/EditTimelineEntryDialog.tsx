import React from 'react'
import { Field } from 'redux-form'
import { DialogTitle, DialogContent, Grid, DialogActions, Button } from '@material-ui/core'
import { ResponsiveDialog, ExternalLink } from 'components'
import { AutoCompleteChipInput, AutoCompleteTextField, TextField, TextArea } from 'components/themed'
import { Institute, ISkill } from 'types'
import { ContainerProps } from './EditTimelineEntryDialogContainer'

interface IEditTimelineEntryDialogProps extends ContainerProps {
  editableInstitutes: Institute[]
  editableSkills: ISkill[]
}

export default class EditTimelineEntryDialog extends React.PureComponent<IEditTimelineEntryDialogProps> {
  render() {
    const { open, fieldName, type, editableInstitutes, editableSkills, onCancel, onSave, isNew } = this.props

    if (!fieldName && !type) return null

    const getInstituteSuggestions = name => editableInstitutes ? editableInstitutes.map(institute => institute.name).filter(x => x.toLowerCase().includes(name)) : []
    const currentYear = new Date().getFullYear()

    return (
      <ResponsiveDialog open={open} onClose={onSave} maxWidth="md">
        <DialogTitle>
          Edit Entry
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 99999 }} />

          <div style={{ paddingBottom: 18 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {type === 'work' && (
                  <Field
                    name={`${fieldName}.place`}
                    component={TextField}
                    fullWidth
                    label="Company"
                  />
                )}

                {type === 'education' && (
                  <Field
                    name={`${fieldName}.place`}
                    component={AutoCompleteTextField}
                    label="School name"
                    getSuggestions={getInstituteSuggestions}
                    helperText="If your university is not in the suggested list just type it anyway and it will save"
                  />
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  fullWidth
                  label={type === 'work' ? 'Position' : 'Field of study'}
                  name={`${fieldName}.title`}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  fullWidth
                  name={`${fieldName}.date_start`}
                  label="Start year"
                  type="number"
                  inputProps={{ min: 1900, max: currentYear }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  component={TextField}
                  fullWidth
                  label={type === 'work' ? 'End year' : 'Graduation year'}
                  type="number"
                  name={`${fieldName}.date_end`}
                  inputProps={{ min: 1900, max: currentYear }}
                  helperText="Leave empty if ongoing"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextArea}
                  fullWidth
                  label={type === 'work' ? 'Key Achievements' : 'Highlights'}
                  placeholder={'- achieved first thing\\n- achieved another thing\\n- this field supports markdown\\n- use dashes to make a bulleted list like this in markdown'.replace(/\\n/g, '\n')}
                  name={`${fieldName}.description`}
                  maxLength={1500}
                  helperText={(
                    <React.Fragment>
                      1500 characters max -
                      you can use <ExternalLink href="https://en.wikipedia.org/wiki/Markdown#Example" label="markdown" showExternalIcon mouseDown /> to
                      format contents.
                    </React.Fragment>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  name={`${fieldName}.skills`}
                  label="Relevant Skills (optional)"
                  component={AutoCompleteChipInput}
                  suggestions={editableSkills}
                  suggestionsFormat={{ text: 'name', value: 'id' }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCancel} data-cy="cancel">
            Cancel
          </Button>

          <Button onClick={onSave} data-cy="save">
            {isNew ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }
}
