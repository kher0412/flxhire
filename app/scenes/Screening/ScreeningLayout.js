import { Component, Fragment } from 'react'
import { PageHeader, PageHeaderTitle, LoadingPage, PageContainer } from 'components'
import { getLocationPathname } from 'services/router'
import { Stepper } from './components/Stepper'
import styles from './Screening.module.css'

const steps = [
  {
    name: 'Introduce Yourself',
    shortName: 'Introduction',
    href: '/application/introduction',
  },
  {
    name: 'Professional References',
    shortName: 'References',
    href: '/application/references',
  },
  {
    name: 'Expertise Verification',
    shortName: 'Expertise',
    href: '/application/interview',
  },
]

class Profile extends Component {
  shouldComponentUpdate(nextProps) {
    // This is needed to avoid Rerenders every time new props come
    const userStatusChanged = nextProps.user.status !== this.props.user.status
    const locationChanged = nextProps.router.asPath !== this.props.router.asPath
    const shouldUpdate = userStatusChanged || locationChanged
    if (shouldUpdate) return true
    console.warn('Update blocked by ScreeningLayout.js')
    return false
  }

  stepNum() {
    const path = getLocationPathname(this.props.router)
    const lastStep = steps.length - 1
    const currentStep = steps.findIndex(x => x.href === path)
    if (currentStep < 0) return lastStep
    return currentStep
  }

  renderContent() {
    const { user, children } = this.props

    // Do this to avoid bug where while loading, the stepper might allow skipping steps by mistake
    if (user.loading) {
      return (
        <LoadingPage />
      )
    }

    return (
      <PageContainer>
        {children}
      </PageContainer>
    )
  }

  render() {
    const { user } = this.props
    const stepNum = this.stepNum()

    return (
      <Fragment>
        <PageHeader>
          <PageHeaderTitle>
            Profile Verification
          </PageHeaderTitle>

          {!user.loading && (
            <div className={styles.header}>
              <Stepper stepNum={stepNum} steps={steps} />
            </div>
          )}
        </PageHeader>

        {this.renderContent()}
      </Fragment>
    )
  }
}

export default Profile
