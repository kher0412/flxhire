import React from 'react'
import { MenuItem } from '@material-ui/core'
import { FocusFadeGroup } from 'components'
import { SelectField } from 'components/themed'
import { FormValueInput, FormValueMeta } from 'types'
import styles from './JobNumberOfHiresField.module.css'

interface IJobNumberOfHiresField {
  input: FormValueInput<number>
  meta: FormValueMeta
  editable?: boolean
}

export default class JobNumberOfHiresField extends React.PureComponent<IJobNumberOfHiresField> {
  render() {
    const { input, meta, editable } = this.props

    if (!editable) {
      return null
    }

    return (
      <div className={styles.container}>
        <div className={styles['select-wrapper']}>
          <FocusFadeGroup focused={false}>
            <SelectField
              input={input}
              meta={meta}
              label="How many hires are needed?"
              helperText="Note: this setting will not be displayed on your job posting."
            >
              <MenuItem value={1} data-cy="number-of-hires-1">
                1 Hire
              </MenuItem>

              <MenuItem value={2} data-cy="number-of-hires-2-4">
                2 - 4 Hires
              </MenuItem>

              <MenuItem value={5} data-cy="number-of-hires-5-10">
                5 - 10 Hires
              </MenuItem>

              <MenuItem value={10} data-cy="number-of-hires-10">
                10+ Hires
              </MenuItem>

              <MenuItem value={0} data-cy="number-of-hires-continous">
                I have an ongoing need to fill this role
              </MenuItem>
            </SelectField>
          </FocusFadeGroup>
        </div>
      </div>
    )
  }
}
