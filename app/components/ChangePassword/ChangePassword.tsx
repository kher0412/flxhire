import React from 'react'
import { withRouter } from 'next/router'
import { CardContent, Card, Divider, Grid } from '@material-ui/core'
import { VpnKey } from '@material-ui/icons'
import { Field } from 'redux-form'
import { extractQueryParams } from 'services/router'
import { ServerError, LoadingIcon, PageHeader, PageContainer, Picture } from 'components'
import { Button, TextField } from 'components/themed'
import { WithRouterProps } from 'next/dist/client/with-router'
import styles from './ChangePassword.module.css'
import { ContainerProps } from './ChangePasswordContainer'

interface IChangePasswordProps extends ContainerProps {
  extraFormData?: any
  title?: string
  saveButtonText?: string
}

class ChangePassword extends React.PureComponent<IChangePasswordProps & WithRouterProps> {
  onSubmit = (formData) => {
    const { router, submitForm, extraFormData = {} } = this.props
    const query = extractQueryParams(router.asPath)
    const token = query.token
    submitForm({ token, ...formData, ...extraFormData })
  }

  render() {
    const { handleSubmit, submitting, serverError, title, saveButtonText } = this.props
    return (
      <div>
        <PageHeader compact />

        <PageContainer>
          <div className={styles['login-container']}>
            <div className={styles.login}>
              <Card raised>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <CardContent className={styles.box}>
                    <Picture
                      className={styles.logo}
                      src={require('assets/images/logos/flexhire-logo-blue.png?webp')}
                      srcFallback={require('assets/images/logos/flexhire-logo-blue.png')}
                      alt="Flexhire"
                    />

                    <div className={styles.copy}>
                      {title || 'Change your Flexhire Password'}
                    </div>
                  </CardContent>

                  <Divider />

                  <CardContent className={styles.box}>
                    <div className={styles['anim-items']}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field label="Password" name="password" component={TextField} fullWidth type="password" />
                        </Grid>

                        <Grid item xs={12}>
                          <Field label="Password Confirmation" name="password_confirmation" component={TextField} fullWidth type="password" />
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>

                  <CardContent className={styles.box}>
                    <div className={styles['login-button']}>
                      <ServerError error={serverError} data-cy="change-password-server-error" />

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        data-cy="submit"
                        disabled={submitting}
                      >
                        {submitting ? <LoadingIcon /> : <VpnKey />} {saveButtonText || 'Update Password'}
                      </Button>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </div>
        </PageContainer>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
