import { forwardRef } from 'react'
import { IconButton, Button, Tooltip, Badge } from '@material-ui/core'
import { useMediaQuery } from 'hooks/useMediaQuery'

interface IResponsiveButtonProps {
  invert?: boolean
  mobileLabel?: string
  label?: string
  icon?: any
  tooltip?: boolean
  iconSide?: 'right' | 'left'
  badgeProps?: any
  badgeContent?: any
  breakpoint?: number
  children?: any
}

const ResponsiveButton = forwardRef((props: IResponsiveButtonProps, ref) => {
  const {
    children,
    invert,
    mobileLabel,
    label,
    icon,
    tooltip,
    iconSide = 'right',
    badgeProps = {},
    badgeContent,
    breakpoint = 600,
    ...otherProps
  } = props

  let isMobile = useMediaQuery(`(max-width:${breakpoint}px)`)
  let element = null

  if (invert) isMobile = !isMobile

  if (isMobile || !label) {
    if (mobileLabel) {
      element = (
        <Button size="small" ref={ref} {...otherProps as any}>
          {iconSide === 'right' && mobileLabel}
          {iconSide === 'left' && icon}
          {icon && <span style={{ marginLeft: 6 }} /> }
          {iconSide === 'right' && icon}
          {iconSide === 'left' && mobileLabel}
          {children}
        </Button>
      )
    } else {
      element = (
        <IconButton size="small" ref={ref} {...otherProps as any}>
          {icon}
          {children}
        </IconButton>
      )
    }
  } else if (tooltip) {
    element = (
      <Tooltip title={tooltip}>
        <Button ref={ref} {...otherProps as any}>
          {label}
          {label && icon && <span style={{ marginLeft: 12 }} /> }
          {icon}
          {children}
        </Button>
      </Tooltip>
    )
  } else {
    element = (
      <Button ref={ref} {...otherProps as any}>
        {iconSide === 'right' && label}
        {iconSide === 'left' && icon}
        {label && icon && <span style={{ marginLeft: 12 }} /> }
        {iconSide === 'right' && icon}
        {iconSide === 'left' && label}
        {children}
      </Button>
    )
  }

  if (badgeContent) {
    return <Badge badgeContent={badgeContent} {...badgeProps}>{element}</Badge>
  }

  return element
})

export default ResponsiveButton as any
