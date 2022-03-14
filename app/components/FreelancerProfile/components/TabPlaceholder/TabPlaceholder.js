import React from 'react'
import { AnimBox } from 'components'
import { Info } from '@material-ui/icons'
import styles from './TabPlaceholder.module.css'

export default class TabPlaceholder extends React.PureComponent {
  static defaultProps = {
    title: 'Nothing here',
    icon: <Info />,
  }

  render() {
    const { icon, title, text } = this.props

    return (
      <AnimBox delay={300}>
        <div className={styles.container}>
          <div className={styles.icon}>
            {icon}
          </div>

          <div className={styles.title}>
            {title}
          </div>

          <div className={styles.text}>
            {text}
          </div>
        </div>
      </AnimBox>
    )
  }
}
