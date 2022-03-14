import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { payReferralAction } from './PayReferralAction'

class PayReferralButton extends Component {
    handleClick = () => {
      const { payReferral, record } = this.props
      payReferral(record.id, record)
    }

    render() {
      return <Button color="primary" onClick={this.handleClick}>Pay if due</Button>
    }
}

PayReferralButton.propTypes = {
  payReferral: PropTypes.func,
  record: PropTypes.object,
}

export default connect(null, {
  payReferral: payReferralAction,
})(PayReferralButton)
