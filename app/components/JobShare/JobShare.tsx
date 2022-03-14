import React from 'react'
import { ShareWidget } from 'components'
import { IJob } from 'types'
import { isGuest } from 'services/user'
import { ContainerProps } from './JobShareContainer'

interface IJobShareProps extends ContainerProps {
  job: Pick<IJob, 'slug' | 'firm_slug'>
}

interface IJobState {
  link: string
  referral: boolean
}

class JobShare extends React.PureComponent<IJobShareProps, IJobState> {
  state = {
    link: null,
    referral: false,
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    const { job } = this.props
    if (job?.firm_slug !== prevProps.job?.firm_slug || job?.slug !== prevProps.job?.slug) {
      this.refresh()
    }
  }

  async refresh() {
    const {
      share, job, currentUser,
    } = this.props
    if (job?.slug) {
      const publicJobLink = this.getPublicLink()
      if (isGuest(currentUser)) {
        this.setState({ link: publicJobLink, referral: false })
      } else {
        const referral = await share(job)
        this.setState({
          link: referral ? `${process.env.ROOT_URL}/job/${referral.token}` : publicJobLink,
          referral: Boolean(referral),
        })
      }
    }
  }

  render() {
    const { job } = this.props
    const { link, referral } = this.state

    if (!job || !link) return null

    return (
      <ShareWidget
        referral={referral}
        url={link}
      />
    )
  }

  getPublicLink() {
    return `${process.env.ROOT_URL}/${this.props.job.firm_slug || 'job'}/${this.props.job.slug}`
  }
}

export default JobShare
