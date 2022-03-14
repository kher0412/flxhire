import React from 'react'
import dynamic from 'services/dynamic'
import { get } from 'lodash'
import {
  Input, IconButton, Paper, InputAdornment,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CopyIcon from '@material-ui/icons/FileCopy'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { PageWrapper, PageContainer, PageHeader, PageHeaderTitle, InfoMessage } from 'components'
import { setFieldToEventValue } from 'services/stateManagement'
import Link from 'components/Link'
import styles from './Referrals.module.css'
import { ContainerProps } from './ReferralsContainer'

// TypingEffect does not work on the server side
const TypingEffect = dynamic(() => import(/* webpackChunkName: "ReactTypingEffect" */'react-typing-effect'), { ssr: false }) as any

const titleWords = [
  'Member',
  'Customer',
  'Developer',
  'Company',
  'Designer',
  'Engineer',
]

class InviteFriend extends React.PureComponent<ContainerProps> {
  state = {
    email: '',
    sending: false,
  }

  changeEmail = setFieldToEventValue('email').bind(this)

  send = () => {
    const { send } = this.props
    const { email } = this.state
    this.setState({ sending: true }, () => {
      send(email).then(() => {
        this.setState({ email: '', sending: false })
      }).catch(() => this.setState({ sending: false }))
    })
  }

  handleCopy = () => {
    const { showSnackbarMessage } = this.props
    showSnackbarMessage('Referral link copied to clipboard')
  }

  renderTitleWords() {
    return (
      <TypingEffect
        text={titleWords}
        speed={150}
        eraseDelay={2500}
        typingDelay={2000}
        style={{ display: 'inline' }}
      />
    )
  }

  render() {
    const { user } = this.props
    const { email, sending } = this.state
    const slug = user?.profile?.slug
    const url = `${process.env.ROOT_URL}/signup?referer=${slug}`
    const noPayoneer = !user?.has_active_payout_method

    return (
      <div>
        <PageHeader compact>
          <PageHeaderTitle>
            Referrals
          </PageHeaderTitle>
        </PageHeader>

        <PageContainer>
          <PageWrapper raised>
            <div className={styles.hero}>
              <div className={styles.title}>
                Invite a
                {' '}
                {this.renderTitleWords()}
                .
                <div className={styles.subtitle}>
                  Earn rewards.
                </div>
              </div>

              <div className={styles.statement}>
                By inviting Customers or Members, you will be rewarded a referral fee for their
                first contract on Flexhire.
              </div>

              <div className={styles.form}>
                <Paper elevation={1} style={{ padding: '10px' }}>
                  <Input
                    type="email"
                    className={styles.email}
                    fullWidth
                    disableUnderline
                    placeholder="Send an Email"
                    value={email}
                    onChange={this.changeEmail}
                    data-cy="input-email"
                    inputProps={{ 'data-cy': 'input-input-email' }}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          color="primary"
                          onClick={this.send}
                          disabled={!email || sending}
                          data-cy="send-invite"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </Paper>

                <div className={styles.share}>
                  <div className={styles.statement}>
                    Or share your referral link
                  </div>

                  <div className={styles.link}>
                    <Paper elevation={1} style={{ padding: '10px' }}>
                      <Input
                        disableUnderline
                        value={url}
                        disabled
                        fullWidth
                        endAdornment={(
                          <InputAdornment position="end">
                            <CopyToClipboard
                              text={url}
                              onCopy={this.handleCopy}
                            >
                              <IconButton
                                data-cy="copy-referral-link"
                              >
                                <CopyIcon />
                              </IconButton>
                            </CopyToClipboard>
                          </InputAdornment>
                        )}
                      />
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
          </PageWrapper>

          <InfoMessage>
            The reward will be paid out to you after your referral gets an active contract on the platform.

            {noPayoneer && (
              <React.Fragment>
                <Link href="/account/paying_you">Set up payments</Link> to receive rewards.
              </React.Fragment>
            )}
          </InfoMessage>
        </PageContainer>
      </div>
    )
  }
}

export default InviteFriend
