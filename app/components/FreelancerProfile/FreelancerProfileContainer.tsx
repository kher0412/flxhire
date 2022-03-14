import React from 'react'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IFreelancer, IFreelancerType } from 'types'
import FreelancerProfile from './FreelancerProfile'
import FreelancerProfileFormWrapper from './components/FreelancerProfileFormWrapper'

interface IFreelancerProfileContainerProps {
  freelancer?: IFreelancer
  editable: boolean
  liteMode: boolean
  defaultTab?: number
  errors?: any
}

interface IFreelancerProfileContainerState {
  freelancerTypes: IFreelancerType[]
}

class FreelancerProfileContainer extends React.PureComponent<IFreelancerProfileContainerProps, IFreelancerProfileContainerState> {
  state = {
    freelancerTypes: [],
  }

  async componentDidMount() {
    if (this.props.editable) {
      try {
        this.setState({
          freelancerTypes: await getAPIClient().getFreelancerTypes(),
        })
      } catch (error) {
        trackError(error)
      }
    }
  }

  render() {
    const { editable, children, freelancer, ...otherProps } = this.props
    const { freelancerTypes: freelancerTypeState } = this.state

    let freelancerTypes = []
    if (freelancer?.profile?.freelancer_type_data) freelancerTypes = [freelancer?.profile?.freelancer_type_data]
    if (freelancerTypeState.length > 0) freelancerTypes = freelancerTypeState

    if (editable) {
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={this.handleKeyEvent} onKeyPress={this.handleKeyEvent}>
          <FreelancerProfile
            editable
            freelancerTypes={freelancerTypes}
            {...otherProps}
          >
            {children}
          </FreelancerProfile>
        </div>
      )
    }

    if (freelancer) {
      return (
        <FreelancerProfileFormWrapper freelancer={freelancer}>
          <FreelancerProfile
            editable={false}
            freelancerTypes={freelancerTypes}
            backgroundCheckCompleted={freelancer.background_check_completed}
            currentVideo={freelancer?.video}
            timezone={freelancer?.timezone}
            rate={freelancer?.profile?.rate}
            {...otherProps}
          >
            {children}
          </FreelancerProfile>
        </FreelancerProfileFormWrapper>
      )
    }

    return null
  }

  handleKeyEvent = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      if (e.target?.tagName !== 'TEXTAREA') {
        const d = document as any
        d.activeElement?.blur()
        e.preventDefault()
      }

      e.stopPropagation()
    }
  }
}

export default FreelancerProfileContainer
