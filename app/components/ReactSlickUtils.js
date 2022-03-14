import React from 'react'
import ArrowLeft from '@material-ui/icons/NavigateBefore'
import ArrowRight from '@material-ui/icons/NavigateNext'

// The point of this stuff is to avoid this bug:
// https://github.com/akiran/react-slick/issues/1195
// and also being able to have custom css on the arrows

export const ArrowContainer = ({ children, className, onClick }) => (
  React.Children.map(children, child => (
    React.cloneElement(child, {
      className, onClick,
    })
  ))
)

export const PrevArrowFactory = style => (props = {}) => (
  <ArrowContainer {...props}>
    <ArrowLeft style={style} />
  </ArrowContainer>
)

export const NextArrowFactory = style => (props = {}) => (
  <ArrowContainer {...props}>
    <ArrowRight style={style} />
  </ArrowContainer>
)
