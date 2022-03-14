import React from 'react'
import { Grid, List, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { Button } from 'components/themed'
import { Clear, Receipt, AccountCircle, Group } from '@material-ui/icons'
import { Link, LoadingIcon, MoreButtonDialog } from 'components'
import styles from '../../BulkActions.module.css'

export interface IPayrollBulkActionsProps {
  currentUserId: string
  selectedItemIds: string[]
  clearSelection: () => void
  invoiceSelectedItems: (data: { managerId?: string }) => void
  invoicingProgress: boolean
}

function PayrollBulkActions(props: IPayrollBulkActionsProps) {
  const { currentUserId, selectedItemIds, clearSelection, invoiceSelectedItems, invoicingProgress } = props
  const numSelectedItems = selectedItemIds?.length || 0

  return (
    <Grid container>
      <Grid item md={2} />

      <Grid item xs={12} sm={6} md={4}>
        <MoreButtonDialog
          icon={invoicingProgress ? <LoadingIcon /> : <Receipt />}
          label={(
            <React.Fragment>
              Invoice &amp; Pay Selected ({numSelectedItems})
            </React.Fragment>
          )}
          fullWidth
          component={Button}
          disabled={!currentUserId}
          dialogTitle={`Invoice & Pay Selected (${numSelectedItems})`}
          dialogCloseButtonLabel="Cancel"
          data-cy="invoice-pay-selected"
        >
          <List>
            <MenuItem onClick={() => invoiceSelectedItems({ managerId: undefined })} data-cy="invoice-pay-selected-default">
              <ListItemIcon>
                <Group />
              </ListItemIcon>

              <ListItemText
                primary="Send each invoice to its associated manager"
                secondary={(
                  <React.Fragment>
                    <span onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()} role="link">
                      <Link to="/client/manage" as="/client/manage?tab=team&subtab=managers">
                        Configure invoice recipients
                      </Link>
                    </span>

                    {' '}for managers and their teams
                  </React.Fragment>
                )}
              />
            </MenuItem>

            <MenuItem onClick={() => invoiceSelectedItems({ managerId: currentUserId })} data-cy="invoice-pay-selected-to-me">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>

              <ListItemText
                primary="Assign and send invoice to me"
                secondary="1 invoice will be created, assigned and sent to me"
              />
            </MenuItem>
          </List>
        </MoreButtonDialog>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Button onClick={clearSelection} className={styles['close-button']} fullWidth>
          <Clear style={{ marginRight: 12 }} /> Deselect all ({numSelectedItems})
        </Button>
      </Grid>

      <Grid item md={2} />
    </Grid>
  )
}

export default React.memo(PayrollBulkActions)
