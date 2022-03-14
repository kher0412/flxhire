// import { DATE_FORMAT } from 'services/timeKeeping'
import { slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { freelancer4, freelancer4Profile } from '../../fixtures/freelancer'
import { offers, rejectedOffers, invitationOffers } from '../../fixtures/contracts'

const LARAVEL_SKILL_ID = 21

describe('Client Hire Offers', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
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

  describe('Unaccepted offer list freelancer cards work properly', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...offers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/offers')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()

        .get('[data-cy=result-list]', { timeout: 10000 }).children().should('have.length', 1)

        .get('[data-cy=result-list]', { timeout: 10000 }).children().eq(0).should('contain', 'Technology')

        .get('[data-cy=result-list]', { timeout: 10000 }).children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Offer Made')
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
                .get('[data-cy=compensation-hourly-rate]').should('contain', `${offers[2].client_rate_cents / 100}/hr`)
                .get('[data-cy=offered-annual-compensation]').should('not.exist')
                // @TODO There are timezone problems that needs to be resolved for these assertions:
                .get('[data-cy=start-date]')
                // .should('contain', moment(offers[2].start_date).format(DATE_FORMAT))
            })
        })
    })

    it('Card actions: freelancer profile can be viewed', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/offers')
        .get('[data-cy=select-job_selector]').click()
        .get('[data-cy=select-job_selector-all]').click()

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=freelancer-card-header] [data-cy=view-profile]').click()
        })
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)

        .visit('/client/hire?tab=offers')
        .get('[data-cy=select-job_selector').click()
        .get('[data-cy=select-job_selector-all').click()

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=view-job-from-contract]')
              .should('contain', jobs[1].title)
              .click()
        })
        .currentURL().should('equal', `/${slugify(clients[1].company_name)}/${jobs[1].slug}`)
    })

    it('Card actions: offer can be canceled', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/offers')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=status-badge]').should('contain', 'Offer Made')
            .get('[data-cy=take-action]').click()
        })
        .get('[data-cy=skip]').should('contain', 'Reject').click()
        .get('[data-cy=reject-dialog]').within(() => {
          cy
            .get('[data-cy=textarea-client_rejection_message]').clear().type('We need a robot with more antennas')
            .get('[data-cy=reject]').click()
        })
        .get('.snackbar-open').should('contain', 'Rejected successfully')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy.get('[data-cy=status-badge]').should('contain', 'Rejected')
        })
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
    })
  })

  describe('Rejected offer list freelancer cards work properly', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...rejectedOffers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/offers')

        .get('[data-cy=result-list]').children().should('have.length', 1)

        .get('[data-cy=result-list]').children().eq(0).should('contain', 'Technology')

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Offer Rejected')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', 'Laravel 2+ yrs')
        .get('[data-cy=result-list]').children().eq(0).within(() => {
            cy.get('[data-cy=freelancer-info]').within(() => {
              cy
                .get('[data-cy=compensation-hourly-rate]').should('contain', `${rejectedOffers[2].client_rate_cents / 100}/hr`)
                .get('[data-cy=offered-annual-compensation]').should('not.exist')
                // @TODO There are timezone problems that needs to be resolved for these assertions:
                // .get('[data-cy=start-date]').should('contain', moment(rejectedOffers[2].start_date).format(DATE_FORMAT))
            })
            .get('[data-cy=freelancer-card-reject-reason]')
              .should('contain', freelancer4.first_name)
              .should('contain', rejectedOffers[2].freelancer_feedback)
        })
    })

    it('Card actions: offer can be made again', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/offers')
        .get('[data-cy=result-list]', { timeout: 120000 }).children().eq(0).within(() => {
          cy.get('[data-cy=take-action]').click()
        })
        .get('[data-cy=make-offer]').click()
        .currentURL().should('match', /client\/invitation_team/)
        .get('[data-cy=textfield-input-client_rate]', { timeout: 20000 }).type('50')
        .get('[data-cy=invitation-form-continue]').click()
        .wait(3000)
        .get('[data-cy=submit-invitation]').click()
        .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Offer sent')
        .currentURL().should('match', /client\/hire/)
        .get('[data-cy=result-list]').children().should('have.length', 1)
        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Offer Made')
        })
    })

    it('Card actions: rejected offer can be deleted', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/offers')
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

  describe('Invitation type offer works properly', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Contract', params: { ...invitationOffers[0], client_id: clients[1].id, job_id: jobs[1].id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/offers')

        .get('[data-cy=result-list]').children().should('have.length', 1)

        .get('[data-cy=result-list]').children().eq(0).within(() => {
          cy
            .get('[data-cy=freelancer-card-header]').should('contain', invitationOffers[0].freelancer_first_name)
            .get('[data-cy=freelancer-card-header]').should('contain', invitationOffers[0].freelancer_last_name)
            .get('[data-cy=freelancer-info]').within(() => {
              cy
                .get('[data-cy=compensation-hourly-rate]').should('contain', `${invitationOffers[0].client_rate_cents / 100}/hr`)
                // @TODO There are timezone problems that needs to be resolved for these assertions:
                // .get('[data-cy=start-date]').should('contain', moment(offers[0].start_date).format(DATE_FORMAT))
            })
        })
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
