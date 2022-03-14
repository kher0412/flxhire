import React from 'react'
import { PageWrapper } from 'components'
import { Button } from 'components/themed'
import { Divider } from '@material-ui/core'
import { ReferenceForm } from '../ReferenceForm'
import styles from '../../../Screening.module.css'

class References extends React.Component {
  constructor(props) {
    super(props)
    this.showError = this.showError.bind(this)
  }

  showError(referencesError) {
    if (referencesError) {
      return (
        <div className={styles['error-container']}>
          <div className={styles.error}>Please provide at least two references</div>
        </div>
      )
    }
    return ''
  }

  render() {
    const { next, referencesCount, referencesError } = this.props

    return (
      <PageWrapper raised>
        <ReferenceForm />
        <Divider />

        <div>
          <div className={styles['button-container']}>
            <Button
              style={{ marginRight: '12px', marginBottom: '12px' }}
              color="primary"
              onClick={() => next(referencesCount)}
              data-cy="continue"
            >
              Next
            </Button>
          </div>

          {this.showError(referencesError)}
        </div>
      </PageWrapper>
    )
  }
}

export default References
