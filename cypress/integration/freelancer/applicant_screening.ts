/* eslint-disable max-len */
/* eslint-disable indent */
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { freelancer4, freelancer4Profile } from '../../fixtures/freelancer'
import { jobApplications } from '../../fixtures/contracts'
import { questions } from '../../fixtures/questions'
import { customProjects, projects } from '../../fixtures/projects'

describe('Job Applicant Screening', () => {
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

      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_user', clients[2])
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[2].id } })
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
  })

  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id } })
      .callTestAPI('create_data', { model: 'Contract', params: { ...jobApplications[0], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Video', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'ProjectSubmission', params: { user_id: freelancer4.id } })
  })

  function accept() {
    return cy
      .wait(1000) // avoid element detached
      .get('[data-cy=accept]').click()
      .get('[data-cy=accept]').should('contain', 'Accepted')
  }

  function answerQuestions() {
    return cy
      .get(`[data-cy=answer-question-video-${questions[0].id}]`).click()
      .uploadVideo()
      .get(`[data-cy=answer-question-video-${questions[0].id}][data-uploading=true]`) // wait for upload to start
      .get(`[data-cy=answer-question-video-${questions[0].id}][data-uploading=false]`, { timeout: 120000 }) // wait for upload to finish
  }

  function fillInCodeTestForm() {
    return cy
      .get('[data-cy=textfield-input-url]').type(customProjects[0].url)
      .get('[data-cy=textarea-description]').type(customProjects[0].description)
  }

  function finish() {
    return cy
      .get('[data-cy=finish]').should('not.be.disabled')
      .get('[data-cy=finish]').click()
      .get('.snackbar-open', { timeout: 30000 }).should('contain', `Thank you! ${clients[1].first_name} from ${clients[1].company_name} will be notified`)
      .currentURL().should('equal', '/member/dashboard')
  }

  it('Client video intro request can be answered', () => {
    cy
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, request_type: 'video_introduction' } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/applicant_screening/${jobApplications[0].id}`)
      accept()
      .get('[data-cy=answer-video-introduction]').should('exist')
      .get('[data-cy=continue]').should('not.exist')
      .get('[data-cy=finish]').should('be.disabled')
      .get('[data-cy=answer-video-introduction]').click()
      .uploadVideo()
      .get('[data-cy=answer-video-introduction][data-uploading=true]') // wait for upload to start
      .get('[data-cy=answer-video-introduction][data-uploading=false]', { timeout: 120000 }) // wait for upload to finish
      finish()
  })

  it('Client screening question can be answered', () => {
    cy
      .callTestAPI('create_data', { model: 'Question', params: questions[0] })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, question_id: questions[0].id, request_type: 'answer' } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/applicant_screening/${jobApplications[0].id}`)
      accept()
      .get(`[data-cy=answer-question-video-${questions[0].id}]`).should('exist')
      .get('[data-cy=continue]').should('not.exist')
      .get('[data-cy=finish]').should('be.disabled')
      answerQuestions()
      finish()
  })

  it('Client code test can be submitted', () => {
    cy
      .callTestAPI('create_data', { model: 'Project', params: projects[0] })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, project_id: projects[0].id, request_type: 'project_submission' } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/applicant_screening/${jobApplications[0].id}`)
      accept()
      fillInCodeTestForm()
      finish()
  })

  it('questions and code test can be completed together', () => {
    cy
      .callTestAPI('create_data', { model: 'Project', params: projects[0] })
      .callTestAPI('create_data', { model: 'Question', params: questions[0] })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, project_id: projects[0].id, request_type: 'project_submission' } })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, question_id: questions[0].id, request_type: 'answer' } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/applicant_screening/${jobApplications[0].id}`)
      accept()
      answerQuestions()
      .wait(1000) // clicking continue too fast does not work
      .get('[data-cy=continue]').should('exist')
      .get('[data-cy=finish]').should('not.exist')
      .get('[data-cy=continue]').click()
      fillInCodeTestForm()
      finish()
  })

  it('questions and code test can be rejected', () => {
    cy
      .callTestAPI('create_data', { model: 'Project', params: projects[0] })
      .callTestAPI('create_data', { model: 'Question', params: questions[0] })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, project_id: projects[0].id, request_type: 'project_submission' } })
      .callTestAPI('create_data', { model: 'ContractRequest', params: { contract_id: jobApplications[0].id, question_id: questions[0].id, request_type: 'answer' } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/applicant_screening/${jobApplications[0].id}`)
      .wait(1000) // avoid element detached
      .get('[data-cy=reject]').click()
      .get('[data-cy=textarea-message]').clear().type('Sorry about it')
      .get('[data-cy=submit]').click()
      .get('.snackbar-open', { timeout: 30000 }).should('contain', `Your feedback has been sent to ${clients[1].first_name}`)
      .currentURL().should('equal', '/member/dashboard')
  })

  afterEach(() => {
    cy.callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
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
      .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0] } })
  })
})
