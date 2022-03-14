import { memo } from 'react'
import { Tooltip } from '@material-ui/core'
import { Button } from 'components/themed'
import { Description } from '@material-ui/icons'

const ViewResumeButton = memo(({ url }: { url: string }) => (
  <Tooltip title="View Resume/CV">
    <Button
      data-cy="view-resume"
      iconOnly
      onClick={() => window.open(url, '_blank')}
    >
      <Description />
    </Button>
  </Tooltip>
))

export default ViewResumeButton
