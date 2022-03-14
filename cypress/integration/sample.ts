import { freelancer6, freelancer6Profile } from '../fixtures/freelancer'
import { freelancerTypes } from '../fixtures/freelancer_types'
import { skills } from '../fixtures/skills'

describe('Sample talent', () => {
  before(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
      .callTestAPI('create_user', freelancer6)
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer6Profile, freelancer_type_id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer6.id, skill_id: skills[0].id, featured_skill: true } })
      .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id, freelancer_type_id: freelancerTypes[0].id, featured: true } })
  })

  describe('as Guest', () => {
    it('can view sample talent per skill', () => {
      cy
        .visit(`/sample/${freelancerTypes[0].slug}/${skills[0].slug}`)
        .currentURL().should('equal', `/sample/${freelancerTypes[0].slug}/${skills[0].slug}`)
        .get('[data-cy=top-freelancer]', { timeout: 120000 }).should('exist')
    })
  })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
  })
})
