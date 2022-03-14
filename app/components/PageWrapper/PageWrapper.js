import React from 'react'
import Card from '@material-ui/core/Card'
import { isEmpty } from 'lodash'
import styles from './PageWrapper.module.css'

/**
 * @deprecated Use the Page and Page* components from components instead for old/centralized layouts, and the Page* components from components/Layouts/V3 for sidebar based layouts instead.
 */
class PageWrapper extends React.Component {
  render() {
    const { title, noAnim, style = {}, titleStyle = {} } = this.props

    return (
      <div className={styles.container} style={noAnim ? { animation: 'none', ...style } : style} data-cy={this.props['data-cy'] || 'page-wrapper'}>
        {title && (
          <div className={styles.header} style={titleStyle}>{title}</div>
        )}

        {this.renderContent()}
      </div>
    )
  }

  renderContent = () => {
    if (isEmpty(this.props.children)) return null

    if (this.props.withoutCard) {
      return (
        <div className={styles.form}>
          {this.props.children}
        </div>
      )
    }

    return (
      <Card className={styles.form} style={this.props.cardStyle} raised={this.props.raised}>
        {this.props.children}
      </Card>
    )
  }
}

export default PageWrapper
