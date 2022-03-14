import React, { useState } from 'react'
import { browserHistory } from 'services/router'
import Link from 'components/Link'
import IndustrySelectorDialog from 'components/IndustrySelectorDialog'
import { PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderPrimaryButton } from 'components'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import styles from './SignupCTA.module.css'

const SignupCTA = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
  }

  const handleSelect = (type, subtype) => {
    if (type && subtype) {
      browserHistory.push('/candidates_preview/[freelancer_type_id]/[freelancer_subtype_id]', `/candidates_preview/${type.slug}/${subtype.slug}`)
    } else if (type) {
      browserHistory.push('/candidates_preview/[freelancer_type_id]', `/candidates_preview/${type.slug}`)
    } else {
      browserHistory.push('/candidates_preview')
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <PageHeader compact alternative white>
      {isDialogOpen && (
        <IndustrySelectorDialog
          open
          onSelect={handleSelect}
          onClose={handleDialogClose}
        />
      )}

      <PageHeaderTitle variant="center">
        We help companies hire and manage great teams at startup speed
      </PageHeaderTitle>

      <PageHeaderSubtitle variant="center">
        Read below to find out how we can help your company hire and manage teams better
      </PageHeaderSubtitle>

      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PageHeaderPrimaryButton onClick={handleDialogOpen} data-cy="post-a-job">
              Start hiring - post a job
            </PageHeaderPrimaryButton>
          </Grid>

          <Grid item xs={12} md={6}>
            <PageHeaderPrimaryButton to="/flexmanage" data-cy="signup-timesheets">
              Help manage my team
            </PageHeaderPrimaryButton>
          </Grid>
        </Grid>
      </div>
    </PageHeader>
  )
}

export default SignupCTA
