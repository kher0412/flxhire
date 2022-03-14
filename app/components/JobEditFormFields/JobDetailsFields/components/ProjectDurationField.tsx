import { Grid, Collapse, MenuItem } from '@material-ui/core'
import { Field } from 'redux-form'
import { SelectField } from 'components/themed'
import { FormValue } from 'types'

const ProjectDurationField = ({ position_types: { input: { value: positionTypes } } }: { position_types: FormValue<string[]>}) => {
  const expand = positionTypes.includes('freelancer')

  return (
    <Grid item xs={12} md={6} style={{ display: expand ? 'block' : 'none' }}>
      <Collapse in={expand}>
        <Field
          name="project_length_in_months"
          component={SelectField}
          disabled={!positionTypes.includes('freelancer')}
          fullWidth
          data-cy="select-duration"
          label="Project length"
        >
          <MenuItem value={3} data-cy="select-duration-3">
            3 months
          </MenuItem>
          <MenuItem value={6} data-cy="select-duration-6">
            6 months
          </MenuItem>
          <MenuItem value={12} data-cy="select-duration-12">
            12 months
          </MenuItem>
          <MenuItem value={0} data-cy="select-duration-0">
            Indefinite
          </MenuItem>
        </Field>
      </Collapse>
    </Grid>
  )
}

export default ProjectDurationField
