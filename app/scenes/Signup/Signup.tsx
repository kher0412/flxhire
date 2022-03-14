import React from 'react'
import { Helmet } from 'react-helmet'
import Link from 'components/Link'
import { getSignupRoute, getLoginRoute, extractQueryParams } from 'services/router'
import {
  CardContent, Divider, Grid, Card, Collapse,
} from '@material-ui/core'
import { ServerError, TermsOfServiceField, PageHeader, PageContainer, LoadingIcon, AnimBox, PagePlaceholder } from 'components'
import { Button, TextField, InfoMessage } from 'components/themed'
import { Field } from 'redux-form'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import ContactsIcon from '@material-ui/icons/Contacts'
import AccountIcon from '@material-ui/icons/AccountCircle'
import { NextRouter } from 'next/router'
import { IUserType } from 'types'
import { performOAuth } from 'services/oauth'
import styles from './Signup.module.css'
import { ContainerProps } from './SignupContainer'
import ResumeUploadField from './components/ResumeUploadField'

const logo = require('assets/images/logos/flexhire-logo-blue.png')

const socialBtnStyle = {
  backgroundColor: '#2c2f3c',
  icon: { width: 20, height: 20, marginRight: 6 },
  wrapper: { margin: '10px 0' },
  label: { color: '#fff' },
  btn: { width: '100%', borderRadius: 5, backgroundColor: '#2c2f3c' },
}

interface ISignupState {
  defaultUserType: IUserType
  defaultCompanyName?: string
  defaultEmail?: string
  userType: IUserType
}

class Signup extends React.PureComponent<ContainerProps, ISignupState> {
  state = {
    defaultUserType: null,
    defaultCompanyName: null,
    defaultEmail: null,
    userType: null,
  }

  componentDidUpdate() {
    const defaultUserType = this.getUserTypeFromRouter(this.props.router)

    if (defaultUserType !== this.state.defaultUserType) {
      this.setState({
        defaultUserType,
        userType: defaultUserType,
      })
    }
  }

  async componentDidMount() {
    const { change, router, getJobData } = this.props
    const { email, firstName, lastName, companyName, job } = extractQueryParams(router?.asPath)

    const defaultUserType = this.getUserTypeFromRouter(router)

    this.setState({
      defaultUserType,
      userType: defaultUserType,
    })

    if (firstName) change('first_name', firstName)
    if (lastName) change('last_name', lastName)

    if (email) {
      change('email', email)
      this.setState({
        defaultEmail: email,
      })
    }

    if (companyName) {
      change('companyName', companyName)
      this.setState({
        defaultCompanyName: companyName,
      })
    }

    if (job && defaultUserType === 'member') {
      getJobData(job)
    } else {
      getJobData(null)
    }
  }

  getUserTypeFromRouter(router: NextRouter): IUserType {
    const param = router.query.user_type
    if (param === 'client') return 'client'
    if (param === 'freelancer' || param === 'member') return 'member'
    return null
  }

  handleUserTypeChange = (userType: IUserType) => {
    const { getJobData, router } = this.props
    this.setState({
      userType,
    }, () => {
      if (userType === 'client') getJobData(null)
      if (userType === 'member') {
        const query = extractQueryParams(router?.asPath)
        if (query.job) {
          getJobData(query.job)
        } else {
          getJobData(null)
        }
      }
    })
  }

  renderCommonFields() {
    const { userType, defaultEmail } = this.state

    // Render standard signup fields if a user-type has been selected.
    if (userType) {
      return (
        <React.Fragment>
          {defaultEmail && (
            <React.Fragment>
              <Grid item xs={12}>
                <InfoMessage style={{ margin: 0 }}>
                  You are signing up with an invitation, so we prefilled some fields for you.
                  Creating your account will automatically accept the invitation based on your email address.
                </InfoMessage>
              </Grid>

              <Grid item xs={12} />
            </React.Fragment>
          )}

          <Grid item xs={12}>
            <Field
              name="email"
              label="Email"
              component={TextField}
              fullWidth
              disabled={defaultEmail}
              helperText={defaultEmail ? "You'll be able to change your email address later if you prefer using a different one" : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextField}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="password_confirmation"
              type="password"
              label="Password Confirmation"
              component={TextField}
              fullWidth
              data-cy="confirm-password"
            />
          </Grid>
        </React.Fragment>
      )
    }

    return null
  }

  renderReferer() {
    const { router } = this.props
    const query = extractQueryParams(router?.asPath)

    if (query.referer) {
      const referer = query.referer

      return (
        <Grid item xs={12}>
          <InfoMessage>
            Your referer will be <Link href="/[...slugs]" as={`/${referer}`}>{referer}</Link>
          </InfoMessage>
        </Grid>
      )
    }

    return null
  }

  renderUserTypeSpecificFields() {
    const { router, job } = this.props
    const { userType, defaultCompanyName } = this.state

    if (userType === 'client') {
      return (
        <React.Fragment>
          <Grid item xs={12} md={6}>
            <Field name="first_name" label="First name" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field name="last_name" label="Last name" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field name="phone" label="Phone #" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field name="companyName" label="Company name" component={TextField} disabled={defaultCompanyName ? true : false} fullWidth />
          </Grid>

          {this.renderReferer()}
        </React.Fragment>
      )
    }

    if (userType === 'member') {
      const isJobSignup = Boolean(extractQueryParams(router.asPath).job)

      return (
        <React.Fragment>
          <Grid item xs={12} md={6}>
            <Field name="first_name" label="First name" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field name="last_name" label="Last name" component={TextField} fullWidth />
          </Grid>

          {isJobSignup && (
            <Grid item xs={12}>
              <Field name="url_resume" component={ResumeUploadField} job={job} />
            </Grid>
          )}

          {this.renderReferer()}
        </React.Fragment>
      )
    }

    return null
  }

  renderLoginProviders() {
    const { submitting, isSubmitting, configuration } = this.props
    const { userType } = this.state
    const signupProviders = configuration?.oauth_signup_providers || []
    const enableLinkedIn = signupProviders.indexOf('linkedin') >= 0
    const enableGithub = signupProviders.indexOf('github') >= 0

    if (userType === 'member') {
      return (
        <React.Fragment>
          {(enableGithub || enableLinkedIn) && (
            <Divider style={{ margin: '24px -24px 12px -24px' }} />
          )}

          {enableLinkedIn && (
            <Button onClick={() => performOAuth('linkedin', userType)} fullWidth disabled={submitting || isSubmitting}>
              <FaLinkedin style={socialBtnStyle.icon} /> Signup with LinkedIn
            </Button>
          )}

          {enableGithub && (
            <Button onClick={() => performOAuth('github', userType)} fullWidth disabled={submitting || isSubmitting}>
              <FaGithub style={socialBtnStyle.icon} /> Signup with Github
            </Button>
          )}
        </React.Fragment>
      )
    }

    return null
  }

  renderSignupSubmit() {
    const { submitting, serverError, isSubmitting, job } = this.props
    const { userType } = this.state

    const useJob = userType === 'member' && job

    if (userType) {
      return (
        <React.Fragment>
          <Grid item xs={12}>
            <Field name="terms_of_service_approved" component={TermsOfServiceField} />
          </Grid>

          <Grid item xs={12}>
            <div className={styles['signup-buttons']}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting || !userType || isSubmitting}
                fullWidth
                data-cy="submit"
              >
                {isSubmitting && (
                  <LoadingIcon />
                )}

                {!isSubmitting && (
                  <React.Fragment>
                    {useJob && 'Apply Now'}
                    {!useJob && `Sign Up as ${userType === 'client' ? 'a client' : 'an individual'}`}
                  </React.Fragment>
                )}
              </Button>

              {this.renderLoginProviders()}

              <ServerError error={serverError} />
            </div>
          </Grid>
        </React.Fragment>
      )
    }

    return null
  }

  renderUserTypeSwitch() {
    const { userType, defaultUserType } = this.state

    if (!defaultUserType) {
      return (
        <Grid container spacing={2} style={{ padding: '24px 0 0px 0' }}>
          <Grid item xs={12} sm={6}>
            <Button
              color={userType === 'client' ? 'primary' : undefined}
              fullWidth
              onClick={() => this.handleUserTypeChange('client')}
              data-cy="join-as-a-client"
            >
              <ContactsIcon className={styles['button-icon']} />
              {' '}
              Join as a client
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              color={userType === 'member' ? 'primary' : undefined}
              fullWidth
              onClick={() => this.handleUserTypeChange('member')}
              data-cy="join-as-an-individual"
            >
              <AccountIcon className={styles['button-icon']} />
              {' '}
              Join as an individual
            </Button>
          </Grid>
        </Grid>
      )
    }
    return null
  }

  renderDefaultUserTypeSwitch() {
    const { router } = this.props
    const { defaultUserType } = this.state

    if (defaultUserType === 'client') {
      return (
        <Link {...getSignupRoute(router, 'freelancer')} className={styles['default-usertype-switch']}>
          Sign up as an individual instead
        </Link>
      )
    }

    if (defaultUserType === 'member') {
      return (
        <Link {...getSignupRoute(router, 'client')} className={styles['default-usertype-switch']}>
          Sign up as a client instead
        </Link>
      )
    }

    return null
  }

  renderCopy() {
    const { job } = this.props
    const { userType, defaultUserType } = this.state

    if ((defaultUserType === 'member' || userType === 'member') && job) {
      return (
        <div className={styles.copy}>
          <div>
            Apply to {job?.title} from {job?.company_name}
          </div>

          <div>
            Powered by Flexhire
          </div>
        </div>
      )
    }

    if (defaultUserType === 'member') {
      return (
        <div className={styles.copy}>
          Join FlexHire today and work for top companies
        </div>
      )
    }

    if (defaultUserType === 'client') {
      return (
        <div className={styles.copy}>
          Join FlexHire today and simplify hiring and managing the best talent
        </div>
      )
    }

    return (
      <div className={styles.copy} style={userType ? { color: 'rgba(0, 0, 0, 0.4)' } : undefined}>
        Are you here
        {' '}
        <span style={userType === 'client' ? { color: '#000' } : undefined}>as a client to hire or manage talent</span>
        , or
        {' '}
        <span style={userType === 'member' ? { color: '#000' } : undefined}>as an individual to join the network of the best talent and find great work</span>
        ?
      </div>
    )
  }

  render() {
    const { handleSubmit, submitForm, router, job } = this.props
    const { userType } = this.state
    const jobSlug = extractQueryParams(router.asPath).job

    const loading = userType === 'member' && jobSlug && job?.slug !== jobSlug
    const jobMode = userType === 'member' && job

    return (
      <React.Fragment>
        <Helmet>
          <title>Signup</title>
          <meta name="description" content="Join as a client to hire or manage talent, or as an individual to join the network of the best talent and find great work." />
          <meta property="og:title" content="Signup - Flexhire" />
          <meta property="og:description" content="Join as a client to hire or manage talent, or as an individual to join the network of the best talent and find great work." />
        </Helmet>

        <PageHeader compact />

        <PageContainer>
          <div className={styles.signup}>
            <AnimBox heavySlideUp>
              {loading && <PagePlaceholder title="Please Wait" subtitle="Fetching job information..." />}

              {!loading && (
                <Card raised>
                  <form onSubmit={handleSubmit(formData => submitForm(formData, userType, this.getClientDataFromRouter()))}>
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div onKeyDown={this.handleKeyEvent} onKeyPress={this.handleKeyEvent}>
                      <CardContent className={styles.box}>
                        <img
                          className={styles.logo}
                          alt={`${(jobMode && job.company_logo_url) ? job.company_name : 'Flexhire'} Logo`}
                          src={(jobMode && job.company_logo_url) ? job.company_logo_url : logo}
                        />
                        {this.renderCopy()}
                        {this.renderUserTypeSwitch()}
                      </CardContent>

                      <Collapse in={!!userType}>
                        <Divider style={{ margin: 0 }} />

                        <CardContent className={styles.box}>
                          <Grid container spacing={3}>
                            {this.renderCommonFields()}
                            {this.renderUserTypeSpecificFields()}
                            {this.renderSignupSubmit()}
                          </Grid>
                        </CardContent>
                      </Collapse>
                    </div>
                  </form>

                  <Divider />

                  <CardContent className={styles.footer}>
                    Already have an account?
                    {' '}
                    <Link {...getLoginRoute(router)} data-cy="go-to-login">Log in</Link>
                    {' '}
                    {this.renderDefaultUserTypeSwitch()}
                  </CardContent>
                </Card>
              )}
            </AnimBox>
          </div>

        </PageContainer>
      </React.Fragment>
    )
  }

  handleKeyEvent = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      if (e.target?.tagName !== 'TEXTAREA') {
        const d = document as any
        d.activeElement?.blur()
        e.preventDefault()
      }

      e.stopPropagation()
    }
  }

  getClientDataFromRouter() {
    const { action, mode, freelancer_type, freelancer_subtype } = this.props.router.query

    if (action === 'job' || mode === 'job') {
      return {
        freelancerType: freelancer_type || 0,
        freelancerSubtype: freelancer_subtype || 0,
        isJobMode: true,
      }
    }

    return undefined
  }
}

export default Signup
