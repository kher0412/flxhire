import React from 'react'
import { Grid, ListItem, ListItemIcon, ListItemText, List, MenuItem, ListSubheader } from '@material-ui/core'
import { MoreButtonMenu, FocusFadeGroup } from 'components'
import { FormValue } from 'types'
import { Create, Update } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './ProjectLengthFields.module.css'

interface IProjectLengthFieldsProps {
  position_types: FormValue<string[]>
  project_length_in_months: FormValue<number>
  editable?: boolean
}

const ProjectLengthFields = (props: IProjectLengthFieldsProps) => {
  const { position_types, project_length_in_months, editable } = props

  if (!project_length_in_months.input.value && !editable) {
    return null
  }

  if (!position_types.input.value || !position_types.input.value.includes('freelancer')) {
    return null
  }

  const months = project_length_in_months.input.value

  return (
    <Grid item xs={12} md={3}>
      <FocusFadeGroup focused={false}>
        <List disablePadding>
          <ListItem className={styles.item}>
            <ListItemIcon className={styles.icon}>
              <Update />
            </ListItemIcon>

            <ListItemText
              className={styles['list-item-text']}
              primary={(months === 1) ? '1 month' : `${months || '-'} months`}
              secondary={(
                <React.Fragment>
                  Project length
                  <FormErrorHint message={project_length_in_months.meta.touched && project_length_in_months.meta.error} />
                </React.Fragment>
                )}
            />

            {editable && (
            <ListItemIcon className={styles['edit-button']}>
              <MoreButtonMenu
                tooltip="Edit project length"
                placement="right"
                icon={<Create />}
                data-cy="job-project_length_in_months-select"
              >
                <ListSubheader>
                  Edit project length
                </ListSubheader>

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
              </MoreButtonMenu>
            </ListItemIcon>
            )}
          </ListItem>
        </List>
      </FocusFadeGroup>
    </Grid>
  )
}

export default ProjectLengthFields
