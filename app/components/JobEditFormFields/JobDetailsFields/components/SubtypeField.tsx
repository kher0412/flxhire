import { Grid, Collapse } from '@material-ui/core'
import { Field } from 'redux-form'
import { FormValueInput } from 'types'
import SubtypesGroupsField from './SubtypesGroupsField'

interface ISubtypeFieldProps {
  input: FormValueInput<number>
  freelancerSubtypes: { id: number, name: string, freelancer_type_id: number }[]
}

const SubtypeField = ({ input: { value: freelancerTypeId }, freelancerSubtypes = [] }: ISubtypeFieldProps) => {
  const filteredSubtypes = freelancerSubtypes.filter(subtype => subtype.freelancer_type_id === freelancerTypeId)
  const expand = (freelancerTypeId > 0 && filteredSubtypes.length > 0)
  const disabled = freelancerTypeId <= 0

  return (
    <Grid item xs={12} md={12} style={{ display: expand ? 'block' : 'none' }}>
      <Collapse in={expand}>
        <Field
          key={disabled ? 1 : 2}
          name="freelancer_subtypes"
          component={SubtypesGroupsField}
          disabled={disabled}
          label="Specializations"
          suggestions={filteredSubtypes}
          placeholder="Start typing specializations..."
        />
      </Collapse>
    </Grid>
  )
}

export default SubtypeField
