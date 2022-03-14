import React from 'react'
import PropTypes from 'prop-types'
import styles from './FocusFadeGroup.module.css'

// This is used to fade out other FocusFadeGroup component instances other than the current instance if the current instance is focused.
const focusFadeGroupInstances = new Set()

export default class FocusFadeGroup extends React.PureComponent {
  static propTypes = {
    focused: PropTypes.bool,
  }

  state = {
    isBlurred: false,
  }

  componentDidMount() {
    this.forceUpdate()
    focusFadeGroupInstances.add(this)

    if (this.props.focused) {
      for (const instance of focusFadeGroupInstances) {
        if (instance !== this) {
          instance.setState({ isBlurred: true })
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused && !this.props.focused) {
      for (const instance of focusFadeGroupInstances) {
        if (instance !== this) {
          instance.setState({ isBlurred: true })
        }
      }
    } else if (!nextProps.focused && this.props.focused) {
      for (const instance of focusFadeGroupInstances) {
        if (instance !== this) {
          instance.setState({ isBlurred: false })
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.state.isBlurred) {
      for (const instance of focusFadeGroupInstances) {
        if (instance !== this) {
          instance.setState({ isBlurred: false })
        }
      }
    }

    focusFadeGroupInstances.delete(this)
  }

  render() {
    const { focused, children, style = {}, ...restProps } = this.props
    const { isBlurred } = this.state

    let computedStyle = isBlurred ? { opacity: 0.4, ...style } : style

    return (
      <div style={computedStyle} className={styles.container} {...restProps}>
        {children}
      </div>
    )
  }
}
