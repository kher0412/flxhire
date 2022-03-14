import { clients } from '../../../fixtures/client'
import { freelancer, freelancer2, freelancer2Profile } from '../../../fixtures/freelancer'
import { newFreelancer } from '../../../fixtures/freelancer_signup'
import { fillOutProfile, uploadAvatar } from '../../../common/profile'
import { freelancerTypes } from '../../../fixtures/freelancer_types'


describe('Referrals', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_user', freelancer) // create without video
      .callTestAPI('create_user', clients[1])
  })

  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer2.id } })
      .callTestAPI('create_user', { ...freelancer2, video: null }) // create without video
      .callTestAPI('create_data', { model: 'Profile', params: freelancer2Profile })
      .callTestAPI('delete_data', { model: 'Contract', method: 'delete_all', params: { freelancer_id: freelancer2.id } })
  })

  it('job application with referral works when logged in', () => {
    const JOB_TITLE = 'Cypress test job referral'
    cy
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('delete_jobs', { title: JOB_TITLE })
      .login(freelancer2.email, freelancer2.password)
      .callTestAPI('create_job_with_referral', {
        title: JOB_TITLE,
        freelancer_type_id: freelancerTypes[0].id,
        email: clients[1].email,
        referer: freelancer.email,
      })
      .its('body')
      .then(({ token }) => {
        cy
          .visit(`/job/${token}`)
          .get('[data-cy=job-card-header]').should('contain', JOB_TITLE) // Check only to make sure API calls finished
          // need to wait for the user/login process to finish
          .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
          .wait(1000) // avoid nothing happens when clicking too fast
          .get('[data-cy=apply-for-job]').first().click()
          .get('.snackbar-open').should('contain', 'Job application sent!')
          .get('[data-cy=apply-for-job]').should('not.exist')
          .get('[data-cy=application-message]').should('exist')
      })
  })

  it('job application with referral works for logged out user through signup', () => {
    const JOB_TITLE = 'Cypress test sign up for job referral'
    cy
      .callTestAPI('delete_user', { email: newFreelancer.email })
      .callTestAPI('delete_jobs', { title: JOB_TITLE })
      .callTestAPI('create_job_with_referral', {
        title: JOB_TITLE,
        freelancer_type_id: 1,
        email: clients[1].email,
        referer: freelancer.email,
      })
      .its('body')
      .then(({ token, job }) => {
        cy
          .visit(`/job/${token}`)
          .get('[data-cy=job-header]').should('contain', JOB_TITLE) // Wait for load.
          .get('[data-cy=apply-for-job]').first().click()
          .currentURL().should('match', /^\/signup\/member/)
          .queryParams().should('deep.equal', {
            job: job.slug,
          })
          .get('[data-cy=agree-to-terms]').click()
          .get('[data-cy=textfield-input-email]').type(newFreelancer.email)
          .get('[data-cy=textfield-input-password]').type(newFreelancer.password)
          .get('[data-cy=confirm-password] input').type(newFreelancer.password)
          .get('[data-cy=textfield-input-first_name]').type(newFreelancer.first_name)
          .get('[data-cy=textfield-input-last_name]').type(newFreelancer.last_name)
          .get('[data-cy=submit]').click()
          .confirmEmail(newFreelancer)
          .currentURL().should('equal', '/profile')
          .get('[data-cy=complete-profile-for-job-message]').should('exist')
        fillOutProfile()
        uploadAvatar()
        cy.get('[data-cy=open-video-introduction]').should('not.exist')
          .get('[data-cy=save-and-continue]').click()
          .currentURL().should('equal', `/${job.firm_slug}/${job.slug}`)
          .get('.snackbar-open').should('contain', 'Job application sent!')
          .get('[data-cy=apply-for-job]').should('not.exist')
          .get('[data-cy=application-message]').should('exist')
          .get('[data-cy=avatar-header-more]').click()
          .get('[data-cy=logout]').click()
      })
  })

  it('job application with referral works for logged out user through login', () => {
    const JOB_TITLE = 'Cypress test login for job referral'
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer2.id }, method: 'delete_all' })
      .callTestAPI('delete_jobs', { title: JOB_TITLE })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'unverified',
      })
      .callTestAPI('create_job_with_referral', {
        title: JOB_TITLE,
        freelancer_type_id: freelancerTypes[0].id,
        email: clients[1].email,
        referer: freelancer.email,
      })

      .its('body')
      .then(({ token, job }) => {
        const expectedQueryParams = { job: job.slug }
        return cy
          .visit(`/job/${token}`)
          .get('[data-cy=job-card-header]').should('contain', JOB_TITLE) // Check only to make sure API calls finished
          .get('[data-cy=apply-for-job]').first().click()
          .currentURL().should('match', /^\/signup\/member/)
          .queryParams().should('deep.equal', expectedQueryParams)
          // Check that params are kept when changing between pages
          .get('[data-cy=go-to-login]').click()
          .currentURL().should('match', /^\/login/)
          .get('[data-cy=go-to-signup]').children().first().click()
          .currentURL().should('match', /^\/signup/)
          .queryParams().should('deep.equal', expectedQueryParams)
          .get('[data-cy=go-to-login]').click()
          .currentURL().should('match', /^\/login/)
          .queryParams().should('deep.equal', expectedQueryParams)
          // Login
          .get('[data-cy=textfield-input-email]').type(freelancer2.email)
          .get('[data-cy=textfield-input-password]').type(freelancer2.password)
          .get('[data-cy=login]').click()
          .currentURL().should('equal', `/${job.firm_slug}/${job.slug}`)
          .get('.snackbar-open').should('contain', 'Job application sent!')
          .get('[data-cy=apply-for-job]').should('not.exist')
          .get('[data-cy=application-message]').should('exist')
          .menuNavigateTo('freelancer-navigation-dashboard')
          // check that the "you applied to one or more jobs" message is there
          .get('[data-cy=start-application]', { timeout: 60000 })
          // check that the draft application is there
          .get('[data-cy=job-application-0]').should('exist')
      })
  })
})
