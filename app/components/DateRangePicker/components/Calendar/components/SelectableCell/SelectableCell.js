import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { fromTheme } from '../../../../services'
import styles from './SelectableCell.module.css'

class SelectableCell extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    isCurrent: PropTypes.bool,
    widthPercentage: PropTypes.number,
    horizontalSpacing: PropTypes.bool,
  }

  static defaultProps = {
    widthPercentage: 1 / 7,
    horizontalSpacing: false,
  }

  render() {
    return (
      <div
        role="option"
        aria-selected={this.props.isRangeStart || this.props.isInRange || this.props.isRangeEnd}
        className={styles['selectable-cell']}
        onClick={this.props.onClick}
        style={this.getStyle()}
        data-cy={this.props['data-cy']}
      >
        {React.cloneElement(this.props.children, { style: { color: this.getColor() } })}
      </div>
    )
  }

  getStyle() {
    return {
      borderColor: this.getBorderColor(),
      background: this.getBackground(),
      width: this.getWidth(),
    }
  }

  getWidth() {
    return `calc(100% * ${this.props.widthPercentage} - ${this.props.horizontalSpacing ? 3 : 0}px)`
  }

  getBorderColor() {
    return this.props.isCurrent ? fromTheme(this.props.theme, 'current', '#9e9e9e') : 'transparent'
  }

  getBackground() {
    const { theme } = this.props
    return this.props.isSelected ? fromTheme(theme, 'selected', theme.palette.primary.main) : '#fff'
  }

  getColor() {
    return this.props.isSelected ? this.props.theme.palette.getContrastText(this.getBackground()) : '#000'
  }
}

export default withTheme(SelectableCell)
