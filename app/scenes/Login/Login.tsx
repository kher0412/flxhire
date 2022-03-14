import React from 'react'
import { Helmet } from 'react-helmet'
import { extractQueryParams, getSignupRoute } from 'services/router'
import {
  FormControlLabel,
  CardContent,
  Divider,
  Card,
  Checkbox,
} from '@material-ui/core'
import { LoadingIcon, ServerError, PageHeader, PageContainer, Link, Picture, AnimBox } from 'components'
import { TextField, Button } from 'components/themed'
import { Field } from 'redux-form'
import { VpnKey } from '@material-ui/icons'
import styles from './Login.module.css'
import { ContainerProps } from './LoginContainer'

class Login extends React.Component<ContainerProps, { isSubmitting: boolean }> {
  state = {
    isSubmitting: false,
  }

  componentDidMount() {
    const { router, loginByToken } = this.props
    const query = extractQueryParams(router?.asPath)
    if (query?.token && query?.email) {
      loginByToken(query.token, query.email)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isSubmitting } = this.state

    if ((nextProps.submitFailed || nextProps.serverError) && isSubmitting) {
      this.setState({
        isSubmitting: false,
      })
    }
  }

  renderRememberToggle = ({ label, input: { value, onChange } }) => (
    <FormControlLabel
      label={<span className={styles['remember-label']}>{label}</span>}
      className={styles.remember}
      control={<Checkbox color="primary" checked={!!value} onChange={e => onChange(e)} />}
    />
  )

  render() {
    const { serverError, router } = this.props
    const { isSubmitting } = this.state

    return (
      <div>
        <PageHeader compact />

        <PageContainer>
          <div className={styles['login-container']}>
            <Helmet>
              <title>Login</title>
              <meta name="description" content="Login to your account on FlexHire" />
              <meta property="og:title" content="Login - Flexhire" />
              <meta property="og:description" content="Login to your account on FlexHire" />
            </Helmet>

            <div className={styles.login}>
              <AnimBox heavySlideUp>
                <Card raised>
                  <form onSubmit={this.createSubmitHandler()}>
                    <CardContent className={styles.box}>
                      <Picture
                        className={styles.logo}
                        src={require('assets/images/logos/flexhire-logo-blue.png?webp')}
                        srcFallback={require('assets/images/logos/flexhire-logo-blue.png')}
                        alt="Flexhire"
                      />

                      <div className={styles.copy}>
                        Login to your account on FlexHire
                      </div>
                    </CardContent>

                    <Divider />

                    <CardContent className={styles.box}>
                      <div className={[styles.fields, styles['anim-items']].join(' ')}>
                        <Field name="email" label="Email" component={TextField} fullWidth />
                        <Field name="password" type="password" label="Password" component={TextField} fullWidth />
                        <Link href="/forgot_password" className={styles['forgot-password']} data-cy="forgot-password">Forgot password?</Link>
                      </div>
                    </CardContent>

                    <CardContent className={styles.box}>
                      <div className={styles['login-button']}>
                        <ServerError error={serverError} data-cy="login-server-error" />

                        <Button
                          color="primary"
                          type="submit"
                          data-cy="login"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <LoadingIcon style={{ marginRight: 12 }} />}
                          {!isSubmitting && <VpnKey style={{ marginRight: 12 }} />}

                          Login
                        </Button>

                        <div className={styles.remember}>
                          <Field
                            name="remember"
                            component={this.renderRememberToggle}
                            style={{ fontSize: '10px !important' }}
                            label="Keep me signed in"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </form>

                  <Divider />

                  <Link {...getSignupRoute(router)} data-cy="go-to-signup" style={{ textDecoration: 'none' }}>
                    <CardContent className={styles.footer}>
                      Don't have an account yet? <span style={{ textDecoration: 'underline' }}>Sign up</span>
                    </CardContent>
                  </Link>
                </Card>
              </AnimBox>
            </div>
          </div>
        </PageContainer>
      </div>
    )
  }

  createSubmitHandler = () => {
    const { handleSubmit, submitForm } = this.props

    return handleSubmit((formData) => {
      this.setState({
        isSubmitting: true,
      })

      submitForm(formData)
    })
  }
}

export default Login
