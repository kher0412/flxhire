import React from 'react'
import { Accordion as MUIExpansionPanel, AccordionSummary, ExpansionPanelDetails } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import styles from './Accordion.module.css'

const instances = new Set()

export default class Accordion extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  componentDidMount() {
    instances.add(this)
  }

  componentWillUnmount() {
    instances.delete(this)
  }

  render() {
    const { title, children } = this.props
    const { isOpen } = this.state

    return (
      <MUIExpansionPanel className={styles.panel} expanded={isOpen}>
        <AccordionSummary className={{ [styles.panelSummary]: true, [styles.open]: isOpen }} onClick={this.handleClick}>
          <Add className={{ [styles.icon]: true, [styles.open]: isOpen }} />

          <span style={{ marginTop: 6 }}>
            {title}
          </span>
        </AccordionSummary>

        <ExpansionPanelDetails className={styles.panelDetails}>
          {children}
        </ExpansionPanelDetails>
      </MUIExpansionPanel>
    )
  }

  close() {
    this.setState({
      isOpen: false,
    })
  }

  handleClick = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      })
    } else {
      for (const otherInstance of instances) {
        if (otherInstance === this) continue

        otherInstance.setState({
          isOpen: false,
        })
      }

      this.setState({
        isOpen: true,
      })
    }
  }
}
