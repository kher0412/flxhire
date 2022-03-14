import { slugify } from '../../support/services'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { skills } from '../../fixtures/skills'
import { freelancer2, freelancer2Profile } from '../../fixtures/freelancer'
import { freelancerTypes } from '../../fixtures/freelancer_types'

const firmSlugs = ['', slugify(clients[1].company_name), slugify(clients[2].company_name)] // Empty item is so the indexes match the jobs.

describe('Public Jobs Listing', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { slug: jobs[1].slug } })
      .callTestAPI('delete_data', { model: 'Job', params: { slug: jobs[2].slug } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer2.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { id: freelancer2Profile.id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })

      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_user', clients[2])
      .callTestAPI('create_user', freelancer2)
      .callTestAPI('create_data', { model: 'Profile', params: freelancer2Profile })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id, freelancer_type_id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[1].id, freelancer_type_id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'Skill', params: { ...skills[0] } })
      .callTestAPI('create_data', { model: 'Skill', params: { ...skills[1] } })
      .callTestAPI('create_data', { model: 'Skill', params: { ...skills[2] } })
  })

  describe('Visiting jobs listing as a guest', () => {
    it('Jobs are shown', () => {
      cy
        .visit(`/${firmSlugs[1]}`)
        .get('[data-cy=job-item').should('have.length', 2)
    })

    it('Clicking Apply on a job brings user to job page', () => {
      cy
        .visit(`/${firmSlugs[1]}`)
        .wait(3000) // avoid element detached
        .get('[data-cy=job-item] [data-cy=apply]').first().click()
        .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[2].slug}`)
    })
  })

  describe('Visiting jobs listing as a freelancer', () => {
    it('Jobs are shown', () => {
      cy
        .login(freelancer2.email, freelancer2.password)
        .visit(`/${firmSlugs[1]}`)
        .get('[data-cy=job-item').should('have.length', 2)
    })

    it('Clicking Apply on a job brings user to job page', () => {
      cy
        .login(freelancer2.email, freelancer2.password)
        .visit(`/${firmSlugs[1]}`)
        .wait(3000) // fix element detached error
        .get('[data-cy=job-item] [data-cy=apply]').first().click()
        .currentURL().should('equal', `/${firmSlugs[1]}/${jobs[2].slug}`)
    })
  })

  describe('Visiting jobs listing as the owner client', () => {
    it('Jobs are shown', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/${firmSlugs[1]}`)
        .get('[data-cy=job-item').should('have.length', 2)
    })

    it('Fake apply button shown', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/${firmSlugs[1]}/${jobs[2].slug}`)
        .get('[data-cy=apply-for-job-fake').should('have.length', 2)
    })

    it('Edit button is shown', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/${firmSlugs[1]}`)
        // Long timeout needed for CI
        .get('[data-cy=edit-jobs-listing]', { timeout: 120000 })
        .should('exist')
    })
  })

  describe('Visiting jobs listing as another client', () => {
    it('Jobs are shown', () => {
      cy
        .login(clients[2].email, clients[2].password)
        .visit(`/${firmSlugs[1]}`)
        .get('[data-cy=job-item').should('have.length', 2)
    })

    it('Edit button is NOT shown', () => {
      cy
        .login(clients[2].email, clients[2].password)
        .visit(`/${firmSlugs[1]}`)
        .get('[data-cy=edit-jobs-listing]').should('not.exist')
    })
  })

  describe('editing own job', () => {
    it('making changes should save', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit(`/${firmSlugs[1]}`)
        .wait(3000)
        .get('[data-cy=apply]').last().click()
        .wait(3000)
        .get('[data-cy=edit-job]').first().click()
        .wait(3000)
        .fillSimpleJobForm(jobs[2])
        .get('[data-cy=save-changes]').first().click()
        .wait(3000)
        .visit(`/${firmSlugs[1]}`)
        .wait(3000)
        .get('[data-cy=apply]').last().click()
        .wait(3000)
        .get('[data-cy=job-card-header]').last().should('contain', `${jobs[1].title}${jobs[2].title}`)
        .get('[data-cy=job-text-description]').last().should('contain', `${jobs[1].description}${jobs[2].description}`)
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { id: jobs[2].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { slug: jobs[1].slug } })
      .callTestAPI('delete_data', { model: 'Job', params: { slug: jobs[2].slug } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer2.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { id: freelancer2Profile.id } })
  })
})
