import React from 'react'
import { Chip, Accordion, AccordionSummary, ExpansionPanelDetails, Avatar } from '@material-ui/core'
import { ArrowDropDown, CheckCircle } from '@material-ui/icons'
import styles from './MobileCompactStep.module.css'

export interface IMobileCompactStepProps {
  title: React.ReactNode
  defaultOpen?: boolean
  count?: number
  highlightCount?: number
  open: boolean
  stepIndex: number
  completed?: boolean
  disabled?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export interface IMobileCompactStepState {
}

const scrollPivotOffset = -46
const scrollAssistDuration = 400

export default class MobileCompactStep extends React.Component<IMobileCompactStepProps, IMobileCompactStepState> {
  private static componentInstances: Set<MobileCompactStep> = new Set()

  private scrollPivot: HTMLDivElement

  private autoScrollAnimFrameHandle: number

  public componentDidUpdate(prevProps: IMobileCompactStepProps) {
    const { open } = this.props

    if (open !== prevProps.open) {
      if (open) {
        // just opened
        // scroll to header (summary)
        const scrollPivotBounds = this.scrollPivot.getBoundingClientRect()

        if (scrollPivotBounds.top !== 0) {
          if (this.scrollPivot.animate) {
            this.scrollPivot.animate(
              [
                { transform: `translateY(${-scrollPivotBounds.top + scrollPivotOffset}px)` },
                { transform: `translateY(${scrollPivotOffset}px)` },
              ],
              {
                // these settings essentially control the scroll-assist animation
                duration: scrollAssistDuration,
                easing: 'ease',
              },
            )
          }
        }

        this.progressAutoScrollToElement(this.scrollPivot, performance.now())
      }
    }
  }

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.autoScrollAnimFrameHandle)
  }

  public render() {
    const { title, count, highlightCount, children, open } = this.props

    return (
      <Accordion expanded={open} className={styles.panel} onChange={this.handleOpenToggle}>
        <AccordionSummary className={styles.summary}>
          <div style={{ transform: `translateY(${scrollPivotOffset}px)` }} ref={inst => this.scrollPivot = inst} />

          <div className={styles.header}>
            {this.renderIcon()} {title} {this.renderTabBadge(count)} {this.renderTabHighlightBadge(highlightCount)}

            <ArrowDropDown
              className={styles.chevron}
              style={{ transform: open ? 'rotate(180deg)' : '' }}
            />
          </div>
        </AccordionSummary>

        <ExpansionPanelDetails className={styles.details}>
          {children}
        </ExpansionPanelDetails>
      </Accordion>
    )
  }

  private renderIcon() {
    const { completed, stepIndex } = this.props

    if (completed) {
      return (
        <CheckCircle className={styles.icon} color="primary" />
      )
    }

    return (
      <Avatar className={styles.icon} style={{ background: '#93A6BA', width: 24, height: 24, fontSize: '12px' }}>
        {stepIndex || 0}
      </Avatar>
    )
  }

  private renderTabBadge(count: number) {
    if (!count) return ''

    return (
      <Chip
        label={count}
        className={styles.chip}
        style={{ background: '#B1C5DA' }}
      />
    )
  }

  private renderTabHighlightBadge(count: number) {
    if (!count) return ''

    return (
      <Chip
        label={count}
        className={styles.chip}
        style={{ background: '#F50057' }}
      />
    )
  }

  private handleOpenToggle = () => {
    const { open, disabled } = this.props

    if (disabled) return

    if (open) {
      if (this.props.onClose) {
        this.props.onClose()
      }
    } else {
      if (this.props.onOpen) {
        this.props.onOpen()
      }
    }
  }

  private progressAutoScrollToElement(target: HTMLElement, referenceTime: number) {
    const deltaTime = performance.now() - referenceTime

    if (deltaTime < scrollAssistDuration) {
      this.autoScrollAnimFrameHandle = window.requestAnimationFrame(() => {
        target.scrollIntoView()
        this.progressAutoScrollToElement(target, referenceTime)
      })
    }
  }
}
