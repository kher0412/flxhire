import { Grid } from '@material-ui/core'
import { IManageFilterParams } from 'scenes/ClientManage/ManageDucks'
import { useFragment, graphql } from 'react-relay'
import { ManagerFilter_Firm$key } from '__generated__/ManagerFilter_Firm.graphql'
import ManagerSelect from '../../ManagerSelect'
import { SetManageFilter } from '../ManageFiltersPanelContainer'

interface IManagerFilterProps {
  firm: ManagerFilter_Firm$key
  value: number
  onChange: (value: number) => void
}

const ManagerFilter = ({ firm: firmProp, value, onChange }: IManagerFilterProps) => {
  const firm = useFragment(graphql`
    fragment ManagerFilter_Firm on Firm {
      ...ManagerSelect_Firm
    }
  `, firmProp)

  return (
    <Grid item xs={12}>
      <ManagerSelect
        firm={firm}
        value={value}
        onChange={val => onChange(val || null)}
      />
    </Grid>
  )
}

export default ManagerFilter
