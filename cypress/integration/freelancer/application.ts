import { clients } from '../../fixtures/client'
import { freelancer4, freelancer4Profile } from '../../fixtures/freelancer'
import { references } from '../../fixtures/references'
import { customProjects, screeningProjects } from '../../fixtures/projects'
import { freelancerTypes } from '../../fixtures/freelancer_types'
import { freelancerSubtypes } from '../../fixtures/freelancer_subtypes'
import { questions } from '../../fixtures/questions'
import { screeningInterviews } from '../../fixtures/screening_interviews'

describe('Freelancer Application (Profile Verification)', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'ScreeningInterview', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'ScreeningInterview', params: { status: 'available' } })
      .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Project', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Reference', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Video', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'ProfileSubtype', params: { profile_id: freelancer4Profile.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[1].id } })
      .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[0].id } })
      .callTestAPI('delete_data', { model: 'Question', params: { title: questions[0].title } })
      .callTestAPI('delete_data', { model: 'Question', params: { title: questions[1].title } })
      .callTestAPI('delete_data', { model: 'FreelancerSubtype', params: { freelancer_type_id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
  })

  beforeEach(() => {
    cy.login(freelancer4.email, freelancer4.password)
  })

  function completeFirstSteps() {
    it('Step 1: Video Introduction', () => {
      cy
        .visit('/application/introduction')
        .wait(3000) // try fixing bug on CI
        .get('[data-cy=open-video-introduction]').first().click()
        .uploadVideo()
        // Wait for video upload to start and end
        .get('[data-cy=video-uploading-message]', { timeout: 120000 }).should('exist')
        .get('[data-cy=video-uploading-message]', { timeout: 120000 }).should('not.exist')
        .currentURL().should('equal', '/application/introduction')
        .wait(3000) // if we click too fast it does not work
        .get('[data-cy=continue]:not(:disabled)', { timeout: 120000 }).click()
        .currentURL().should('equal', '/application/references')
    })

    it('Step 2: References', () => {
      for (let i = 0; i < 2; ++i) {
        cy
        .visit('/application/references')
        .currentURL().should('equal', '/application/references')
        .get('[data-cy=textfield-input-name]').type(references[i].name)
        .get('[data-cy=textfield-input-email]').type(references[i].email)
        .get('[data-cy=send-reference]').click()
        .get('[data-cy=reference-table-body] [data-cy=row]').should('have.length', i + 1)
        .get(`[data-cy=reference-table-body] [data-cy=row]:eq(${i})`).then(() => {
          cy
            .get('[data-cy=name]').should('contain', references[i].name)
            .get('[data-cy=email]').should('contain', references[i].email)
            .get('[data-cy=status]').should('contain', 'pending')
        })
      }

      /*
      // TODO: This should be moved to a separate test where we precreate the references with known tokens so we don't need to touch the Redux store.
      // TODO: This part is important because it verifies references can be completed
      .getReduxState(state => cy
        .callTestAPI('get_references', { email: freelancer.email })
        .its('body')
        .each((r, i) => {
          const userId = state.auth.currentUser.id
          const rData = referenceData[i]
          const uri = `/complete_reference?user_id=${userId}&complete_reference_token=${r.complete_reference_token}`
          return cy.visit(uri)
            .get('[data-cy=textfield-name] input').type(rData.name)
            .get('button[type=submit]').click()
            .wait(1000)
            .currentURL().should('equal', '/reference_submitted')
        }))
      .login(freelancer.email, freelancer.password)
      .visit('/application/references') */

      cy
        .get('[data-cy=continue]', { timeout: 5000 }).click()
        .currentURL().should('equal', '/application/interview')
    })
  }

  function completeAndSubmitApplication() {
    return cy.window()
      .get('[data-cy=submit]:not(:disabled)', { timeout: 120000 }).click()
      .get('[data-cy=notification-title]', { timeout: 120000 }).should('contain', 'Thank you')
  }

  describe('Provide video and references only', () => {
    xit('todo')
  })

  describe('Provide video and references with a project', () => {
    before(() => {
      cy
        .callTestAPI('create_data', { model: 'FreelancerSubtype', params: freelancerSubtypes[0] })
        .callTestAPI('create_data', { model: 'FreelancerSubtype', params: freelancerSubtypes[1] })
        .callTestAPI('create_user', { ...freelancer4, status: 'applying' })
        .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, freelancer_type_id: freelancerTypes[0].id } })
        .callTestAPI('create_data', { model: 'ProfileSubtype', params: { id: 50000, profile_id: freelancer4Profile.id, freelancer_subtype_id: freelancerSubtypes[0].id } })
        .callTestAPI('create_data', { model: 'ProfileSubtype', params: { id: 50001, profile_id: freelancer4Profile.id, freelancer_subtype_id: freelancerSubtypes[1].id } })
    })

    completeFirstSteps()

    // NOTE: this tesk is flaky, often fails on CI
    it.skip('Step 3: Skills (submit with project)', () => {
      cy
        .get('[data-cy=submit]', { timeout: 120000 }).should('be.disabled')
        .get('[data-cy=textfield-input-title]', { timeout: 120000 }).type(customProjects[0].title)
        .get('[data-cy=textfield-input-url]').type(customProjects[0].url)
        .get('[data-cy=textarea-description]').type(customProjects[0].description)
        .get('[data-cy=save-project]').click()
        .get('.snackbar-open').should('contain', 'Project Saved')
      completeAndSubmitApplication()
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Project', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Reference', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Video', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'ProfileSubtype', params: { profile_id: freelancer4Profile.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[1].id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[0].id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtype', params: { freelancer_type_id: freelancerTypes[0].id } })
    })
  })

  describe('Provide video and references with question answers', () => {
    before(() => {
      cy
        .callTestAPI('create_user', clients[2])
        .callTestAPI('create_data', { model: 'FreelancerSubtype', params: freelancerSubtypes[0] })
        .callTestAPI('create_data', { model: 'FreelancerSubtype', params: freelancerSubtypes[1] })
        .callTestAPI('create_data', { model: 'Question', params: { ...questions[0] } })
        .callTestAPI('create_data', { model: 'Question', params: { ...questions[1] } })
        .callTestAPI('create_data', { model: 'FreelancerSubtypeQuestion', params: { freelancer_subtype_id: freelancerSubtypes[0].id, question_id: questions[0].id, screening: true } })
        .callTestAPI('create_data', { model: 'FreelancerSubtypeQuestion', params: { freelancer_subtype_id: freelancerSubtypes[1].id, question_id: questions[1].id, screening: true } })
        .callTestAPI('create_user', { ...freelancer4, status: 'applying' })
        .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, freelancer_type_id: freelancerTypes[0].id } })
        .callTestAPI('create_data', { model: 'ProfileSubtype', params: { id: 50000, profile_id: freelancer4Profile.id, freelancer_subtype_id: freelancerSubtypes[0].id } })
        // We don't associate the profile with the second subtype because that would trigger the project requirement
    })

    completeFirstSteps()

    // NOTE: this tesk is flaky, often fails on CI
    it.skip('Step 3: Skills (submit with answers)', () => {
      cy
        .visit('/application/interview')
        .get('[data-cy=submit]', { timeout: 120000 }).should('be.disabled')
        // Answer questions
        .get('[data-cy^=answer-question-video-').each((item) => {
          return cy
            .wrap(item)
              .click()
              .uploadVideo()
        })
        completeAndSubmitApplication()
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Video', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Reference', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'ProfileSubtype', params: { profile_id: freelancer4Profile.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[1].id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtypeQuestion', params: { id: freelancerSubtypes[0].id } })
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[1].id } })
        .callTestAPI('delete_data', { model: 'FreelancerSubtype', params: { freelancer_type_id: freelancerTypes[0].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
    })
  })

  describe('Interview scheduling', () => {
    before(() => {
      cy
        .callTestAPI('create_user', { ...freelancer4, status: 'interview' })
        .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, freelancer_type_id: freelancerTypes[0].id } })
    })

    it('Can book an interview', () => {
      cy
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: screeningInterviews[0] })
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: screeningInterviews[1] })
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: screeningInterviews[2] })
        .visit('/application/interview')
        // Make sure the third slot in the list is correct
        .get('[data-cy=interviews-starts-2]').invoke('text').should('match', /\d days$/)
        // Book it
        .get('[data-cy=interviews-book-2]').click(Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? { force: true } : null) // @TODO Table is not responsive so the button overflows outside of the window so it has to be force clicked until the layout gets fixed.
        .get('[data-cy=confirm-dialog-confirm]').click()
        // Verify that it's booked
        .get('[data-cy=current-slot-booked]')
        .visit('/application/interview')
        .get('[data-cy=current-slot-booked]').should('exist')
    })

    it('Can postpone an interview', () => {
      cy
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: { ...screeningInterviews[0], status: 'booked', user_id: freelancer4.id } })
        .visit('/application/interview')
        .get('[data-cy=postpone]').click()
        .get('[data-cy=confirm-dialog-confirm]').click()
        // Verify that it's postponed
        .get('[data-cy=current-slot-postponed]')
        .visit('/application/interview')
        .get('[data-cy=current-slot-postponed]')
    })

    it('Can book another interview after postponing', () => {
      cy
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: { ...screeningInterviews[0], status: 'postponed', user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'ScreeningInterview', params: screeningInterviews[1] })
        .visit('/application/interview')
        // Verify that it's postponed
        .get('[data-cy=current-slot-postponed]')
        // Book new one
        .get('[data-cy=interviews-book-0]').click(Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? { force: true } : null) // @TODO Table is not responsive so the button overflows outside of the window so it has to be force clicked until the layout gets fixed.
        .get('[data-cy=confirm-dialog-confirm]').click()
        // Verify that it's booked
        .get('[data-cy=current-slot-booked]')
        .visit('/application/interview')
        .get('[data-cy=current-slot-booked]')
    })

    afterEach(() => {
      cy
        .callTestAPI('delete_data', { model: 'ScreeningInterview', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'ScreeningInterview', params: { status: 'available' } })
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
    })
  })

  describe('Screening assignments', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[0].id } })
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[1].id } })
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[2].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[0].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[1].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[2].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'Project', params: screeningProjects[0] })
        .callTestAPI('create_data', { model: 'Project', params: screeningProjects[1] })
        .callTestAPI('create_data', { model: 'Project', params: screeningProjects[2] })
        .callTestAPI('create_user', { ...freelancer4, status: 'applying' })
    })

    it('Can view screening assignments', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit('/application/assignments')
        .get(`[data-cy=view-assignment-${screeningProjects[0].id}`).should('contain', screeningProjects[0].title)
        .get(`[data-cy=view-assignment-${screeningProjects[1].id}`).should('contain', screeningProjects[1].title)
        .get(`[data-cy=view-assignment-${screeningProjects[2].id}`).should('contain', screeningProjects[2].title)
        .get(`[data-cy=view-assignment-${screeningProjects[2].id}`).should('contain', screeningProjects[2].title)
        .get(`[data-cy=assignment-${screeningProjects[0].id}-description`).should('not.exist')
        .get(`[data-cy=view-assignment-${screeningProjects[0].id}`).click()
        .get(`[data-cy=assignment-${screeningProjects[0].id}-description`, { timeout: 60000 }).should('exist')
        .currentURL().should('equal', `/application/assignments/${screeningProjects[0].id}`)
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[0].id } })
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[1].id } })
        .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { project_id: screeningProjects[2].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[0].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[1].id } })
        .callTestAPI('delete_data', { model: 'Project', params: { id: screeningProjects[2].id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
    })
  })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
  })
})
