/* eslint-disable indent */
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../app/services/formatting'
import { clients } from '../../fixtures/client'
import { skills } from '../../fixtures/skills'
import { jobs } from '../../fixtures/jobs'
import { freelancer4, freelancer4Profile, freelancer5, freelancer5Profile, freelancer6, freelancer6Profile } from '../../fixtures/freelancer'
import { interviews, acceptedInterviews, rejectedInterviews, offers, rejectedOffers, activeContracts } from '../../fixtures/contracts'
import { submittedTimesheets } from '../../fixtures/timesheets'
import { invoices, overdueInvoices } from '../../fixtures/invoices'

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

describe('Client Dashboard', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
      .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id, freelancer_type_id: freelancer4Profile.freelancer_type_id } })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[0].id, job_id: jobs[1].id } })
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, freelancer_rate_cents: 3000, client_rate_cents: 3500 } })
      .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 2, user_id: freelancer4.id } })
      .callTestAPI('create_user', { params: freelancer5, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer5Profile } })
      .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 2, user_id: freelancer5.id } })
      .callTestAPI('create_user', { params: freelancer6, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer6Profile } })
      .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 2, user_id: freelancer6.id } })
  })

  describe('Hiring Pipeline', () => {
    describe('Jobs tab', () => {
      it('lists jobs', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=job-item]').should('have.length', 1)
      })

      it('viewing specific job works properly', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=job-item]').eq(0).should('contain', jobs[1].title).click({ timeout: 10000 })
          .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[1].slug}`)
      })

      it('viewing all jobs works properly', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=view-all-jobs]').click()
          .currentURL().should('equal', '/client/hire')
          .queryParams().should('deep.equal', { tab: 'jobs' })
      })

      it('creating new jobs works properly', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=create-a-job]').click()
          .currentURL().should('equal', '/client/job/add_job/job')
      })
    })

    describe('Interviews tab', () => {
      before(() => {
        cy
          .callTestAPI('create_data', { model: 'Contract', params: { ...interviews[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, updated_at: moment().add(40, 'minutes').format(DATE_TIME_FORMAT) } })
          .callTestAPI('create_data', { model: 'Contract', params: { ...rejectedInterviews[2], freelancer_id: freelancer6.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, id: 50002, updated_at: moment().add(2, 'minutes').format(DATE_TIME_FORMAT) } })
          .callTestAPI('create_data', { model: 'Contract', params: { ...acceptedInterviews[2], freelancer_id: freelancer5.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, id: 50001, updated_at: moment().add(20, 'minutes').format(DATE_TIME_FORMAT) } })
      })

      beforeEach(() => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=tab-interviews]').click()
      })

      it('interviews are listed', () => {
        cy
          .get('[data-cy=interview-item]', { timeout: 120000 }).should('have.length', 3)
          .get('[data-cy=interview-item]').eq(0).should('contain', freelancer5.first_name).should('contain', 'Interview Accepted')
      })

      it('can view specific interview', () => {
        cy
          .get('[data-cy=interview-item]', { timeout: 120000 }).eq(0).click()
          .currentURL().should('equal', '/client/hire')
          .queryParams().its('tab').should('equal', 'interviews')
      })

      it('can view all interviews', () => {
        cy
          .get('[data-cy=view-all-interviews]', { timeout: 10000 }).click()
          .currentURL().should('equal', '/client/hire')
          .queryParams().should('deep.equal', { tab: 'interviews' })
          .get('[data-cy=result-list]', { timeout: 120000 }).children().should('have.length', 3)
      })
    })

    describe('Offers tab', () => {
      before(() => {
        cy
          .callTestAPI('create_data', { model: 'Contract', params: { ...offers[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, updated_at: moment().add(40, 'minutes').format(DATE_TIME_FORMAT) } })
          .callTestAPI('create_data', { model: 'Contract', params: { ...rejectedOffers[2], freelancer_id: freelancer5.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, id: 50001, updated_at: moment().add(2, 'minutes').format(DATE_TIME_FORMAT) } })
      })

      it('offers are listed', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=tab-offers]').click()
          .get('[data-cy=offer-item]', { timeout: 120000 }).should('have.length', 2)
          .get('[data-cy=offer-item]').eq(0).should('contain', freelancer5.first_name).should('contain', 'Offer Rejected')
      })

      it('can view specific offer', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=tab-offers]').click()
          .get('[data-cy=offer-item]', { timeout: 120000 }).eq(0).click()
          .currentURL().should('equal', '/client/hire')
          .queryParams().its('tab').should('equal', 'offers')
      })

      it('can view all offers', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit('/client/dashboard').closeMenuIfOpen()
          .get('[data-cy=tab-offers]').click()
          .get('[data-cy=view-all-offers]', { timeout: 120000 }).click()
          .currentURL().should('equal', '/client/hire')
          .queryParams().should('deep.equal', { tab: 'offers' })
          .get('[data-cy=result-list]').children().should('have.length', 2)
      })
    })
  })

  describe('Team Operations', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'PayrollItem', params: { contract_id: activeContracts[2].id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[8], freelancer_id: freelancer4.id, client_id: clients[1].id, contract_id: activeContracts[2].id } })
        .callTestAPI('create_data', { model: 'Invoice', params: { ...overdueInvoices[1], user_id: clients[1].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[9], freelancer_id: freelancer4.id, client_id: clients[1].id, contract_id: activeContracts[2].id, status: 'approved', remove_payroll_item: true } })
        .callTestAPI('create_data', { model: 'PayrollItem', params: { id: 50000, contract_id: activeContracts[2].id, timesheet_id: submittedTimesheets[9].id } })
        .callTestAPI('create_data', { model: 'InvoiceItem', params: { invoice_id: overdueInvoices[1].id, payroll_item_id: 50000 } })
        .callTestAPI('create_data', { model: 'Invoice', params: { ...invoices[0], user_id: clients[1].id } })
        .callTestAPI('create_timesheet', { params: { ...submittedTimesheets[10], freelancer_id: freelancer4.id, client_id: clients[1].id, contract_id: activeContracts[2].id, status: 'approved', remove_payroll_item: true } })
        .callTestAPI('create_data', { model: 'PayrollItem', params: { id: 50001, contract_id: activeContracts[2].id, timesheet_id: submittedTimesheets[10].id } })
        .callTestAPI('create_data', { model: 'InvoiceItem', params: { invoice_id: invoices[0].id, payroll_item_id: 50001 } })
    })

    it('Your team work properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()

        .get('[data-cy=team-item]', { timeout: 120000 }).should('have.length', 1)
        .get('[data-cy=team-view-all]')
          // .should('contain', 1) // This data is shown improperly because of a bug: https://trello.com/c/cBFXcl0I/1065-team-size-count-is-incorrect-on-client-dashboard
          .click()
        .currentURL().should('equal', '/client/manage')
        .get('[data-cy=freelancer-list]', { timeout: 120000 }).children().should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:first [data-cy=freelancer-card-header]').should('contain', freelancer4.first_name)

        .visit('/client/dashboard').closeMenuIfOpen()
        .get('[data-cy=invite]').click()
        .currentURL().should('equal', '/client/invitation_team')

        .visit('/client/dashboard').closeMenuIfOpen()
        .get('[data-cy=team-item]', { timeout: 120000 }).first()
          .should('contain', freelancer4.first_name)
          .should('contain', jobs[1].title)
          .click()
        .currentURL().should('equal', '/client/manage')
        .queryParams().its('name').should('equal', 'Ladis')
    })

    it('Viewing all timesheets', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()

        .get('[data-cy=dashboard-timesheets]').click()
        .get('[data-cy=timesheets-view-all]', { timeout: 120000 }).click()
        .currentURL().should('equal', '/client/manage')
        .queryParams().should('deep.equal', { tab: 'work' })
        .getByEnv('[data-cy="timesheets-table-body"] [data-cy="row"]', '[data-cy="timesheets-list"] [data-cy="card"]').should('have.length', 3)
    })

    it('Viewing specific timesheets', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()
        .get('[data-cy=dashboard-timesheets]').click()
        .get('[data-cy=timesheet-item]', { timeout: 120000 }).first().click()
        .currentURL().should('match', /\/client\/work_reports\/\d+/)
    })

    it('Viewing all invoices', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()

        .get('[data-cy=dashboard-invoices]').click()
        .get('[data-cy=invoices-view-all]', { timeout: 120000 }).click()
        .currentURL().should('equal', '/client/manage')
        .queryParams().should('deep.equal', { tab: 'invoices' })
        .get('[data-cy="invoices-table-body"] [data-cy="row"]', { timeout: 120000 }).should('have.length', 2)
    })

    it('Viewing specific invoices', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/dashboard').closeMenuIfOpen()
        .get('[data-cy=dashboard-invoices]').click()
        .get('[data-cy=invoice-item]', { timeout: 120000 }).first().should('exist')
        // TODO: test that the PDF downloads
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Invoice', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Timesheet', params: { client_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id } })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
