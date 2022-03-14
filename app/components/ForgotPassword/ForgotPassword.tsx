import { memo } from 'react'
import { CardContent, Card, Divider } from '@material-ui/core'
import { Field } from 'redux-form'
import { ServerError, LoadingIcon, PageHeader, PageContainer, Picture } from 'components'
import { Button, TextField } from 'components/themed'
import { Email } from '@material-ui/icons'
import styles from './ForgotPassword.module.css'
import { ContainerProps } from './ForgotPasswordContainer'

const ForgotPassword = memo(({ handleSubmit, submitting, error }: ContainerProps) => (
  <div>
    <PageHeader compact />

    <PageContainer>
      <div className={styles['login-container']}>
        <div className={styles.login}>
          <Card raised>
            <form onSubmit={handleSubmit}>
              <CardContent className={styles.box}>
                <Picture
                  className={styles.logo}
                  src={require('assets/images/logos/flexhire-logo-blue.png?webp')}
                  srcFallback={require('assets/images/logos/flexhire-logo-blue.png')}
                  alt="Flexhire"
                />

                <div className={styles.copy}>
                  Enter your Email to reset your Password
                </div>
              </CardContent>

              <Divider style={{ margin: '24px 0' }} />

              <CardContent className={styles.box}>
                <div className={styles['anim-items']}>
                  <Field name="email" label="Email" component={TextField} type="email" fullWidth />
                </div>
              </CardContent>

              <CardContent className={styles.box}>
                <div className={styles['login-button']}>
                  <ServerError error={error} data-cy="login-server-error" />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    data-cy="submit"
                    disabled={submitting}
                  >
                    {submitting && <LoadingIcon style={{ marginRight: 12 }} />}
                    {!submitting && <Email style={{ marginRight: 12 }} />}
                    Send Instructions
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </PageContainer>
  </div>
))

export default ForgotPassword
