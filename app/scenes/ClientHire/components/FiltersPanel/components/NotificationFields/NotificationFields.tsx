import { Checkbox, List, ListItem, ListItemSecondaryAction, ListItemText, MenuItem } from "@material-ui/core"
import { Fragment } from "react"
import { HireMembersFilters } from "scenes/ClientHire/Hire"
import styles from '../../FiltersPanel.module.css'

interface INotificationFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (name: keyof HireMembersFilters, value: any) => void
}
const NotificationFields = ({ filterParams = {}, setFilterParam }: INotificationFieldsProps) => {
  return (
    <Fragment>
        <List disablePadding>
          <ListItem className={styles['toggle-list-item']}>
            <ListItemText
              primary="Include Notified"
              secondary="Show candidates already notified about the Job"
              style={{ maxWidth: '80%' }}
            />

            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                edge="end"
                checked={filterParams.showNotified || false}
                onChange={e => setFilterParam('showNotified', e.target.checked)}
                tabIndex={-1}
                data-cy="checkbox-show_notified"
                inputProps={{ 'data-cy': 'checkbox-input-show_notified' } as any}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <List disablePadding>
          <ListItem className={styles['toggle-list-item']}>
            <ListItemText
              primary="Include Not Notified"
              secondary="Show candidates not yet notified about the Job"
              style={{ maxWidth: '80%' }}
            />

            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                edge="end"
                checked={filterParams.showNotNotified || false}
                onChange={e => setFilterParam('showNotNotified', e.target.checked)}
                tabIndex={-1}
                data-cy="checkbox-show_not_notified"
                inputProps={{ 'data-cy': 'checkbox-input-show_not_notified' } as any}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Fragment>
  )
}

export default NotificationFields
