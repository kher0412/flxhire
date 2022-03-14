import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Cell.module.css'

class Cell extends PureComponent {
  static propTypes = {
    widthPercentage: PropTypes.number,
  }

  static defaultProps = {
    widthPercentage: 1 / 7,
  }

  render() {
    return (
      <div className={styles.cell} style={{ width: this.getWidth()}}>
        {this.props.children}
      </div>
    )
  }

  getWidth() {
    return `calc(100% * ${this.props.widthPercentage})`
  }
}

export default Cell
