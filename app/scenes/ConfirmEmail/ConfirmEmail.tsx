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
  PagePlaceholder,
  Picture,
  LoadingIcon,
} from 'components'
import { Button, TextField } from 'components/themed'
import { Field } from 'redux-form'
import { extractQueryParams, goToLogin } from 'services/router'
import { isGuest } from 'services/user'
import { Restore, Save, Send } from '@material-ui/icons'
import { ContainerProps } from './ConfirmEmailContainer'
import styles from './ConfirmEmail.module.css'

interface IConfirmEmailState {
  isAutoSubmitting: boolean
  enteringCode: boolean
  editingEmail: boolean
}

class ConfirmEmail extends React.PureComponent<ContainerProps, IConfirmEmailState> {
  state = {
    isAutoSubmitting: false,
    enteringCode: false,
    editingEmail: false,
  }

  componentDidUpdate() {
    const { user, change, email, submitFailed, serverError } = this.props
    const { isAutoSubmitting } = this.state
    const userEmail = user.unconfirmed_email || user.email
    if (userEmail !== email && !this.state.editingEmail) change('email', userEmail)
    if ((submitFailed || serverError) && isAutoSubmitting) this.setState({ isAutoSubmitting: false })
  }

  componentDidMount() {
    const { router, submitForm, user, change } = this.props
    const query = extractQueryParams(router?.asPath)
    if (query?.token) {
      this.setState({ isAutoSubmitting: true })
      submitForm({ token: query?.token })
    } else if (isGuest(user)) {
      goToLogin(router)
    }
    const userEmail = user.unconfirmed_email || user.email
    if (userEmail) change('email', userEmail)
  }

  render() {
    const { serverError, user, sendConfirmationEmail, isSending, isConfirming, clearError } = this.props
    const { isAutoSubmitting, enteringCode, editingEmail } = this.state
    const email = user?.unconfirmed_email || user?.email

    if (isAutoSubmitting || (!serverError && !user?.id)) return <PageBundlePlaceholder />

    return (
      <div>
        <PageHeader compact />

        <PageContainer>
          <div className={styles['confirmEmail-container']}>
            <Helmet>
              <title>Confirm Email</title>
              <meta name="description" content="Confirm your email address on FlexHire" />
              <meta property="og:title" content="Confirm Email - Flexhire" />
              <meta property="og:description" content="Confirm your email address on FlexHire" />
            </Helmet>

            <div className={styles.confirmEmail}>
              {serverError && (
              <PagePlaceholder
                title="Something went wrong"
                subtitle={serverError}
                action={(
                  <Button color="primary" onClick={clearError}>
                    <Restore /> Try Again
                  </Button>
                )}
              />
              )}
              {!serverError && (
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
                      We emailed you a confirmation link at
                      <div className={styles.email}>{email}</div>
                      You can also {' '}
                      <span onClick={this.enterCode} className={styles.link} data-cy="enter-code" role="button">enter code manually</span>
                      {' '}or{' '}
                      <span onClick={this.editAddress} className={styles.link} data-cy="change-address" role="button">try another address</span>
                    </div>

                    <ServerError error={serverError} data-cy="confirm-email-server-error" />
                  </CardContent>

                  {enteringCode && (
                  <CardContent className={styles.box}>
                    <div className={styles['anim-items']}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            name="token"
                            label="Confirmation Code"
                            component={TextField}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            type="submit"
                            disabled={isConfirming}
                            data-cy="submit-confirmation-token"
                            color="primary"
                          >
                            {isConfirming && (<LoadingIcon style={{ marginRight: 12 }} />)}
                            {!isConfirming && (<Send style={{ marginRight: 12 }} />)}
                            Confirm
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                  )}

                  {editingEmail && (
                  <CardContent className={styles.box}>
                    <div className={styles['anim-items']}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            name="email"
                            label="Email Address"
                            component={TextField}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            type="submit"
                            color="primary"
                            data-cy="submit-new-address"
                            variant="contained"
                          >
                            <Save style={{ marginRight: 12 }} /> Save
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                  )}

                  <Divider />

                  <CardContent className={styles.footer}>
                    Didn't get the email?{' '}

                    {isSending && 'Sending...'}
                    {!isSending && (
                    <span onClick={sendConfirmationEmail} className={styles.link} role="button">Send again</span>
                    )}
                  </CardContent>
                </form>
              </Card>
              )}
            </div>
          </div>
        </PageContainer>
      </div>
    )
  }

  enterCode = () => {
    this.setState({
      enteringCode: true,
      editingEmail: false,
    })
  }

  editAddress = () => {
    this.setState({
      enteringCode: false,
      editingEmail: true,
    })
  }

  createSubmitHandler = () => {
    const { handleSubmit, submitForm } = this.props

    return handleSubmit((formData) => {
      submitForm(formData)
    })
  }
}

export default ConfirmEmail
