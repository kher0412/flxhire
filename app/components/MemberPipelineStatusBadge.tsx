import React from 'react'
import moment from 'moment'
import { StatusBadge } from 'components'
import { getStatusColor } from 'services/freelancer'
import { IFreelancer } from 'types'
import { capitalize } from 'lodash'

type PartialFreelancer = Pick<IFreelancer, ('status' | 'applied_at' | 'created_at' | 'hidden')>

const MemberPipelineStatusBadge = ({ freelancer }: { freelancer: PartialFreelancer }) => {
  if (!freelancer) return null

  const { status } = freelancer
  let statusText = capitalize(status)
  let color = getStatusColor(status)

  if (freelancer.applied_at && status === 'applied') statusText += ` ${moment(freelancer.applied_at).fromNow()}`
  if (status === 'pending' && freelancer.created_at) statusText += ` (Signed up ${moment(freelancer.created_at).fromNow()})`
  if (freelancer.hidden) statusText += ' (HIDDEN)'

  return <StatusBadge color={color} text={statusText} />
}

export default MemberPipelineStatusBadge
