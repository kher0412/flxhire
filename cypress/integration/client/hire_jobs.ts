/* eslint-disable indent */
import { slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { skills } from '../../fixtures/skills'
import { jobs } from '../../fixtures/jobs'
import { institutes } from '../../fixtures/institutes'
import { questions } from '../../fixtures/questions'
import { freelancerSubtypes } from '../../fixtures/freelancer_subtypes'
import { educations } from '../../fixtures/timeline_entries'
import { freelancer4, freelancer4Profile, freelancer5, freelancer5Profile, freelancer6, freelancer6Profile } from '../../fixtures/freelancer'

const firmSlug = slugify(clients[1].company_name)

describe('Client Hire Jobs', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { title: jobs[1].title } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })

      .callTestAPI('create_user', clients[1])
  })

  describe('Job creation', () => {
    function submitJob() {
      return cy
        .get('.snackbar-open', { timeout: 60000 }).should('not.exist')
        .get('[data-cy=save-changes]').click()
        .get('.snackbar-open', { timeout: 60000 }).invoke('text').should('match', /Job.*Saved/gi) // support draft and open jobs simulatenously
        .currentURL().should('match', /\/client\/job\/[a-z0-9-]+/)
        .wait(1000)
    }

    before(() => {
      cy
        .callTestAPI('create_data', { model: 'Question', params: questions[0] })
        .callTestAPI('create_data', { model: 'FreelancerSubtype', params: { ...freelancerSubtypes[2], freelancer_type_id: freelancer4Profile.freelancer_type_id } })
        .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
        .callTestAPI('create_data', { model: 'Skill', params: skills[1] })
        .callTestAPI('create_data', { model: 'Skill', params: skills[2] })
        .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id, freelancer_type_id: freelancer4Profile.freelancer_type_id } })
        .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[1].id, freelancer_type_id: freelancer4Profile.freelancer_type_id } })
        .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
        .callTestAPI('create_data', { model: 'Institute', params: institutes[1] })
        .callTestAPI('create_user', { params: freelancer4, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
        .callTestAPI('create_data', { model: 'ProfileSubtype', params: { freelancer_subtype_id: freelancerSubtypes[2].id, profile_id: freelancer4Profile.id } })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[2].id, experience: 1, user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer4.id } })
        .callTestAPI('create_user', { params: freelancer5, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer5Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[1].id, experience: 2, user_id: freelancer5.id } })
        .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[1], user_id: freelancer5.id } })
        .callTestAPI('create_user', { params: freelancer6, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer6Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 1, user_id: freelancer6.id } })
        .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[2], user_id: freelancer6.id } })
    })

    beforeEach(() => {
      cy.callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
    })

    it('Create basic job and display its information', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1], ['Laravel'])

        .get('[data-cy=job-continue]', { timeout: 120000 }).click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(10000)
        .get('[data-cy=job-continue]', { timeout: 120000 }).click({ timeout: 120000 }) // to screening
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
        .get('[data-cy=job-continue]', { timeout: 120000 }).click() // to preview
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
      submitJob()
        .visit(`/${firmSlug}/${jobs[1].slug}`).closeMenuIfOpen()

        .get('[data-cy=job-header]')
        .should('contain', jobs[1].title)
        .should('contain', clients[1].company_name)
        .get('[data-cy=job-card-header]')
        .should('contain', jobs[1].title)
        .should('contain', 'Freelance')
        .should('contain', (jobs[1].min_client_rate_cents * 8) / 100)
        .should('contain', (jobs[1].client_rate_cents * 8) / 100)
        .get('[data-cy=job-skills]')
        .should('contain', 'Laravel')
        .get('[data-cy=job-info-tiles]')
        .should('contain', 'Technology')
        .should('contain', `${jobs[1].project_length_in_months} months`)
        .should('contain', 'Remote')
        .get('[data-cy=job-text-description]')
        .should('contain', jobs[1].description)
        .get('[data-cy=job-company-description]')
        .should('contain', clients[1].company_name)
        .should('contain', clients[1].company_website)
    })

    it('Create job with existing questions', () => {
      const uncheckIfChecked = item => cy.wrap(item).uncheckIfChecked()
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1])
        .wait(2000) // Avoid opening the dialog "too fast"
        .get('[data-cy=job-continue]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(5000) // wait for collapse transition, otherwise there are 2 'continue' buttons
        .get('[data-cy=job-continue]').click() // to screening
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=existing-questions-dialog]').should('not.exist')
        .get('[data-cy=screening-mode-automatic]').click()
        .get('[data-cy=add-existing-question]').click()
        .get('[data-cy=existing-questions-dialog]').should('exist')
        .get('[data-cy=textfield-input-question-search]').clear().type(questions[0].title)
        // Remove all the filters if any
        .get('[data-cy^=checkbox-freelancer_type-] input[type=checkbox], [data-cy^=checkbox-freelancer_subtype-] input[type=checkbox], [data-cy^=checkbox-skill-] input[type=checkbox]').each(uncheckIfChecked)
        .get('[data-cy=result-0]').invoke('attr', 'data-cy-picked').should('eq', 'false')
        .wait(2000) // Have to wait for the results to update. Feel free to remove this if you find a better way
        .get('[data-cy=result-0]').invoke('attr', 'data-cy-title').should('eq', questions[0].title)
        .get('[data-cy=result-0-action]').click()
        .get('[data-cy=result-0]').invoke('attr', 'data-cy-picked').should('eq', 'true')
        .get('[data-cy=job-question-0]').should('exist')
        .get('[data-cy="textfield-input-questions[0].title"] input[type=text]').should('have.value', questions[0].title)
        .get('[data-cy=done]').click()
        .wait(500)

      cy.get('[data-cy=job-continue]').click()
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
      .wait(1000)
      submitJob()
    })

    it('Create job with custom questions', () => {
      const QUESTION_TITLE = 'Do you hit the biker with a helmet or the one without it if this is the only option to avoid a greater accident?'
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { title: QUESTION_TITLE } })
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1])
        .get('[data-cy=job-continue]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000) // wait for collapse transition, otherwise there are 2 'continue' buttons
        .get('[data-cy=job-continue]').click() // to screening
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=existing-questions-dialog]').should('not.exist')
        .get('[data-cy=screening-mode-automatic]', { timeout: 120000 }).click()
        .get('[data-cy=add-custom-question]').click()
        .get('[data-cy=add-custom-question-input] input[type=text]').type(QUESTION_TITLE)
        .get('[data-cy=add-custom-question-done]').click()
        .get('[data-cy="textfield-input-questions[0].title"] input[type=text]').should('have.value', QUESTION_TITLE)

      cy.get('[data-cy=job-continue]').click()
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
      submitJob()
    })

    // NOTE: this tesk is flaky, often fails on CI
    // TODO: the test is broken due to stricter filtering on the sourcing candidates.
    // Fix the candidate fixtures so they better match the job to make them show up and make the test pass
    it.skip('Create job with candidate sourcing', () => {
      const uncheckIfChecked = item => cy.wrap(item).uncheckIfChecked()
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1], [skills[0].name, skills[1].name])
        .get('[data-cy=job-continue]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)

        // get first candidate and tick it
        // the candidate itself doesn't matter, as when we'll untick it later, the first candidate will be the same
        .get('[data-cy=loading-page]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
        .get('[data-cy=checkbox-input-automatically_notify_candidates]', { timeout: 20000 }).should('be.checked')
        .get('[data-cy=checkbox-input-automatically_notify_candidates]', { timeout: 20000 }).each(uncheckIfChecked)
        .get('[data-cy=checkbox-candidate]', { timeout: 20000 }).first().click()
        .get('[data-cy=checkbox-candidate] input', { timeout: 20000 }).first().should('be.checked')
        .wait(1000)

      submitJob()

      cy.reload()
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=sourcing]', { timeout: 120000 }).should('not.be.disabled')
        .get('[data-cy=sourcing]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
        .get('[data-cy=checkbox-input-automatically_notify_candidates]', { timeout: 20000 }).should('not.be.checked')
        .get('[data-cy=checkbox-candidate] input', { timeout: 20000 }).first().should('be.checked') // test first candidate from before
    })

    it('Create job with referral boost sourcing', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1])
        .get('[data-cy=job-continue]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(15000)
        .get('[data-cy=referral_bounty-checkbox] input').click()
        .get('[data-cy=textfield-input-referral_bounty]').clear().type('200')

      submitJob()

      cy.reload()
        .get('[data-cy=sourcing]', { timeout: 120000 }).should('not.be.disabled')
        .get('[data-cy=sourcing]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=textfield-input-referral_bounty]').invoke('val').should('equal', '200')
    })

    it('Create job with job integration sourcing', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/job/add_job/job').closeMenuIfOpen()
        .fillSimpleJobForm(jobs[1])
        .wait(1000)
        .get('[data-cy=job-continue]').click() // to sourcing
        .wait(15000)
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        // .get('[data-cy=checkbox-job-integration-StackOverflow] input', { timeout: 20000 }).click()

      submitJob()

      cy.reload()
        .get('[data-cy=sourcing]', { timeout: 120000 }).should('not.be.disabled')
        .get('[data-cy=sourcing]').click() // to sourcing
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        // .get('[data-cy=checkbox-job-integration-StackOverflow] input', { timeout: 20000 }).should('be.checked')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
        .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Job', params: { title: jobs[1].title } })
        .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'TimelineEntry', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[1].id } })
        .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
        .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
        .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
        .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[2].id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtype', params: { id: freelancerSubtypes[2].id } })
    })
  })

  describe('Job Page', () => {
    before(() => {
      cy.callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
    })

    it('Client job actions work', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/${firmSlug}/${jobs[1].slug}`).closeMenuIfOpen()

        .wait(5000) // in CI, without this wait, the login process is not completed yet and the button behaves as if the user is guest
        .get('[data-cy=apply-for-job-fake]').first().click()
        .get('[data-cy=dialog-ok]').click()

        .get('[data-cy=view-candidates]').click()
        .wait(5000) // locally, the next check sometimes fails without this wait
        // .get('[data-cy=page-placeholder]').should('exist') // makes tests unreliable if DB has enough candidates already
        .currentURL().should('equal', '/client/hire')
        .queryParams().its('job').should('equal', jobs[1].slug)
        .queryParams().its('tab').should('equal', 'potential')

        .get('[data-cy=view-job]').click()
        .wait(5000) // avoid element detached from DOM error on CI
        .get('[data-cy=edit-job]', { timeout: 120000 }).click() // sometimes loading the page takes a lot of time
        .currentURL().should('equal', `/client/job/${jobs[1].slug}`)
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Job', params: { title: jobs[1].title } })
    })
  })

  describe('Client job list', () => {
    beforeEach(() => {
      cy
        .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[1].id } })
    })

    it('Add job button works', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/hire?tab=jobs').closeMenuIfOpen()

        .get('[data-cy=new-job]').click()
        .currentURL().should('equal', '/client/job/add_job/job')
    })

    it('Job information displayed properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/hire?tab=jobs').closeMenuIfOpen()

        .get('[data-cy=job]', { timeout: 120000 }).should('have.length', 2)
        .get(`[data-cy-job-slug=${jobs[1].slug}]`).within(() => {
          cy
            .get('[data-cy=job-header]')
            .should('contain', jobs[1].title)
            .get('[data-cy=job-location-text]').should('contain', 'Remote')
            .get('[data-cy=job-candidate-type-text]')
            .should('contain', 'Technology')
            .should('contain', 'Freelance')
            .get('[data-cy=job-hourly-rate-text]').should('contain', `$${jobs[1].min_client_rate_cents / 100} to $${jobs[1].client_rate_cents / 100}/hour`)
          if (Cypress.env('RUN_RESOLUTION') === 'MOBILE') {
            cy.get('[data-cy=job-hourly-rate-text]').should('contain', `${jobs[1].project_length_in_months} months`)
          }
          cy.get('[data-cy=job-annual-compensation-text]').should('not.exist')
          if (Cypress.env('RUN_RESOLUTION') !== 'MOBILE') {
            cy.get('[data-cy=job-project-duration-text]').should('contain', `${jobs[1].project_length_in_months} months`)
          }
        })
        .get(`[data-cy-job-slug=${jobs[2].slug}]`).within(() => {
          cy.get('[data-cy=job-annual-compensation-text]')
            .should('contain', `$${jobs[2].min_annual_compensation_cents / 100000}k to $${jobs[2].max_annual_compensation_cents / 100000}k/year`)
        })
    })

    it('Job actions work', () => {
      cy
        .login(clients[1].email, clients[1].password)

        // Sometimes the test fails like this without the waits: https://app.shippable.com/github/flexhire/flexhire-react/runs/6655/1/tests
        // TODO: Figure out why, and remove the waits.

        .visit('/client/hire?tab=jobs').closeMenuIfOpen()
        .wait(2000)
        .get(`[data-cy-job-slug=${jobs[1].slug}] [data-cy=view-job]`).click()
        .currentURL().should('equal', `/${firmSlug}/${jobs[1].slug}`)

        .openMenuIfClosed()
        .get('[data-cy=client-hire-overview]').first().click()
        .wait(1000)
        .get('[data-cy=hire-overview-jobs]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .wait(2000)
        .get(`[data-cy-job-slug=${jobs[1].slug}] [data-cy=edit-job]`).first().click()
        .currentURL().should('equal', `/client/job/${jobs[1].slug}`)

        .openMenuIfClosed()
        .get('[data-cy=hire-overview-jobs]').first().click()
        .wait(1000)
        .closeMenuIfOpen()
        .wait(2000)

        // TODO: there are no candidates for this job fixture, which makes the button disabled, failing the test
        // Add candidates to this job and re-enable this test
        // .get(`[data-cy-job-slug=${jobs[1].slug}] [data-cy=view-candidates]`).first().click()
        // .wait(5000) // without the wait the following checks run too fast
        // .currentURL().should('equal', '/client/hire')
        // .queryParams().should('deep.equal', { job: jobs[1].slug, tab: 'potential' })
    })

    after(() => {
      cy.callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
    })
  })

  describe('Closing jobs', () => {
    beforeEach(() => {
      cy.callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
    })

    it('Job can be closed from jobs page', () => {
      cy
        .login(clients[1].email, clients[1].password)

        // Sometimes the test fails like this without the waits: https://app.shippable.com/github/flexhire/flexhire-react/runs/6655/1/tests
        // TODO: Figure out why, and remove the waits.

        .visit('/client/hire?tab=jobs').closeMenuIfOpen()
        .wait(2000)
        .get(`[data-cy-job-slug=${jobs[1].slug}] [data-cy=delete-job]`).click({ force: true }) // otherwise fails on CI
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('.snackbar-open').should('contain', 'Job closed')
    })

    it('Job can be closed from edit job page', () => {
      cy
        .login(clients[1].email, clients[1].password)

        // Sometimes the test fails like this without the waits: https://app.shippable.com/github/flexhire/flexhire-react/runs/6655/1/tests
        // TODO: Figure out why, and remove the waits.

        .visit(`/client/job/${jobs[1].slug}`).closeMenuIfOpen()
        .wait(4000)
        .get('[data-cy=job-details]').click()
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .wait(1000)
        .get('[data-cy=job-actions]', { timeout: 120000 }).first().click()
        .wait(1000)
        .get('[data-cy=delete-job]', { timeout: 120000 }).first().click()
        .wait(1000)
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('.snackbar-open').should('contain', 'Job closed')
        .currentURL().should('equal', '/client/hire')
        .queryParams().should('deep.equal', { tab: 'jobs' })
    })

    afterEach(() => {
      cy.callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
  })
})
