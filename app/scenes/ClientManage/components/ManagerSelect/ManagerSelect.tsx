import { ComponentProps } from 'react'
import { MenuItem } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { ManagerSelect_Firm$key } from '__generated__/ManagerSelect_Firm.graphql'

interface IManagerSelectProps extends ComponentProps<typeof SelectField> {
  firm: ManagerSelect_Firm$key
  value: number
  onChange: (id: number) => void,
}

// TODO: refactor this so it uses graphql. Keep in mind this is used in both FiltersPanel and TeamHeader
const ManagerSelect = (props: IManagerSelectProps) => {
  const { firm: firmProp, value, onChange, ...otherProps } = props

  const firm = useFragment(graphql`
    fragment ManagerSelect_Firm on Firm {
      users {
        id
        rawId
        name
      }
    }
  `, firmProp)

  const managers = firm?.users || []

  return (
    <SelectField
      fullWidth
      input={{ value, onChange: e => onChange(e.target.value), name: 'filter-by-manager' }}
      label="Reporting Manager"
      name="filter-by-manager"
      data-cy="select-filter-by-manager"
      {...otherProps}
    >
      {[
        <MenuItem value={undefined} data-cy="select-filter-by-manager-option-">Entire Team</MenuItem>,
      ].concat(
        managers.map(manager => (
          <MenuItem
            key={manager.id}
            value={manager.rawId}
            data-cy={`select-filter-by-manager-option-${manager.rawId}`}
          >
            {manager.name}
          </MenuItem>
        )),
      )}
    </SelectField>
  )
}

export default ManagerSelect
