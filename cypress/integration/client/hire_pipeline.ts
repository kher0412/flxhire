/* eslint-disable indent */
import { skipOnCI, slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { skills } from '../../fixtures/skills'
import { jobs } from '../../fixtures/jobs'
import { jobApplications } from '../../fixtures/contracts'
import { projects } from '../../fixtures/projects'
import { freelancerSubtypes } from '../../fixtures/freelancer_subtypes'
import { institutes } from '../../fixtures/institutes'
import { educations } from '../../fixtures/timeline_entries'
import { questions } from '../../fixtures/questions'
import { freelancer4, freelancer4Profile, freelancer5, freelancer5Profile, freelancer6, freelancer6Profile } from '../../fixtures/freelancer'
import { videos } from '../../fixtures/video'

function openFiltersIfHidden() {
  // Need to wait for Hire page to load properly before continuing.
  // Notice: the order of the following exists and not.exists checks is important!
  // The page goes through a few renders before we are ready to open the filters
  cy.get('[data-cy=page-bundle-placeholder]', { timeout: 120000 }).should('not.exist')
  cy.get('[data-cy=select-job_selector]', { timeout: 120000 }).should('exist')
  cy.get('[data-cy=select-job_selector-loading]', { timeout: 120000 }).should('not.exist')
  cy.get('[data-cy=page-placeholder-loading]', { timeout: 120000 }).should('not.exist')
  return cy.get('body').then((body) => {
    if (body.find('[data-cy=open-filters]').length > 0) {
      return cy.get('[data-cy=open-filters]').click()
    }
    return body
  })
}

function closeFiltersIfHidden() {
  return cy
    .get('body').then((body) => {
      if (body.find('[data-cy=close-filters]').length > 0) {
        return cy.get('[data-cy=close-filters]').click()
      }
      return undefined
    })
}

describe('Client Hire Pipeline', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Skip', params: { company_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'Contract', method: 'delete_all', params: { freelancer_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[1].id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[2].id } })
      .callTestAPI('delete_data', { model: 'FreelancerSubtype', params: { id: freelancerSubtypes[2].id } })

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_data', { model: 'FreelancerSubtype', params: { ...freelancerSubtypes[2], freelancer_type_id: freelancer4Profile.freelancer_type_id } })
      .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[1] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[2] })
      .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id, freelancer_type_id: freelancer4Profile.freelancer_type_id } })
      .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[1].id, freelancer_type_id: freelancer4Profile.freelancer_type_id } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[1] })
  })

  describe('Job search actions work properly', () => {
    before(() => {
      cy
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[1].id } })
    })

    it('Job selector and job buttons work properly', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit(`/client/hire/${jobs[1].slug}`).closeMenuIfOpen()
        .get('[data-cy=select-job_selector-loading]').should('not.exist')
        .get('[data-cy=hire-navigation-applicants]').first().click()
        .get('[data-cy=select-job_selector]').click()
        .wait(500)
        .get(`[data-cy=select-job_selector-option-${jobs[2].slug}]`).click()
        .get('[data-cy=select-job_selector]').should('contain', jobs[2].title)
        .wait(1000)
        .get('[data-cy=select-job_selector]').click()
        .wait(500)
        .get(`[data-cy=select-job_selector-option-${jobs[1].slug}]`).click()
        .get('[data-cy=select-job_selector]').should('contain', jobs[1].title)
        .get('[data-cy=page-placeholder]', { timeout: 6000 }).should('exist') // Wait for load.

        .get('[data-cy=view-job]').click()
        .currentURL().should('equal', `/${slugify(clients[1].company_name)}/${jobs[1].slug}`)

        .openMenuIfClosed()
        .get('[data-cy=client-hire-overview]').first().click()
        .wait(1000)
        .get('[data-cy=hire-overview-applicants]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .wait(1000)
        .get('[data-cy=select-job_selector]').should('exist')
        .get('[data-cy=select-job_selector-loading]').should('not.exist')
        .get('[data-cy=select-job_selector]').click()
        .wait(500)
        .get(`[data-cy=select-job_selector-option-${jobs[2].slug}]`).click()
        .get('[data-cy=page-placeholder]', { timeout: 6000 }).should('exist') // Wait for load.
        .get('[data-cy=edit-job]').click()
        .currentURL().should('equal', `/client/job/${jobs[2].slug}`)

        .openMenuIfClosed()
        .get('[data-cy=hire-overview-jobs]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .wait(2000)
        .get('[data-cy=new-job]').click()
        .wait(2000)
        .currentURL().should('equal', '/client/job/add_job/job')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { method: 'destroy_all', model: 'Job', params: { id: jobs[1].id } })
        .callTestAPI('delete_data', { method: 'destroy_all', model: 'Job', params: { id: jobs[2].id } })
    })
  })

  describe('Candidate list handles freelancer statuses properly', () => {
    before(() => {
      cy
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[0].id, job_id: jobs[1].id } })
        .callTestAPI('create_user', { params: { ...freelancer4, status: 'applied' }, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer4.id } })
        .callTestAPI('create_user', { params: freelancer5, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer5Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer5.id } })
    })

    it('Non accepted freelancers are not shown', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=potential`).closeMenuIfOpen().closeMenuIfOpen()

      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()
        .get('[data-cy=result-list] [data-cy=freelancer-card]').should('have.length', 1)

        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-card-header]').should('contain', freelancer5.first_name)
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { method: 'destroy_all', model: 'Job', params: { id: jobs[1].id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
    })
  })

  describe('Candidate list freelancer cards work properly', () => {
    before(() => {
      cy
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[0].id, job_id: jobs[1].id } })
        .callTestAPI('create_user', { params: freelancer4, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer4.id } })
        .callTestAPI('create_user', { params: freelancer5, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer5Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer5.id } })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[1].id, experience: 2, user_id: freelancer5.id } })
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=potential`).closeMenuIfOpen()

      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()
        .get('[data-cy=result-list]').children().should('have.length', 2)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').should('contain', 'Technology')
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]').should('not.exist')
            .get('[data-cy=view-job-from-contract]').should('not.exist')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', `${skills[0].name} 1+ yrs`)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').within(() => {
            cy.get('[data-cy=freelancer-info]')
              .should('contain', `${(freelancer4Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/hr`)
              .should('contain', (freelancer4Profile.annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }))
        })
        // We need to close the skills pop up because it gets in the way

        .reload() // TODO: figure out why clicking outside was not enough to close the popup in some cases
      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()

        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(1)').should('contain', 'Technology')
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(1)').within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer5.first_name)
            .get('[data-cy=view-job-from-contract]').should('not.exist')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]')
          .should('contain', `${skills[0].name} 1+ yrs`)
          .should('contain', `${skills[1].name} 2+ yrs`)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(1)').within(() => {
            cy.get('[data-cy=freelancer-info]')
              .should('contain', `${(freelancer5Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}/hr`)
              .should('contain', (freelancer5Profile.annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }))
        })
    })

    it('Card actions: candidate profile can be viewed', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=potential`).closeMenuIfOpen()

      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)', { timeout: 120000 }).within(() => {
          cy
            .get('[data-cy=view-profile]').click()
        })
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)
    })

    it('Card actions: candidate can be skipped', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=potential`).closeMenuIfOpen()

      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()
        .get('[data-cy=result-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 2)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
        .get('[data-cy=skip]').click()
        .get('[data-cy=reject-dialog]').within(() => {
          cy.get('[data-cy=select-client_rejection_reason]').click()
        })
        .get('[data-cy=reject-location]').click() // this element is not within reject-dialog
        .get('[data-cy=reject-dialog]').within(() => {
          cy.get('[data-cy=reject]').click()
        })
        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Candidate skipped')
        .get('.snackbar-open', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=result-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 1)

        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
        .get('[data-cy=skip]').click()
        .get('[data-cy=reject-dialog]').within(() => {
          cy.get('[data-cy=select-client_rejection_reason]').click()
        })
        .get('[data-cy=reject-other]').click() // this element is not within reject-dialog
        .get('[data-cy=reject-dialog]').within(() => {
          cy.get('[data-cy=textarea-client_rejection_comments]').type('Too humanlike')
            .get('[data-cy=reject]').click()
        })
        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Candidate skipped')
        .get('[data-cy=page-placeholder]').should('exist')
    })

    // TODO: always fails on CI. Figure out why and re-enable
    it.skip('Card actions: candidate invitation/notification can be sent', () => {
      cy
        .callTestAPI('delete_data', { model: 'Skip', params: { company_id: clients[1].id } })
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=potential`).closeMenuIfOpen()

      openFiltersIfHidden()
        .get('[data-cy=open-filters-budget]').click()
        .get('[data-cy=textfield-input-max_rate]').clear().type('500')

      closeFiltersIfHidden()
        .wait(5000)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
        .wait(1000)
        .get('[data-cy=send-invitation]').click()
        .wait(1000)
        .get('[data-cy=confirm-dialog-confirm').click()
        .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Notification email sent')
        .get('[data-cy=send-invitation]').should('contain', 'Notification Sent')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Skip', params: { company_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { method: 'destroy_all', model: 'Job', params: { id: jobs[1].id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
    })
  })

  describe('Direct applicant list freelancer cards work properly', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { id: jobApplications[0].id }, method: 'delete_all' })
        // NOTE: overriding client_rate on the job otherwise the applicants end up being filtered out.
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id, client_rate_cents: 6000 } })
        .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[0].id, job_id: jobs[1].id } })
        .callTestAPI('create_user', { params: freelancer4, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...jobApplications[0], job_id: jobs[1].id, freelancer_id: freelancer4.id, client_id: clients[1].id } })
    })

    // TODO: figure out why it fails on CI
    skipOnCI('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()

        .get('[data-cy=result-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 1)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').should('contain', 'Technology')
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]').should('contain', 'Application Sent')
            .wait(2000) // wait a bit to avoid element detached
            .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        .get('[data-cy=freelancer-skills]').should('contain', `${skills[0].name} 1+ yrs`)
        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)').within(() => {
            cy.get('[data-cy=freelancer-info]')
              .should('contain', `${(freelancer4Profile.client_rate_cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/hr`)
              .should('contain', (freelancer4Profile.annual_compensation_cents / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }))
        })
    })

    // TODO: figure out why it fails on CI
    skipOnCI('Card actions: freelancer profile can be viewed', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()

        .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)', { timeout: 120000 }).within(() => {
          cy.get('[data-cy=view-profile]').click()
        })
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)
    })

    describe('Contract Requests', () => {
      before(() => {
        cy
          .callTestAPI('create_data', { model: 'Question', params: questions[0] })
          .callTestAPI('delete_data', { model: 'Video', params: { id: videos[0].id } })
      })

      beforeEach(() => {
        cy
          .callTestAPI('delete_data', { model: 'JobQuestion', params: { question_id: questions[0].id } })
          .callTestAPI('delete_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id } })
      })

      it('Card actions: video can be requested using dedicated button', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=status-badge]', { timeout: 120000 }).should('contain', 'Application Sent')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=request-video]').should('contain', 'Request Video Introduction')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=request-video]').click()
          .get('[data-cy=confirm-dialog-confirm]').click()
          .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Request sent')
          // TODO: figure out why edge is not removed from connection, then re-enable this check
          // .get('[data-cy=result-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('not.exist')
          .get('[data-cy=hire-navigation-screening]').first().click()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=request-video]', { timeout: 120000 }).should('be.disabled')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=request-video]').should('contain', 'Video Introduction Requested')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
          .get('[data-cy=ask-more]').should('contain', 'Screen (Requested, 0/1)')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=status-badge]').should('contain', 'Screening Requested')
      })

      // NOTE: this tesk is flaky, often fails on CI
      // It fails when it checks for "Screen (Requested, 1/2)". Maybe there's a dependency issue with the test data?
      it.skip('Card actions: existing question can be asked', () => {
        cy
          .callTestAPI('create_data', { model: 'Video', params: { ...videos[0], user_id: freelancer4.id } })
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=status-badge]').should('contain', 'Application Sent')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
          .get('[data-cy=ask-more]').should('contain', 'Screen').click()
          .get(`[data-cy=question-${questions[0].id}`).should('not.exist')
          .get('[data-cy=choose-questions]').click()
          .get('[data-cy=existing-questions-dialog]').should('exist')
          .get('[data-cy=textfield-input-question-search]').clear().type(questions[0].title)
          // Remove all the filters if any
          // .get('[data-cy^=checkbox-freelancer_type-] input[type=checkbox], [data-cy^=checkbox-freelancer_subtype-] input[type=checkbox], [data-cy^=checkbox-skill-] input[type=checkbox]').each(uncheckIfChecked)
          .get('[data-cy=result-0]').invoke('attr', 'data-cy-picked').should('eq', 'false')
          .wait(2000) // Have to wait for the results to update. Feel free to remove this if you find a better way
          .get('[data-cy=result-0]').invoke('attr', 'data-cy-title').should('eq', questions[0].title)
          .get('[data-cy=result-0-action]').click()
          .get('[data-cy=result-0]').invoke('attr', 'data-cy-picked').should('eq', 'true')
          .get('[data-cy=done]').click()
          .get(`[data-cy=question-${questions[0].id}`).should('exist')
          .get('.snackbar-open', { timeout: 120000 }).should('not.exist') // if we click too fast the snackbar does not work properly
          .get('[data-cy=send]').click()
          .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Request sent')
          .get('[data-cy=result-list] [data-cy=freelancer-card]').should('not.exist')
          .get('[data-cy=hire-navigation-screening]').first().click()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
          .get('[data-cy=ask-more]').should('contain', 'Screen (Requested, 1/2)')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=status-badge]').should('contain', 'Screening Requested')
      })

      it('Card actions: saved questions are picked automatically in screen dialog', () => {
        cy
          .callTestAPI('create_data', { model: 'JobQuestion', params: { question_id: questions[0].id, job_id: jobs[1].id } })
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]', { timeout: 120000 }).click()
          .get('[data-cy=ask-more]').click()
          .get(`[data-cy=question-${questions[0].id}`).should('exist')
          .get('[data-cy=send]').click()
          .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Request sent')
      })

      after(() => {
        cy
          .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0] } })
          .callTestAPI('delete_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id } })
          .callTestAPI('delete_data', { model: 'Video', params: { id: videos[0].id } })
      })
    })

    describe('Contract Feedback', () => {
      beforeEach(() => {
        cy.callTestAPI('delete_data', { model: 'ContractFeedback', params: { user_id: clients[1].id } })
      })

      // TODO: figure out why it fails on CI
      skipOnCI('Card actions: feedback can be posted', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=contract-feedback]', { timeout: 120000 }).click()
          .get('[data-cy=textarea-description]').should('exist')
          .get(`[data-cy=rating_entry-${clients[1].id}-description`).should('not.exist')
          .get('[data-cy=textarea-description]').type('Hello this is my feedback')
          .get('[data-cy=rating-rating_positive-positive]').click()
          .get('[data-cy=submit-feedback]').click()
          .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Rating sent')
          .get(`[data-cy=rating_entry-${clients[1].id}-description`).should('contain', 'Hello this is my feedback')
          // TODO: verify that the numbers on the feedback button update on the card, after switching to graphql for the RatingDialog
      })

      it('Card actions: feedback from others can always be viewed', () => {
        cy
          .callTestAPI('create_user', { ...clients[2], company_name: clients[1].company_name })
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=contract-feedback]', { timeout: 120000 }).click()
          .get('[data-cy=textarea-description]').should('exist')
          .get('[data-cy=other-feedbacks-notice').should('not.exist')
          .get('[data-cy=close]').click()
          .callTestAPI('create_data', { model: 'ContractFeedback', params: { user_id: clients[2].id, contract_id: jobApplications[0].id, description: 'Other client feedback', status: 'sent' } })
          .reload()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=contract-feedback]', { timeout: 120000 }).click()
          .get('[data-cy=textarea-description]').should('exist')
          .get(`[data-cy=rating_entry-${clients[2].id}-description`).should('exist')
          .get(`[data-cy=rating_entry-${clients[1].id}-description`).should('not.exist')
          .get('[data-cy=other-feedbacks-notice').should('not.exist')
          .get('[data-cy=close]').click()
          .reload()
          .callTestAPI('create_data', { model: 'ContractFeedback', params: { user_id: clients[1].id, contract_id: jobApplications[0].id, description: 'Hello this is my feedback', status: 'sent' } })
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=contract-feedback]').click()
          .get(`[data-cy=rating_entry-${clients[1].id}-description`).should('contain', 'Hello this is my feedback')
          .get(`[data-cy=rating_entry-${clients[2].id}-description`).should('contain', 'Other client feedback')
          .get('[data-cy=other-feedbacks-notice').should('not.exist')
      })

      afterEach(() => {
        cy.callTestAPI('delete_data', { model: 'ContractFeedback', params: { user_id: clients[1].id } })
      })

      after(() => {
        cy.callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      })
    })

    describe('Pipeline changes', () => {
      beforeEach(() => {
        cy
          .callTestAPI('delete_data', { model: 'Contract', params: { id: jobApplications[0].id }, method: 'delete_all' })
          .callTestAPI('create_data', { model: 'Contract', params: { ...jobApplications[0], job_id: jobs[1].id, freelancer_id: freelancer4.id, client_id: clients[1].id } })
      })

      it('Card actions: freelancers can be rejected', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()

          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=take-action]').click()
          .get('[data-cy=skip]').click()
          .get('[data-cy=reject-dialog]').within(() => {
            cy.get('[data-cy=textarea-client_rejection_message]').clear().type('Test message')
            cy.get('[data-cy=select-client_rejection_reason]').click()
          })
          .get('[data-cy=reject-location]').click() // this element is not within reject-dialog
          .get('[data-cy=reject-dialog]').within(() => {
            cy.get('[data-cy=reject]').click()
          })
          .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Rejected successfully')
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0) [data-cy=status-badge]')
          .should('contain', 'Rejected')
      })

      it('Card actions: interview can be requested', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/client/hire/${jobs[1].slug}?tab=applicants`).closeMenuIfOpen()

          .get('[data-cy=result-list]', { timeout: 120000 }).children().eq(0).within(() => {
            cy.get('[data-cy=take-action]').click()
          })
          .get('[data-cy=request-interview]').click()
          .get('[data-cy=interview-dialog]').within(() => {
            cy
              .get('[data-cy=dialog-title]')
                .should('contain', 'interview')
                .should('contain', freelancer4.first_name)
              .get('[data-cy=textarea-interview_note]').type('Please specify the type of armchair you would like to coach from.')
              .get('[data-cy=flexhire-agreement]').click()
              .get('[data-cy=submit]').click()
          })
          .get('.snackbar-open').should('contain', 'Interview requested')
          .get('[data-cy=result-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 0)
          .get('[data-cy=hire-navigation-interviews]').click()
          .get('[data-cy=result-list] [data-cy=freelancer-card]:eq(0)', { timeout: 120000 }).within(() => {
            cy.get('[data-cy=freelancer-card-header]')
              .should('not.contain', jobs[1].title)
            .get('[data-cy=status-badge]')
              .should('contain', 'Interview Requested')
            .get('[data-cy=take-action]').click()
          })
          .get('[data-cy=skip]').should('not.exist')
      })
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
        .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id }, method: 'destroy_all' })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[1].id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
