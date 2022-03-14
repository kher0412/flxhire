import React, { PureComponent } from 'react'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withTheme } from '@material-ui/core/styles'
import { fromTheme } from '../../../../../../services'
import styles from './DayCell.module.css'

class DayCell extends PureComponent {
  render() {
    return (
      <div
        role="option"
        aria-selected={this.props.isRangeStart || this.props.isInRange || this.props.isRangeEnd}
        className={styles['day-cell']}
        onClick={this.setSelectedDateToCurrent}
        style={this.getStyle()}
        data-cy={this.props['data-cy']}
        data-cy-in-month={this.props.isLessImportant ? 'false' : 'true' }
      >
        {React.cloneElement(this.props.children, { style: { color: this.getColor() } })}
      </div>
    )
  }

  setSelectedDateToCurrent = () => this.props.setSelectedDate(this.props.item)

  getStyle() {
    return {
      borderRadius: this.getBorderRadius(),
      borderColor: this.getBorderColor(),
      background: this.getBackground(),
    }
  }

  getBorderRadius() {
    if (this.props.isRangeStart) return '999px 0 0 999px'
    if (this.props.isRangeEnd) return '0 999px 999px 0'
    if (this.props.isInRange) return 0
    return '999px'
  }

  getBorderColor() {
    return this.props.isCurrent ? fromTheme(this.props.theme, 'current', '#9e9e9e') : 'transparent'
  }

  getBackground() {
    const { theme } = this.props
    if (this.props.isSelected) return fromTheme(theme, 'selected', theme.palette.primary.main)
    if (this.props.isInRange) return fromTheme(theme, 'inRange', theme.palette.primary.light)
    return '#fff'
  }

  getColor() {
    const { theme } = this.props
    const color = theme.palette.getContrastText(this.getBackground())
    if (this.props.isSelected || !this.props.isLessImportant) {
      return color
    }
    return fromTheme(theme, 'lessImportant', fade(color, 0.54))
  }
}

export default withTheme(DayCell)
