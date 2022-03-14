/* eslint-disable max-len */
/* eslint-disable indent */
import moment from 'moment'
import { DATE_FORMAT } from '../../../app/services/formatting'
import { slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { freelancer, freelancer4, freelancer4Profile } from '../../fixtures/freelancer'
import { interviews, rejectedInterviews, offers, rejectedOffers, activeContracts, jobApplications } from '../../fixtures/contracts'
import { questions } from '../../fixtures/questions'

const firmSlugs = ['', slugify(clients[1].company_name), slugify(clients[2].company_name)] // Empty item is so the indexes match the jobs.

describe('Freelancer Dashboard', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
      .callTestAPI('delete_data', { model: 'Question', params: { id: questions[1].id } })

      .callTestAPI('create_data', { model: 'Question', params: questions[1] })
      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_user', clients[2])
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[2].id } })
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, freelancer_rate_cents: 10000 } })
  })

  describe('Interviews', () => {
    it('Shows interviews on dashboard', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...interviews[3], freelancer_id: freelancer4.id, client_id: clients[2].id, job_id: jobs[2].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=alert-interviews]').should('contain', '2 new interviews')
        .get('.cy-interview-request-card').should('have.length', 2)

        .get('.cy-interview-request-card').eq(1).within(() => {
          cy
            .get('.cy-interview-request-client', { timeout: 120000 }).first().scrollIntoView().should('contain', clients[1].first_name)
            .get('.cy-interview-request-times').first()
              // @TODO There are timezone problems that needs to be resolved for this assertion:
              // .should('contain', moment(interviews[2].interview_date_1).format(DATE_TIME_FORMAT))
              // .should('contain', moment(interviews[2].interview_date_2).format(DATE_TIME_FORMAT))
              // .should('contain', moment(interviews[2].interview_date_3).format(DATE_TIME_FORMAT))
            .get('[data-cy="interview-request-note"]').first().should('contain', interviews[2].interview_note)

            .get('[data-cy="view-job-from-interview"]').first().click()
            .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[1].slug}`)
        })
        .menuNavigateTo('freelancer-navigation-dashboard')

        .get('.cy-interview-request-card').eq(0).within(() => {
          cy
            .get('.cy-interview-request-client', { timeout: 120000 }).should('contain', clients[2].first_name)
            .get('.cy-interview-request-job').should('contain', jobs[2].title)
            .get('.cy-interview-request-times').first()
              // @TODO There are timezone problems that needs to be resolved for this assertion:
              // .should('contain', moment(interviews[3].interview_date_1).DATE_TIME_FORMAT))
              // .should('contain', moment(interviews[3].interview_date_2).format(DATE_TIME_FORMAT))
              // .should('contain', moment(interviews[3].interview_date_3).format(DATE_TIME_FORMAT))
            .get('[data-cy="interview-request-note"]').first().should('contain', interviews[3].interview_note)

            .get('[data-cy="view-job-from-interview"]').first().click()
            .currentURL().should('equal', `/${firmSlugs[2]}/${jobs[2].slug}`)
        })
    })

    it('Freelancer can accept interview', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy="accept-interview"]').first().click()

        // Check field validation
        .get('[data-cy="textarea-freelancer_message"]').first().type('.') // trigger dirty flag
        .get('[data-cy="submit-accept-interview"]').first().click()
        .get('[data-cy="textarea-freelancer_message"]').first().clear()
        .get('[data-cy="radio-error-interview_date"]').first().should('contain', 'Required')

        .get('[data-cy="radio-interview_date-3"]').first().click()
        .get('[data-cy="submit-accept-interview"]').first().click()

        .get('[data-cy="textarea-helper-freelancer_message"]').first().should('contain', 'Required')

        // Fill and submit
        .get('[data-cy="radio-interview_date-0"]').first().click()
        .get('[data-cy="textarea-freelancer_message"]').first().type("Webcam image might be grainy. They don't call me Sandy for nothing.")
        .get('[data-cy="textfield-input-phone"]').first().type(freelancer4.phone)
        .get('[data-cy="submit-accept-interview"]').first().click()
        .get('.cy-interview-request-card-actions').first().should('contain', 'Accepted')
        .get('.snackbar-open').first().should('contain', 'accepted')

        .visit(`/${firmSlugs[1]}/${jobs[1].slug}`) // We have to go away and come back to trigger these UI updates.
        .wait(3000) // solve DOM element detached
        .menuNavigateTo('freelancer-navigation-dashboard')
        .get('.cy-interview-request-times', { timeout: 120000 }).first()
          .should('contain', 'Confirmed interview')
          // @TODO There are timezone problems that needs to be resolved for this assertion:
          // .should('contain', moment(interviews[2].interview_date_1).format(DATE_TIME_FORMAT))
          // .should('not.contain', moment(interviews[2].interview_date_2).format(DATE_TIME_FORMAT))
          // .should('not.contain', moment(interviews[2].interview_date_3).format(DATE_TIME_FORMAT))
    })

    it('Freelancer can reject interview', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy="reject-interview"]').first().click()

        // Check field validation
        .get('[data-cy="select-reject_reason"]').first().click()
        .get('[data-cy="select-interview-reject-reason-option-4"]').first().click()
        .get('[data-cy="submit-reject-interview"]').first().click()
        .get('[data-cy="textarea-helper-freelancer_feedback"]').first().should('contain', 'Required')

        // Fill and submit
        .get('[data-cy="textarea-freelancer_feedback"]').first().type(rejectedInterviews[2].freelancer_feedback)
        .get('[data-cy="submit-reject-interview"]').first().click()
        .get('.cy-interview-request-card').should('not.exist')
        .get('[data-cy="interview-requests-container"]').should('contain', 'No interviews')
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
    })
  })

  describe('Offers', () => {
    it('Shows offers on dashboard', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...offers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...offers[3], freelancer_id: freelancer4.id, client_id: clients[2].id, job_id: jobs[2].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=alert-job-offers]').should('contain', '2 new job offers')
        .get('.cy-job-offer-card').should('have.length', 2)

        .get('.cy-job-offer-card').eq(1).within(() => {
          cy
            .get('.cy-job-offer-client').first().should('contain', clients[1].first_name)
            .get('.cy-job-offer-hourly-rate').first().should('contain', `$${offers[2].freelancer_rate_cents / 100}`)
            .get('.cy-job-offer-start-date').first()
              .should('contain', moment(offers[2].start_date).format(DATE_FORMAT))
              .should('contain', `${moment(offers[2].end_date).format(DATE_FORMAT)}`)
            .get('[data-cy="job-offer-note"]').first().should('contain', offers[2].offer_note)

            .get('[data-cy="view-job-from-interview"]').first().click()
            .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[1].slug}`)
        })
        .get('[data-cy=freelancer-navigation-dashboard]').click()

        .get('.cy-job-offer-card').eq(0).within(() => {
          cy
            .get('.cy-job-offer-client').first().should('contain', clients[2].first_name)
            .get('.cy-job-offer-job').first().should('contain', jobs[2].title)
            .get('.cy-job-offer-hourly-rate').first().should('contain', `$${offers[3].freelancer_rate_cents / 100}`)
            .get('.cy-job-offer-start-date').first()
              .should('contain', moment(offers[3].start_date).format(DATE_FORMAT))
              .should('contain', `${moment(offers[3].end_date).format(DATE_FORMAT)}`)
            .get('[data-cy="job-offer-note"]').first().should('contain', offers[3].offer_note)

            .get('[data-cy="view-job-from-interview"]').first().click()
            .currentURL().should('equal', `/${firmSlugs[2]}/${jobs[2].slug}`)
        })
    })

    it('Freelancer can accept offer', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...offers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy="accept-offer"]').first().click()
        .get('[data-cy="agree-to-terms"]').first().click()
        .get('[data-cy="submit-accept-offer"]').first().click()
        .get('.cy-job-offer-card').should('not.exist')
        .get('[data-cy="contracts-container"]').children().should('have.length', 1)
    })

    it('Freelancer can reject offer', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...offers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy="reject-offer"]').first().click()

        // Check field validation
        .get('[data-cy="select-interview-reject-reason"]').first().click()
        .get('[data-cy="select-offer-reject-reason-option-2"]').first().click()
        .get('[data-cy="submit-reject-offer"]').first().click()
        .get('[data-cy="textarea-helper-freelancer_feedback"]').first().should('contain', 'Required')

        // Fill and submit
        .get('[data-cy="textarea-freelancer_feedback"]').first().type(rejectedOffers[2].freelancer_feedback)
        .get('[data-cy="submit-reject-offer"]').first().click()
        .get('.cy-job-offer-card').should('not.exist')
        .get('[data-cy="contracts-container"]').should('not.exist')
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
    })
  })

  describe('Direct Applications', () => {
    it('Job application draft is created automatically', () => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .login(freelancer4.email, freelancer4.password)
        .visit(`${firmSlugs[1]}/${jobs[1].slug}`)
        .get('[data-cy=job-header]').should('contain', jobs[1].title) // Wait for job to load

        .wait(5000) // in CI, we have to wait for the login process to complete otherwise the button will behave like if the current user is guest
        .get('[data-cy=apply-for-job]').first().click()
        .get('[data-cy=cancel]').click()

        .menuNavigateTo('freelancer-navigation-dashboard')
        .get('[data-cy=job-application-0]', { timeout: 120000 })
          .should('exist')
    })

    it('Job application draft can be resumed', () => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .callTestAPI('create_data', { model: 'Contract', params: { freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, status: 'job_application_draft' } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=job-application-0]', { timeout: 120000 })
          .should('exist')
          .click()

        .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[1].slug}`)
        .get('[data-cy=cancel]').click()
    })

    it('Job application draft can be deleted', () => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .callTestAPI('create_data', { model: 'Contract', params: { freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, status: 'job_application_draft' } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=job-application-0]', { timeout: 120000 }).should('exist')
        .get('[data-cy=cancel]').click()
        .get('[data-cy=job-application-0]').should('not.exist')
    })

    it('Job application invitation can be declined', () => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .callTestAPI('create_data', { model: 'Contract', params: { freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, status: 'job_application_invited' } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=job-application-0]', { timeout: 120000 }).should('exist')
        .get('[data-cy=cancel]').click()
        .get('[data-cy=delete-dialog]').within(() => {
          return cy
            .get('[data-cy=dialog-title]').should('contain', 'Decline invitation from')
            .get('[data-cy=send]').click()
        })
        .get('.snackbar-open').should('contain', 'Application Deleted')
        .get('[data-cy=delete-dialog]').should('not.exist')
        .get('[data-cy=job-application-0]').should('not.exist')
    })

    it('Applicant screening page can be reached from job application', () => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...jobApplications[0], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
        .callTestAPI('create_data', { model: 'Question', params: questions[0] })
        .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, question_id: questions[0].id, request_type: 'answer' } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy=job-application-0]')
          .within(() => {
            return cy.get('[data-cy=request]').click()
          })
        .currentURL().should('equal', `/pre_interview_questions/${jobApplications[0].id}`)
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0] } })
    })
  })

  describe('Work Management', () => {
    before(() => cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' }))

    it('Shows clients on freelancer dashboard', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[3], freelancer_id: freelancer4.id, client_id: clients[2].id, job_id: jobs[2].id } })

        .login(freelancer4.email, freelancer4.password)
        .visit('/member/dashboard')
        .get('[data-cy="contracts-container"]').children().should('have.length', 2)

        .get('.cy-contract-card').eq(1).within(() => {
          cy
            .get('.cy-contract-client').should('contain', clients[1].first_name)
            .get('.cy-contract-job').should('contain', jobs[1].title)
            .get('.cy-contract-date')
            // @TODO There are timezone problems that needs to be resolved for these assertions:
            // .should('contain', moment(activeContracts[2].start_date).format(DATE_FORMAT))
            // .should('contain', moment(activeContracts[2].end_date).format(DATE_FORMAT))
            .get('.cy-contract-hourly-rate').should('contain', `$${activeContracts[2].freelancer_rate_cents / 100}/hr`)

            .get('[data-cy="view-job-from-contract"]').click()
            .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[1].slug}`)
        })

        .menuNavigateTo('freelancer-navigation-dashboard')
        .get('.cy-contract-card').eq(0).within(() => {
          cy
            .get('.cy-contract-client').should('contain', clients[2].first_name)
            .get('.cy-contract-job').should('contain', jobs[2].title)
            .get('.cy-contract-date')
            // @TODO There are timezone problems that needs to be resolved for these assertions:
            // .should('contain', moment(activeContracts[1].start_date).format(DATE_FORMAT))
            // .should('contain', moment(activeContracts[1].end_date).format(DATE_FORMAT))
            .get('.cy-contract-hourly-rate').should('contain', `$${activeContracts[3].freelancer_rate_cents / 100}/hr`)

            .get('[data-cy="view-job-from-contract"]').click()
            .currentURL().should('equal', `/${firmSlugs[2]}/${jobs[2].slug}`)
        })
    })

    it('Handles contract actions on freelancer dashboard properly', () => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[2].id, job_id: jobs[2].id } })

        .login(freelancer4.email, freelancer4.password)

        // Add a timesheet
        .visit('/member/dashboard')
        .get('[data-cy="add-new-timesheet"]').first().click()
        .currentURL().should('equal', '/member/work_reports/new')

        // Pause a contract
        .menuNavigateTo('freelancer-navigation-dashboard')
        .get('[data-cy="pause-contract"]').first().click()
        .get('[data-cy="confirm-dialog-confirm"]').first().click()
        .get('[data-cy="pause-contract"]').should('not.exist')
        .get('[data-cy="resume-contract"]').should('have.length', 1)

        // Resume a contract
        .get('[data-cy="resume-contract"]').first().click()
        .get('[data-cy="confirm-dialog-confirm"]').first().click()
        .get('[data-cy="resume-contract"]').should('not.exist')
        .get('[data-cy="pause-contract"]').should('have.length', 1)

        // End a contract
        .get('[data-cy="end-contract"]').first().click()
        .get('[data-cy="confirm-dialog-confirm"]').first().click()
        .get('.cy-job-offer-card').should('not.exist')
        .get('[data-cy="contracts-container"]').should('not.exist')
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
    })
  })

  describe('Unverified freelancer', () => {
    beforeEach(() => {
      cy.logout()
        .callTestAPI('update_user', {
          email: freelancer.email,
          status: 'unverified',
        })
        .login(freelancer.email, freelancer.password)
    })

    function startScreening() {
      return cy.get('[data-cy=start-application]')
        .click()
        .wait(1000)
        .currentURL()
        .should('equal', '/application/introduction')
    }

    it('can start the screening process from the dashboard', () => {
      cy.visit('/').wait(1000)
      startScreening()
    })
  })

  describe('Rejected freelancer', () => {
    beforeEach(() => {
      cy.logout()
        .callTestAPI('update_user', {
          email: freelancer.email,
          status: 'rejected',
        })
        .login(freelancer.email, freelancer.password)
    })

    it('can see the rejection message', () => {
      cy.visit('/')
        .get('[data-cy=application-text-rejected]')
        .should('exist')
    })

    it('can restart the application process', () => {
      cy.visit('/')
        .get('[data-cy=restart-application]')
        .click()
        .wait(1000)
        .currentURL()
        .should('equal', '/application/introduction')
        .getReduxState()
        .its('auth.currentUser.status')
        .should('equal', 'applying')
    })
  })

  after(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
