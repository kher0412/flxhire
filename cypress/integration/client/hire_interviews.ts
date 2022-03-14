/* eslint-disable max-len */
/* eslint-disable indent */
// import { DATE_TIME_FORMAT } from 'services/timeKeeping'
import { slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { freelancer4, freelancer4Profile } from '../../fixtures/freelancer'
import { interviews, acceptedInterviews, rejectedInterviews } from '../../fixtures/contracts'

const LARAVEL_SKILL_ID = 21

describe('Client Hire Interviews', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Contract', params: { id: interviews[2].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: LARAVEL_SKILL_ID, job_id: jobs[1].id } })
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
      .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: LARAVEL_SKILL_ID, experience: 2, user_id: freelancer4.id } })
  })

  describe('Unaccepted interview list freelancer cards work properly', () => {
    before(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/interviews')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()
        .wait(2000)

        .get('[data-cy=result-list]').children().should('have.length', 1)
        .get('[data-cy=result-list]').children().eq(0).should('contain', 'Technology')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Interview Requested')
            .get('[data-cy=view-job-from-contract]')
              .should('contain', jobs[1].title)
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', 'Laravel 2+ yrs')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
            cy.get('[data-cy=freelancer-info]').within(() => {
              cy
                .get('[data-cy=compensation-hourly-rate]')
                  .should('contain', `$${(freelancer4Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/hr`)
                  .should('contain', 'Full time')
                .get('[data-cy=potential-annual-compensation]').should('contain', (acceptedInterviews[2].annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 }))
                .get('[data-cy=interview-date]')
                // @TODO There are timezone problems that needs to be resolved for these assertions:
                  // .should('contain', moment(interviews[2].interview_date_1).format(DATE_TIME_FORMAT))
                  // .should('contain', moment(interviews[2].interview_date_2).format(DATE_TIME_FORMAT))
                  // .should('contain', moment(interviews[2].interview_date_3).format(DATE_TIME_FORMAT))
            })
        })
    })

    it('Card actions: Links can be viewed', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/interviews')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()

        .get('[data-cy=freelancer-avatar]').first().click()
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)

        .visit('/client/hire?tab=interviews')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=view-profile]').click()
        })
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)

        .visit('/client/hire?tab=interviews')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()
        .wait(2000)
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=view-job-from-contract]')
              .should('contain', jobs[1].title)
              .click()
        })
        .currentURL().should('equal', `/${slugify(clients[1].company_name)}/${jobs[1].slug}`)
    })

    it('Card actions: interview request cannot be canceled', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/interviews')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=skip]').should('not.exist')
        .get('[data-cy=delete]').should('not.exist')
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
    })
  })

  describe('Accepted interviews list freelancer cards work properly', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...acceptedInterviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/interviews')

        .get('[data-cy=result-list]').children()
          .should('have.length', 1)

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=freelancer-info]').within(() => {
            cy
              .get('[data-cy=compensation-hourly-rate]')
                .should('contain', `$${(freelancer4Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/hr`)
                .should('contain', 'Full time')
              .get('[data-cy=potential-annual-compensation]').should('contain', (acceptedInterviews[2].annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 }))
              // @TODO There are timezone problems that needs to be resolved for this assertion:
              // .get('[data-cy=interview-date]').should('contain', moment(acceptedInterviews[2].interview_date).format(DATE_TIME_FORMAT))
              .get('[data-cy=contact]').click()
          })
        })
        .get('[data-cy=email]').should('contain', freelancer4.email)
        .get('[data-cy=phone]').should('contain', freelancer4.phone)
        .get('[data-cy=contact-close]').click()

        .get('[data-cy=result-list]').children().eq(0)
          .should('contain', 'Technology')

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Interview Accepted')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })

        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', 'Laravel 2+ yrs')
    })

    it('Card actions: offer button works', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/interviews')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=make-offer]').click()
        .currentURL().should('match', /client\/invitation_team/)
    })

    describe('Making Offers', () => {
      beforeEach(() => {
        cy.callTestAPI('delete_data', { model: 'Contract', params: { id: acceptedInterviews[2].id }, method: 'delete_all' })
        cy.callTestAPI('create_data', { model: 'Contract', params: { ...acceptedInterviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, client_rate_cents: 8000 }, method: 'delete_all' })
      })

      it('basic offer can be made to the candidate', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/interviews')
          .wait(5000)
          .get('[data-cy=result-list]').children().eq(0).within(() => cy.get('[data-cy=take-action]').click())
          .get('[data-cy=make-offer]').click()

          .currentURL().should('match', /client\/invitation_team/)
          .get('[data-cy=textfield-input-client_rate]', { timeout: 20000 }).type('50')
          .get('[data-cy=invitation-form-continue]').click()
          .wait(3000)
          .get('[data-cy=submit-invitation]').click()
          .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Offer sent')
          .currentURL().should('match', /client\/hire/)
          .get('[data-cy=result-list]').children().should('have.length', 1)
      })
    })

    it('Card actions: freelancer can be rejected', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/interviews')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=skip]').click()
        .get('[data-cy=reject-dialog]').within(() => {
          cy
            .get('[data-cy=textarea-client_rejection_message]').clear().type('We need a robot with more antennas')
            .get('[data-cy=reject]').click()
        })
        .get('.snackbar-open').should('contain', 'Rejected successfully')
        .get('[data-cy=status-badge').should('contain', 'Rejected')
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
    })
  })

  describe('Rejected interviews list freelancer cards work properly', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...rejectedInterviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/interviews')

        .get('[data-cy=result-list]').children().should('have.length', 1)
        .get('[data-cy=result-list]').children().eq(0).should('contain', 'Technology')

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Interview Rejected')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', 'Laravel 2+ yrs')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
            cy.get('[data-cy=freelancer-info]').within(() => {
              cy
                .get('[data-cy=compensation-hourly-rate]')
                  .should('contain', `$${(freelancer4Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/hr`)
                  .should('contain', 'Full time')
                .get('[data-cy=potential-annual-compensation]').should('contain', (acceptedInterviews[2].annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 }))
                // @TODO There are timezone problems that needs to be resolved for this assertion:
                // .get('[data-cy=interview-date]').should('contain', moment(acceptedInterviews[2].interview_date).format(DATE_TIME_FORMAT))
            })
            .get('[data-cy=freelancer-card-reject-reason]')
              .should('contain', freelancer4.first_name)
              .should('contain', rejectedInterviews[2].freelancer_feedback)
        })
    })

    it('Card actions: rejected interview can be requested again', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/interviews')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=request-interview]').click()
        .get('[data-cy=interview-dialog]').within(() => {
          cy
            .get('[data-cy=dialog-title]')
              .should('contain', 'interview')
              .should('contain', freelancer4.first_name)
            .wait(3000) // job sometimes does not load in time if we submit too fast
            .get('[data-cy=submit]').click()
        })
        .get('.snackbar-open').should('contain', 'Interview requested')
        .get('[data-cy=result-list]').children().should('have.length', 1)
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Interview Requested')
        })
    })

    it('Card actions: rejected interview can be deleted', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/interviews')
        .get('[data-cy=result-list]', { timeout: 120000 }).children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=delete]').click()
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('[data-cy=result-list]').children().should('have.length', 0)
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
