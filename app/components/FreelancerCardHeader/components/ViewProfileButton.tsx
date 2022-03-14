import { memo } from 'react'
import { Tooltip } from '@material-ui/core'
import { Link } from 'components'
import { Button } from 'components/themed'
import { Visibility } from '@material-ui/icons'

const ViewProfileButton = memo(({ slug, query }: { slug: string, query?: string }) => (
  <Tooltip title="View profile">
    <Button
      data-cy="view-profile"
      iconOnly
      muiComponent={Link}
      href="/[...slugs]"
      as={`/${slug + (query || '')}`}
    >
      <Visibility />
    </Button>
  </Tooltip>
))

export default ViewProfileButton
