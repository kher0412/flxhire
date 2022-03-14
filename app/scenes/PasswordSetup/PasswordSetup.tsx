import React from 'react'
import { Helmet } from 'react-helmet'
import {
  CardContent,
  Divider,
  Card,
  Grid,
} from '@material-ui/core'
import {
  ServerError,
  PageHeader,
  PageContainer,
  PageBundlePlaceholder,
  ErrorPlaceholder,
  Picture,
  LoadingIcon,
} from 'components'
import { Button, TextField } from 'components/themed'
import { Field } from 'redux-form'
import { isGuest } from 'services/user'
import { Send } from '@material-ui/icons'
import { ContainerProps } from './PasswordSetupContainer'
import styles from './PasswordSetup.module.css'

interface IPasswordSetupState {
  isAutoSubmitting: boolean
  enteringCode: boolean
  editingEmail: boolean
}

class PasswordSetup extends React.PureComponent<ContainerProps, IPasswordSetupState> {
  render() {
    const { serverError, user, isSending } = this.props

    if (!serverError && isGuest(user)) return <PageBundlePlaceholder />

    if (serverError) {
      return <ErrorPlaceholder>{serverError}</ErrorPlaceholder>
    }

    return (
      <div>
        <PageHeader compact />

        <PageContainer>
          <div className={styles['passwordSetup-container']}>
            <Helmet>
              <title>Setup Password</title>
              <meta name="description" content="Set up your password on FlexHire" />
              <meta property="og:title" content="Setup Password" />
              <meta property="og:description" content="Set up yout password on FlexHire" />
            </Helmet>

            <div className={styles.passwordSetup}>
              <Card raised>
                <form onSubmit={this.createSubmitHandler()}>
                  <CardContent className={styles.box}>
                    <Picture
                      className={styles.logo}
                      src={require('assets/images/logos/flexhire-logo-blue.png?webp')} // eslint-disable-line global-require
                      srcFallback={require('assets/images/logos/flexhire-logo-blue.png')} // eslint-disable-line global-require
                      alt="Flexhire"
                    />

                    <div className={styles.copy}>
                      Choose a password for your Flexhire account
                      <br />
                      You will then be able to log in using your email address: <strong>{user?.email}</strong>
                    </div>

                    <ServerError error={serverError} data-cy="confirm-email-server-error" />
                  </CardContent>

                  <CardContent className={styles.box}>
                    <div className={styles['anim-items']}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            name="password"
                            label="Password"
                            component={TextField}
                            type="password"
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            name="password_confirmation"
                            label="Confirm Password"
                            component={TextField}
                            type="password"
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            data-cy="submit-confirmation-token"
                            color="primary"
                            disabled={isSending}
                          >
                            {isSending ? <LoadingIcon /> : <Send />}
                            Confirm
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>

                  <Divider />

                  <CardContent className={styles.footer}>
                    Any questions? Contact us at <a href="mailto:info@flexhire.com">info@flexhire.com</a>
                  </CardContent>
                </form>
              </Card>
            </div>
          </div>
        </PageContainer>
      </div>
    )
  }

  createSubmitHandler = () => {
    const { handleSubmit, submitForm } = this.props

    return handleSubmit((formData) => {
      submitForm(formData)
    })
  }
}

export default PasswordSetup
