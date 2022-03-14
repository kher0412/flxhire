import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { isCypress } from 'services/browserAgent'
import dynamic from 'services/dynamic'
import { classList } from 'services/styles'
import styles from './ScriptedTour.module.css'

const Tour: React.ComponentType<any> = dynamic(
  () => import(/* webpackChunkName: "Reactour" */'reactour'),
  {
    ssr: false,
    loading: () => <div />,
  },
)

export interface IScriptedTourProps {
  open: boolean
  onClose: () => void
  steps: Array<{ selector?: string, content: string, mobileDisabled?: boolean }>
}

export interface IScriptedTourState {
  currentStep: number
}

export default class ScriptedTour extends React.PureComponent<IScriptedTourProps, IScriptedTourState> {
  constructor(props: IScriptedTourProps) {
    super(props)

    this.state = {
      currentStep: 0,
    }
  }

  render() {
    const { open, onClose, steps } = this.props
    const breakpoint = 700

    if (isCypress()) {
      // Easier to just not render this in e2e tests for now.
      // Note: need to render a placeholder to avoid SSR bugs.
      return (<div />)
    }

    return (
      <MediaQuery maxWidth={breakpoint}>
        {isMobile => (
          <Tour
            steps={isMobile ? steps.filter(step => !step.mobileDisabled) : steps}
            isOpen={open}
            onRequestClose={onClose}
            getCurrentStep={this.handleStepChange}
            accentColor="rgb(46, 203, 128)"
            maskSpace={36}
            maskClassName={styles.mask}
            className={classList(styles.helper, isMobile ? styles.helperMobile : undefined)}
            rounded={12}
          />
        )}
      </MediaQuery>
    )
  }

  handleStepChange = (step: number) => {
    this.setState({
      currentStep: step,
    })
  }
}
