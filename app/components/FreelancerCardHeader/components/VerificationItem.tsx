import { memo } from 'react'
import { IFreelancer } from 'types'
import { Tooltip } from '@material-ui/core'
import { VerifiedUser } from '@material-ui/icons'

interface IVerificationItemProps {
  status: IFreelancer['status']
}

const VerificationItem = memo(({ status }: IVerificationItemProps) => {
  if (status === 'accepted') {
    return (
      <Tooltip title="Verified">
        <VerifiedUser style={{ margin: '-7px 0 -8px 6px', fill: '#2ECB80', verticalAlign: 'middle' }} />
      </Tooltip>
    )
  }

  return null
})

export default VerificationItem
