import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import { Button } from 'components/themed'
import Grid from '@material-ui/core/Grid'
import { PageHeader } from 'components'
import IndustrySelectorDialog from 'components/IndustrySelectorDialog'
import { browserHistory } from 'services/router'
import styles from './SignupCTA.module.css'

export default class SignupCTA extends React.Component {
  state = {
    isDialogOpen: false,
  }

  render() {
    const { isDialogOpen } = this.state

    return (
      <PageHeader>
        {isDialogOpen && (
          <IndustrySelectorDialog
            open
            onSelect={this.handleSelect}
            onClose={this.handleDialogClose}
          />
        )}

        <div className={styles.content}>
          <Grid container spacing={3} style={{ justifyContent: 'center' }}>
            <Grid item xs={12}>
              <div className={styles.title} data-cy="main-cta">
                <MediaQuery minWidth={700}>
                  Hire and Run Remote Tech Teams
                </MediaQuery>

                <MediaQuery maxWidth={699}>
                  Hire and Run <br />
                  Remote Tech Teams
                </MediaQuery>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={styles.subtitle}>
                Research based hiring & management of top tech talent for a modern flexible workforce
              </div>
            </Grid>

            <Grid item xs={11} sm={8} md={4}>
              <Button
                fullWidth
                data-cy="post-a-job"
                className={styles.button}
                onClick={this.handleDialogOpen}
              >
                Start Hiring
              </Button>
            </Grid>

            <Grid item xs={11} sm={8} md={4} className={styles['freelancer-signup']}>
              <Link href="/signup/[user_type]" as="/signup/member" style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  data-cy="join-as-a-freelancer"
                  className={styles.button}
                >
                  Join as an individual
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </PageHeader>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleSelect = (type, subtype) => {
    if (type && subtype) {
      browserHistory.push('/candidates_preview/[freelancer_type_id]/[freelancer_subtype_id]', `/candidates_preview/${type.slug}/${subtype.slug}`)
    } else if (type) {
      browserHistory.push('/candidates_preview/[freelancer_type_id]', `/candidates_preview/${type.slug}`)
    } else {
      browserHistory.push('/candidates_preview')
    }
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
