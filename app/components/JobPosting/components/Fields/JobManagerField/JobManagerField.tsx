import React from 'react'
import { MenuItem } from '@material-ui/core'
import { FocusFadeGroup } from 'components'
import { SelectField } from 'components/themed'
import { FormValueInput, FormValueMeta, IClient } from 'types'
import { useCurrentUser } from 'hooks'
import styles from './JobManagerField.module.css'

interface IJobManagerField {
  input: FormValueInput<number>
  meta: FormValueMeta
  editable?: boolean
  editableManagers: Pick<IClient, 'id' | 'name'>[]
}

const JobManagerField = (props: IJobManagerField) => {
  const { input, meta, editable, editableManagers = [] } = props
  const [user] = useCurrentUser()
  const allowed = user?.is_firm_admin

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
            label="Owner"
            helperText={allowed ? 'Note: this setting will not be displayed on your job posting.' : 'Only company admins can change this setting.'}
            disabled={!allowed}
          >
            {editableManagers.map(manager => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name}
              </MenuItem>
            ))}
          </SelectField>
        </FocusFadeGroup>
      </div>
    </div>
  )
}

export default JobManagerField
