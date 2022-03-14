/* eslint-disable indent */
import { clients } from '../fixtures/client'
import { freelancer2 } from '../fixtures/freelancer'
import { questions } from '../fixtures/questions'
import { jobs } from '../fixtures/jobs'

const NEW_QUESTION_TITLE = 'My Cypress Test Submitted Question'

describe('Questions Page', () => {
  function submitQuestion() {
    return cy
      .get('[data-cy=submit-dialog]').should('not.exist')
      .get('[data-cy=submit-question]').click()
      .get('[data-cy=submit-dialog]').should('exist')
      .get('[data-cy=textfield-title] input').type(NEW_QUESTION_TITLE)
      .get('[data-cy=textfield-description] textarea').type('Created in Cypress test')
      .get('[data-cy=submit-dialog]').click()
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Question Submitted')
  }

  function typeClientInfo() {
    return cy
      .get('[data-cy=textfield-input-email]').type(clients[2].email)
      .get('[data-cy=textfield-input-password]').type(clients[2].password)
      .get('[data-cy=textfield-input-password_confirmation]').type(clients[2].password)

      .get('[data-cy=textfield-input-first_name]').type(clients[2].first_name)
      .get('[data-cy=textfield-input-last_name]').type(clients[2].last_name)
      .get('[data-cy=textfield-input-phone]').type(clients[2].phone)
      .get('[data-cy=textfield-input-companyName]').type(clients[2].company_name)
      .get('[data-cy=agree-to-terms]').click()
  }

  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'Question', params: { title: questions[1].title } })
      .callTestAPI('delete_data', { model: 'Question', params: { title: NEW_QUESTION_TITLE } })
      .callTestAPI('create_data', { model: 'Question', params: questions[1] })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
  })

  describe('as Guest', () => {
    it('goes through signup job flow when clicking Post a Job', () => {
      cy.visit('/interview_questions')
        .get('[data-cy=post-a-job]').click()
        .currentURL().should('equal', '/signup/client')
    })

    it('can submit a question', () => {
      cy.visit('/interview_questions')
      submitQuestion()
    })

    it('can use question for a new job', () => {
      cy
        .visit('/interview_questions')
        .get(`[data-cy=use-question-${questions[1].id}]`).click()
        .currentURL().should('equal', '/signup/client')
        typeClientInfo()
        .get('[data-cy=submit]').click()

        .currentURL().should('equal', '/confirm_email')
        .confirmEmail({ email: clients[2].email })
        .wait(2000)

        .currentURL().should('equal', '/client/job/add_job/job')
        //.get('[data-cy=textfield-input-question-search]', { timeout: 60000 }).should('have.value', questions[1].title)
        //.get('[data-cy=result-0]').invoke('attr', 'data-cy-title').should('equal', questions[1].title)
    })

    it('goes to login page when answering a question', () => {
      cy
        .callTestAPI('create_screening_questions')
        .visit('/interview_questions')
        .get('[data-cy^=answer-question-').should('exist')
        .get('[data-cy^=answer-question-').first().click()
        .currentURL().should('equal', '/login')
    })
  })

  describe('as Client', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { title: NEW_QUESTION_TITLE } })
        .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
        .callTestAPI('create_user', clients[1])
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
    })

    it('goes through signup job flow when clicking Post a Job', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/interview_questions')
        .get('[data-cy=post-a-job]').click()
        .currentURL().should('equal', '/client/job/add_job/job')
    })

    it('can submit a question', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/interview_questions')
        submitQuestion()
    })

    it('can use question for a new job', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/interview_questions')
        .wait(5000) // in CI, without this wait, there is a problem with the use question button
        .get('[data-cy=submit-dialog]').should('not.exist')
        .get(`[data-cy=use-question-${questions[1].id}]`, { timeout: 60000 }).click()
        .get('[data-cy=submit-dialog]', { timeout: 120000 }).should('exist')
        .get('[data-cy=submit-dialog]').click()
        .currentURL().should('equal', '/client/job/add_job/job')
        // TODO: advance through job steps here and check if question is there on the screening page
        // .get('[data-cy=screening]').click()
        // .get('[data-cy=textfield-input-question-search]').should('have.value', questions[1].title)
        // .get('[data-cy=result-0]').invoke('attr', 'data-cy-title').should('equal', questions[1].title)
    })

    // TODO: this feature is broken. Fix the feature and re-enable the test
    it.skip('can use question for an existing job', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/interview_questions')
        .wait(5000) // in CI, without this wait, there is a problem with the use question button
        .get('[data-cy=submit-dialog]').should('not.exist')
        .get(`[data-cy=use-question-${questions[1].id}]`, { timeout: 60000 }).click()
        .get('[data-cy=submit-dialog]').should('exist')
        .get('[data-cy=select-job]').click()
        .get(`[data-cy=select-job-${jobs[1].slug}]`).click()
        .get('[data-cy=submit-dialog]').click()
        .currentURL().should('equal', `/client/job/${jobs[1].slug}`)
        .get('[data-cy=chipfield-input-job_skills]').first().type('PHP ', { delay: 250 }) // needed to pass validation
        .get('[data-cy=job-continue]').click()
        .get('.snackbar-open', { timeout: 60000 }).invoke('text').should('match', /Job.*Saved/gi)
        .wait(1000)
        .get('[data-cy=loading-overlay]').should('not.exist')
        .get('[data-cy=job-continue]', { timeout: 60000 }).click()
        .get('[data-cy=loading-overlay]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=textfield-input-question-search]').should('have.value', questions[1].title)
        .get('[data-cy=result-0]').invoke('attr', 'data-cy-title').should('equal', questions[1].title)
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[1].id } })
        .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
        .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
    })
  })

  describe('as Freelancer', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { title: NEW_QUESTION_TITLE } })
        .callTestAPI('delete_data', { model: 'User', params: { email: freelancer2.email } })
        .callTestAPI('destroy_screening_questions')
        .callTestAPI('create_user', freelancer2)
    })

    it('can submit a question', () => {
      cy
        .login(freelancer2.email, freelancer2.password)
        .visit('/interview_questions')
        submitQuestion()
    })

    it('can answer a question', () => {
      cy
        .login(freelancer2.email, freelancer2.password)
        .callTestAPI('create_screening_questions')
        .visit('/interview_questions')
        .get('[data-cy^=answer-question-').should('exist')
        // .get('[data-cy=video-uploading-message]').should('not.exist')
        .get('[data-cy^=answer-question-').first().click()
        .uploadVideo()
        // .get('[data-cy=video-uploading-message]').should('exist')
        // .get('[data-cy=video-uploading-message]').should('not.exist')
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Question', params: { title: NEW_QUESTION_TITLE } })
        .callTestAPI('delete_data', { model: 'User', params: { email: freelancer2.email } })
    })
  })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'Question', params: { id: questions[1].id } })
      .callTestAPI('delete_data', { model: 'Question', params: { title: NEW_QUESTION_TITLE } })
      .callTestAPI('destroy_screening_questions')
  })
})
