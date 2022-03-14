import React from 'react'
import Link from 'components/Link'
import Button from '@material-ui/core/Button'
import styles from './PageHeaderPrimaryButton.module.css'

export default class PageHeaderPrimaryButton extends React.PureComponent {
  render() {
    const { to, onClick, children, 'data-cy': dataCy, ...restProps } = this.props

    if (to) {
      return (
        <Link href={to} style={{ textDecoration: 'none', width: '100%', display: 'block' }} {...restProps}>
          {this.renderButton()}
        </Link>
      )
    }

    return this.renderButton()
  }

  renderButton() {
    const { onClick, children, 'data-cy': dataCy, ...restProps } = this.props

    return (
      <Button
        variant="outlined"
        fullWidth
        data-cy={dataCy}
        className={styles.button}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </Button>
    )
  }
}
