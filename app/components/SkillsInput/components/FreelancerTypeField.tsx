import { Grid } from '@material-ui/core'
import { AutoCompleteChipInput } from 'components/themed'
import { Field } from 'redux-form'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { FreelancerTypeField_Query } from '__generated__/FreelancerTypeField_Query.graphql'

const FreelancerTypeField = () => {
  const data = useLazyLoadQuery<FreelancerTypeField_Query>(graphql`
    query FreelancerTypeField_Query {
      freelancerTypes {
        name
        rawId
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const freelancerTypes = data?.freelancerTypes?.map(u => ({ id: u.rawId, name: u.name })) || []

  return (
    <Grid item xs={12} md={12}>
      <Field
        name="freelancer_types"
        component={AutoCompleteChipInput}
        label="Industries"
        suggestions={freelancerTypes}
        placeholder="Start typing industries..."
        fullWidth
      />
    </Grid>
  )
}

export default FreelancerTypeField
