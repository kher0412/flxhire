import React from 'react'
import { Card, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { RelayPagination, Button } from 'components/themed'
import { usePaginationFragment, graphql } from 'react-relay'
import { FirmSelector_Query$key } from '__generated__/FirmSelector_Query.graphql'
import { HireFirmsPaginationQuery } from '__generated__/HireFirmsPaginationQuery.graphql'
import { useCurrentUser } from 'hooks'
import { PagePlaceholder } from 'components'
import { canAccessHireAdminTools } from 'services/user'

interface IFirmSelectorProps {
  data: FirmSelector_Query$key
  onSelectFirm: (slug: string) => void
}

const FirmSelector = ({ data: dataProp, onSelectFirm }: IFirmSelectorProps) => {
  const { data, ...pagination } = usePaginationFragment<HireFirmsPaginationQuery, FirmSelector_Query$key>(graphql`
    fragment FirmSelector_Query on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
      )
      @refetchable(queryName: "HireFirmsPaginationQuery")
      {
        firms(first: $count, after: $cursor) @connection(key: "FirmSelector_firms") {
          totalCount
          edges {
            node {
              id
              slug
              name
              jobs(filters: { status: opened }) {
                totalCount
              }
            }
          }
        }
      }
  `, dataProp)
  const firms = data?.firms?.edges?.map(e => e.node) || []
  const [user] = useCurrentUser()

  if (!canAccessHireAdminTools(user)) return null

  return (
    <Grid container spacing={2}>
      {user?.firm?.slug && (
        <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
          <Button color="primary" onClick={() => onSelectFirm(user?.firm?.slug)}>
            Select {user?.firm?.name || 'my company'}
          </Button>
        </Grid>
      )}
      {firms.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <List>
              {firms.map(firm => (
                <ListItem key={firm.id} button onClick={() => onSelectFirm(firm.slug)}>
                  <ListItemText
                    primary={firm.name || firm.slug}
                    secondary={`${firm.jobs?.totalCount ?? '?'} open jobs`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      )}
      {firms.length === 0 && (
        <Grid item xs={12}>
          <PagePlaceholder
            raised
            title="No companies available"
            subtitle="When you are selected as hiring manager by a company, it will show up here"
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <RelayPagination
          totalCount={data?.firms?.totalCount}
          currentCount={firms.length}
          {...pagination}
        />
      </Grid>
    </Grid>
  )
}

export default FirmSelector
