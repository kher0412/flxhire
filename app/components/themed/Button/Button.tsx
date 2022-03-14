import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './Button.module.css'

export interface IButtonProps extends Omit<MUIButtonProps, 'color'> {
  component?: React.Component<any, any>
  color?: 'primary' | 'secondary' | 'default' | 'delete'
  disabled?: boolean
  muiComponent?: any
  responsive?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  to?: string
  as?: string

  /** @deprecated */
  variant?: 'text' | 'outlined' | 'contained'
}

function ButtonChildren(props) {
  const { children, responsive } = props

  if (typeof children === 'function') {
    return (
      // TODO: children is never inferred to be a function, even under this type-guard.
      // An update will probably solve this; until then, a type-assertion will do.
      <MediaQuery maxWidth={700}>
        {matches => (children as any)({ isSmallScreen: matches })}
      </MediaQuery>
    )
  }

  if (responsive) {
    if (React.Children.count(children) > 1) {
      return (
        <React.Fragment>
          <MediaQuery maxWidth={700}>
            <span className={styles.responsiveIconWrapper}>
              {React.Children.toArray(children)[0]}
            </span>
          </MediaQuery>

          <MediaQuery minWidth={701}>
            {children}
          </MediaQuery>
        </React.Fragment>
      )
    }
  }

  return children
}

const Button = React.forwardRef((props: IButtonProps, ref) => {
  const { className, disabled, color, component, muiComponent, iconOnly, children, responsive, variant, ...restProps } = props
  const ButtonComponent = (component || MUIButton) as any

  // "component" prop replaces the main component used
  // "muiComponent" prop is passed as "component" to the main component used. Needed to create Link Buttons

  const variantClassName = disabled ? styles.disabled : styles[color]

  return (
    <ButtonComponent
      color={color === 'secondary' ? 'primary' : color}
      variant={color === 'primary' ? 'contained' : 'text'}
      className={classList(styles.button, variantClassName, iconOnly && styles.iconOnly, className)}
      disabled={disabled}
      component={muiComponent}
      ref={ref}
      {...restProps}
    >
      <ButtonChildren responsive={responsive}>
        {children}
      </ButtonChildren>
    </ButtonComponent>
  )
})

export default Button
