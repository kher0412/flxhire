import React from 'react'
import { FreelancerCardInfoItem } from 'components'
import { CalendarToday } from '@material-ui/icons'
import { IContractForClient, IFreelancer } from 'types'
import { formatAsDate } from 'services/formatting'
import moment from 'moment'

interface IFreelancerAvailableOnProps {
  contract?: Pick<IContractForClient, 'status'>
  freelancer?: {
    profile: Pick<IFreelancer['profile'], 'available_at'>
  }
}

export default class FreelancerAvailableOn extends React.PureComponent<IFreelancerAvailableOnProps> {
  render() {
    const { contract, freelancer } = this.props
    const available_at = freelancer?.profile?.available_at
    if ((!contract || contract.status === 'expired') && available_at && moment().isBefore(moment(available_at).startOf('day'))) {
      return (
        <FreelancerCardInfoItem
          icon={<CalendarToday />}
          primary={formatAsDate(available_at)}
          secondary="Available on"
        />
      )
    }
    return null
  }
}
