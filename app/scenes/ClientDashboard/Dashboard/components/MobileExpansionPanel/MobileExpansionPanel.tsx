import React from 'react'
import { Chip, Accordion, AccordionSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import styles from './MobileExpansionPanel.module.css'

export interface IMobileExpansionPanelProps {
  title: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ReactNode
  count?: number
  highlightCount?: number
}

export interface IMobileExpansionPanelState {
  isOpen: boolean
}

const scrollPivotOffset = -46
const scrollAssistDuration = 400

export default class MobileExpansionPanel extends React.Component<IMobileExpansionPanelProps, IMobileExpansionPanelState> {
  private static componentInstances: Set<MobileExpansionPanel> = new Set()

  private scrollPivot: HTMLDivElement

  private autoScrollAnimFrameHandle: number

  constructor(props: IMobileExpansionPanelProps, context: any) {
    super(props, context)

    this.state = {
      isOpen: props.defaultOpen || false,
    }
  }

  public componentDidMount() {
    MobileExpansionPanel.componentInstances.add(this)
  }

  public componentWillUnmount() {
    MobileExpansionPanel.componentInstances.delete(this)
    window.cancelAnimationFrame(this.autoScrollAnimFrameHandle)
  }

  public render() {
    const { icon, title, count, highlightCount, children } = this.props
    const { isOpen } = this.state

    return (
      <Accordion expanded={isOpen} className={styles.panel} onChange={this.handleOpenToggle}>
        <AccordionSummary className={styles.summary}>
          {icon} {title} {this.renderTabBadge(count)} {this.renderTabHighlightBadge(highlightCount)}

          <ArrowDropDown
            className={styles.chevron}
            style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
          />

          <div style={{ transform: `translateY(${scrollPivotOffset}px)` }} ref={inst => this.scrollPivot = inst} />
        </AccordionSummary>

        <ExpansionPanelDetails className={styles.details}>
          {children}
        </ExpansionPanelDetails>
      </Accordion>
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
    const { isOpen } = this.state

    if (!isOpen) {
      // opening now, close all other expansion panels
      for (const componentInstance of Array.from(MobileExpansionPanel.componentInstances)) {
        componentInstance.setState({
          isOpen: false,
        })
      }

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

    this.setState({
      isOpen: !isOpen,
    })
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
