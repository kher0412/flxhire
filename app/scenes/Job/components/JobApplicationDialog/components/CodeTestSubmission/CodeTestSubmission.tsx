import React from 'react'
import { Field } from 'redux-form'
import { TextField, TextArea } from 'components/themed'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import ScreenshotUpload from './components/ScreenshotUpload'
import styles from './CodeTestSubmission.module.css'

export async function asyncValidate(values: any) {
  const errors: any = {}
  let errorFlag = false
  // Maintain a cache of already validated project URLs for improved performance
  if (!(window as any).validProjectUrlCache) (window as any).validProjectUrlCache = new Set()
  const validProjectUrlCache = (window as any).validProjectUrlCache

  if (values.url) {
    if (!validProjectUrlCache.has(values.url)) {
      let validationReponse = { valid: false, error: 'Failed to validate URL' }
      try {
        validationReponse = await getAPIClient().getProjectSubmissionURLValidity(values.url)
      } catch (error) {
        trackError(error)
      }

      if (!validationReponse.valid) {
        errors.url = `URL does not appear to be reachable (${validationReponse.error})`
        errorFlag = true
      } else {
        validProjectUrlCache.add(values.url)
      }
    }
  }

  if (errorFlag) {
    throw errors
  }
}

export default class CodeTestSubmission extends React.Component<{ asyncValidating?: boolean, formMeta?: any }> {
  render() {
    return (
      <React.Fragment>
        <div className={styles.form}>
          <div style={{ marginBottom: 12 }}>
            <Field
              name="url"
              component={TextField}
              fullWidth
              placeholder="Project repository URL (e.g. Github)"
              helperText={this.getUrlHelperText()}
            />
          </div>

          <div style={{ margin: '12px 0' }}>
            <Field
              name="screenshot_url"
              component={ScreenshotUpload}
            />
          </div>

          <div style={{ paddingTop: 6 }}>
            <Field
              name="description"
              component={TextArea}
              style={{ minHeight: 120 }}
              label="Additional notes"
              placeholder="Additional information about the project... (optional)"
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  getUrlHelperText() {
    const { asyncValidating, formMeta } = this.props

    if (asyncValidating) {
      return 'Checking URL...'
    }

    if (formMeta?.url?.touched && !formMeta?.url?.error) {
      return 'URL looks good!'
    }

    return ''
  }
}
