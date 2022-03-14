import React from 'react'
import MediaQuery from 'components/MediaQuery'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styles from './TermsOfServiceField.module.css'

const TermsOfServiceField = ({ input: { value, onChange }, meta: { touched, error } }) => {
  return (
    <div className={styles.container}>
      <FormControlLabel
        label={(
          <React.Fragment>
            <MediaQuery minWidth={500}>
              <span className={styles.label}>I agree to Flexhire's <a href="/terms" target="_blank">Terms and Conditions</a></span>
            </MediaQuery>

            <MediaQuery maxWidth={499}>
              <span className={styles.label}>I agree to the <a href="/terms" target="_blank">Terms &amp; Conditions</a></span>
            </MediaQuery>
          </React.Fragment>
        )}
        control={<Checkbox color="primary" checked={value ? true : false} onChange={e => onChange(e)} data-cy="agree-to-terms" />}
      />

      {touched && error && <div className={styles.error} data-cy="terms-of-service-error">{error}</div>}
    </div>
  )
}

export default TermsOfServiceField
