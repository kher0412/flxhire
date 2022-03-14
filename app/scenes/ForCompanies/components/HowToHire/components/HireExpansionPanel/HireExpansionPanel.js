import React from 'react'
import { Accordion, AccordionSummary, ExpansionPanelDetails } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import styles from './HireExpansionPanel.module.css'

export default class HireExpansionPanel extends React.PureComponent {
  render() {
    const { open, title, children, onOpen } = this.props

    return (
      <Accordion className={styles.panel} expanded={open}>
        <AccordionSummary className={{ [styles.panelSummary]: true, [styles.open]: open }} onClick={onOpen}>
          <Add className={{ [styles.icon]: true, [styles.open]: open }} />
          {title}
        </AccordionSummary>

        <ExpansionPanelDetails className={styles.panelDetails}>
          {children}
        </ExpansionPanelDetails>
      </Accordion>
    )
  }
}
