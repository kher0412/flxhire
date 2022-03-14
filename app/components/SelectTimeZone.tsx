import { memo, ComponentProps } from 'react'
import { SelectField } from 'components/themed'
import MenuItem from '@material-ui/core/MenuItem'
import { timezones, compactTimezones } from 'services/timeKeeping'
import { ListItemText } from '@material-ui/core'

interface ISelectTimezoneProps extends ComponentProps<typeof SelectField> {
  compact?: boolean
  timezonesSecondaryText?: { [index: string]: string}
}

const SelectTimeZone = memo(({ compact, label = 'Timezone', timezonesSecondaryText, ...props }: ISelectTimezoneProps) => (
  <SelectField label={label} {...props}>
    {(compact ? compactTimezones : timezones).map(t => (
      <MenuItem key={t.title} value={compact ? t.value : t.title} data-cy={t.name}>
        {timezonesSecondaryText ? (
          <ListItemText primary={t.title} secondary={timezonesSecondaryText?.[compact ? t.value : t.title]} />
        ) : t.title}
      </MenuItem>
    ))}
  </SelectField>
))

export default SelectTimeZone
