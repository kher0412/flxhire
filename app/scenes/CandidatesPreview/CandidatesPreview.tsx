import React from 'react'
import { Grid } from '@material-ui/core'
import { IFreelancer, IFreelancerType, IFreelancerSubtype } from 'types'
import { IHireTab } from 'scenes/ClientHire/Hire'
import { buildQueryParams } from 'services/router'
import { Page, PageSidebar, PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderPrimaryButton, PageContent, PageBody, Suspense } from 'components'
import Sidebar from './components/Sidebar'
import Freelancer from './components/Freelancer'
import Footer from './components/Footer'

export interface ICandidatesPreviewProps {
  freelancers: IFreelancer[]
  freelancerType: IFreelancerType
  freelancerSubtype: IFreelancerSubtype
}

export interface ICandidatesPreviewState {
}

export default class CandidatesPreview extends React.Component<ICandidatesPreviewProps, ICandidatesPreviewState> {
  render() {
    const { freelancers = [], freelancerType, freelancerSubtype } = this.props

    return (
      <Page>
        <PageHeader>
          <PageHeaderTitle variant="center" style={{ marginBottom: 36 }}>
            Sample {freelancerType.name} Experts {freelancerSubtype.name ? `(${freelancerSubtype.name})` : ''}
          </PageHeaderTitle>

          <PageHeaderSubtitle variant="center" style={{ marginBottom: 12, fontSize: 16 }}>
            Join now to find the perfect {freelancerSubtype.name} expert with the right skillset at the right budget for your job
          </PageHeaderSubtitle>

          <Grid container spacing={3} style={{ justifyContent: 'center' }}>
            <Grid item xs={12} sm={8} md={6}>
              <PageHeaderPrimaryButton
                to={this.getSignupLink()}
                data-cy="post-a-job"
              >
                Join Now to Start Hiring
              </PageHeaderPrimaryButton>
            </Grid>
          </Grid>
        </PageHeader>

        <PageBody>
          <PageSidebar sticky>
            <Sidebar
              freelancerType={freelancerType}
              freelancerSubtype={freelancerSubtype}
            />
          </PageSidebar>

          <PageContent maxWidth="lg">
            <div>
              {freelancers.map(freelancer => (
                <Suspense>
                  <Freelancer
                    freelancer={freelancer}
                    hireLinkDestination={this.getSignupLink()}
                  />
                </Suspense>
              ))}
            </div>

            <Footer
              signupUrl={this.getSignupLink()}
              freelancerTypeName={freelancerType.name}
            />
          </PageContent>
        </PageBody>
      </Page>
    )
  }

  getSignupLink() {
    const { freelancerType, freelancerSubtype } = this.props

    return `/signup/client?${buildQueryParams({ freelancer_type: freelancerType.id, freelancer_subtype: freelancerSubtype.id })}&action=job`
  }
}
