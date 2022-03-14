import React, { useState } from 'react'
import { useFragment, graphql } from 'react-relay'
import { Card, CardContent, CardHeader, MenuItem, Grid, List, ListItem, ListItemText, Divider, Collapse } from '@material-ui/core'
import { BonusCard_Bonus$key } from '__generated__/BonusCard_Bonus.graphql'
import { Tags, Tag, GridExpandable, MoreButtonMenu, LoadingIcon } from 'components'
import { Button } from 'components/themed'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { ArrowDropDown } from '@material-ui/icons'
import { STATUS } from '../bonusStatus'

export interface IBonusCardProps {
  bonusFragmentRef: BonusCard_Bonus$key
  onApprove: () => void
  onDelete: () => void
  loading: boolean
}

function BonusCard(props: IBonusCardProps) {
  const { bonusFragmentRef, onApprove, onDelete, loading } = props

  const bonus = useFragment(graphql`
    fragment BonusCard_Bonus on Bonus {
      stage
      totalToPayClient {
        currency {
          code
        }
        value
      }
      startDate
      endDate
      approvedAt
      currency {
        code
      }
      payrollItem {
        invoiceItem {
          invoice {
            invoiceNum
          }
        }
      }
      contract {
        freelancer {
          name
        }
        client {
          name
        }
      }
    }
  `, bonusFragmentRef)

  const invoiceNum = bonus?.payrollItem?.invoiceItem?.invoice?.invoiceNum
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  return (
    <Card variant="outlined" data-cy="bonus">
      <CardHeader
        title={(
          <Tags>
            <Tag>
              {bonus?.contract?.freelancer?.name}
            </Tag>

            <Tag>
              {formatAsCurrency(bonus.totalToPayClient.value, { currency: bonus.currency })}
            </Tag>
          </Tags>
        )}
        subheader={(
          <Tags>
            <Tag>
              {STATUS[bonus.stage] || bonus.stage}
            </Tag>
          </Tags>
        )}
        action={(
          <MoreButtonMenu disabled={bonus.stage !== 'pending' || loading} icon={(loading) ? <LoadingIcon /> : null}>
            <MenuItem onClick={onApprove}>
              Approve
            </MenuItem>

            <MenuItem onClick={onDelete}>
              Reject &amp; Delete
            </MenuItem>
          </MoreButtonMenu>
        )}
      />

      <Collapse in={detailsOpen}>
        <Divider />
      </Collapse>

      <CardContent>
        <Grid container spacing={2}>
          <GridExpandable item xs={12} expand={detailsOpen}>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText
                  primary={(
                    <React.Fragment>
                      {formatAsDate(bonus.startDate)} - {formatAsDate(bonus.endDate)}
                    </React.Fragment>
                  )}
                  secondary="Dates"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={formatAsDate(bonus.approvedAt)}
                  secondary="Approval"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={bonus.contract?.client?.name}
                  secondary="Manager"
                />
              </ListItem>

              <ListItem disableGutters>
                <ListItemText
                  primary={invoiceNum ? `#${invoiceNum}` : '-'}
                  secondary="Invoice #"
                />
              </ListItem>
            </List>
          </GridExpandable>

          <Grid item xs={12}>
            <Button fullWidth onClick={() => setDetailsOpen(!detailsOpen)}>
              {!detailsOpen && (
                <React.Fragment>
                  <ArrowDropDown style={{ opacity: 0 }} /> Expand Details <ArrowDropDown style={{ marginLeft: 12 }} />
                </React.Fragment>
              )}

              {detailsOpen && (
                <React.Fragment>
                  <ArrowDropDown style={{ opacity: 0 }} /> Hide Details <ArrowDropDown style={{ marginLeft: 12, transform: 'rotate(180deg)' }} />
                </React.Fragment>
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(BonusCard)
