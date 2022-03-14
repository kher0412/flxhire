import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import ScreeningLayout from './ScreeningLayout'

const mapStateToProps = state => ({
  user: state.auth.currentUser,
})

const ScreeningLayoutContainer = withRouter(connect(mapStateToProps)(ScreeningLayout))

export default ScreeningLayoutContainer

export const withScreeningLayout = Component => (...props) => <ScreeningLayoutContainer><Component {...props} /></ScreeningLayoutContainer>
