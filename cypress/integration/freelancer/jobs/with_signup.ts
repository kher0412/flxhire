/* eslint-disable indent */
import { slugify } from '../../../support/services'
import { clients } from '../../../fixtures/client'
import { freelancer2, freelancer4, freelancer2Profile } from '../../../fixtures/freelancer'
import { jobs } from '../../../fixtures/jobs'
import { skills } from '../../../fixtures/skills'
import { jobQuestions } from '../../../fixtures/questions'
import { jobProjects } from '../../../fixtures/projects'
import { educations, positions } from '../../../fixtures/timeline_entries'
import { institutes } from '../../../fixtures/institutes'
import { newFreelancer } from '../../../fixtures/freelancer_signup'
import { freelancerTypes } from '../../../fixtures/freelancer_types'
import { fillOutProfile, uploadAvatar } from '../../../common/profile'

describe('Freelancer Jobs as new user', () => {
  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'Job', params: { title: jobs[0].title } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer2.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Question', params: { id: jobQuestions[0].id } })
      .callTestAPI('delete_data', { model: 'Project', params: { id: jobProjects[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: educations[0].id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: positions[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[1] })
      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_user', { ...freelancer2, video: null }) // create without video
      .callTestAPI('create_data', { model: 'Profile', params: freelancer2Profile })
      .login(freelancer2.email, freelancer2.password)
  })

  it('new user with incompatible profile must adjust profile to apply from jobs listing', () => {
    cy
      .callTestAPI('delete_user', { email: newFreelancer.email })
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id, min_client_rate_cents: 3000, client_rate_cents: 3000 },
      })
      .logout()
      .visit(`/${slugify(clients[1].company_name)}`)
      .wait(3000) // avoid element is detached issue
      .get('[data-cy=job-item]').first().click()
      .get('[data-cy=job-header]').should('contain', jobs[0].title) // Wait for load.
      .get('[data-cy=apply-for-job]').first().click()
      .currentURL().should('match', /^\/signup\/member/)
      .queryParams().should('deep.equal', {
        job: jobs[0].slug,
      })
      .get('[data-cy=agree-to-terms]').click()
      .get('[data-cy=textfield-input-email]').type(newFreelancer.email)
      .get('[data-cy=textfield-input-password]').type(newFreelancer.password)
      .get('[data-cy=confirm-password] input').type(newFreelancer.password)
      .get('[data-cy=textfield-input-first_name]').type(newFreelancer.first_name)
      .get('[data-cy=textfield-input-last_name]').type(newFreelancer.last_name)
      .get('[data-cy=submit]').click()
      .confirmEmail(newFreelancer)
      .currentURL().should('equal', '/profile')
      .get('[data-cy=complete-profile-for-job-message]').should('exist')
    fillOutProfile()
    uploadAvatar()
    cy.get('[data-cy=open-video-introduction]').should('not.exist')
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('[data-cy=rate-message]')
        .should('contain', 'job offers a maximum hourly rate of $24')
        .should('contain', 'the rate on your profile of $30')
      .get('[data-cy=confirm]').click()
      // .get('.snackbar-open').should('contain', 'Job application sent!') // TODO: unreliable, fails randomly, fix and re-enable (also tested on next line)
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
      .get('[data-cy=freelancer-navigation-profile]').click()
      .currentURL().should('equal', '/profile')
      .get('[data-cy=freelancer-rate]', { timeout: 120000 }).should('contain', '$24')
  })

  it('new user without required skill cannot apply, must manually update own profile', () => {
    cy
      .callTestAPI('delete_user', { email: newFreelancer.email })
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id },
      })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[0].id, job_id: jobs[0].id, required: true } })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: skills[1].id, job_id: jobs[0].id } })
      .callTestAPI('create_data', { model: 'SkillFreelancerType', params: { skill_id: skills[0].id, freelancer_type_id: jobs[0].freelancer_type_id } })
      .logout()
      .visit(`/${slugify(clients[1].company_name)}`)
      .wait(3000) // fix element detached in CI
      .get('[data-cy=job-item]').first().click()
      .get('[data-cy=job-header]').should('contain', jobs[0].title) // Wait for load.
      .get('[data-cy=apply-for-job]').first().click()
      .currentURL().should('match', /^\/signup\/member/)
      .queryParams().should('deep.equal', {
        job: jobs[0].slug,
      })
      .get('[data-cy=agree-to-terms]').click()
      .get('[data-cy=textfield-input-email]').type(newFreelancer.email)
      .get('[data-cy=textfield-input-password]').type(newFreelancer.password)
      .get('[data-cy=confirm-password] input').type(newFreelancer.password)
      .get('[data-cy=textfield-input-first_name]').type(newFreelancer.first_name)
      .get('[data-cy=textfield-input-last_name]').type(newFreelancer.last_name)
      .get('[data-cy=submit]').click()
      .confirmEmail(newFreelancer)
      .currentURL().should('equal', '/profile')
      .get('[data-cy=complete-profile-for-job-message]').should('exist')
    fillOutProfile()
    uploadAvatar()
    cy.get('[data-cy=open-video-introduction]').should('not.exist')
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('[data-cy=skills-message]').should('exist')
      .get('[data-cy=skills-details]').should('exist')
      .get(`[data-cy=skill-mismatch-${skills[0].name}]`).should('exist')
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=profile-skills-edit]').click()
      .get('[data-cy=chipfield-input-user_skills]').type(`${skills[0].name} `)
      .get(`[data-cy=experience-slider-${skills[0].name}-error]`).should('exist')
      // triggering a change or event or altering the value on the hidden input element does not work
      // so even though it's wacky, we simulate a click on the far right end of the slider
      .get(`[data-cy=experience-slider-${skills[0].name}] > span > span:first-child`).click('topRight')
      .get(`[data-cy=experience-slider-${skills[0].name}-error]`, { timeout: 12000 }).should('not.exist')
      .wait(1000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=profile-skills-close]').click()
      .wait(1000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .queryParams().should('deep.equal', { applying: 'true' })
      // .get('.snackbar-open').should('contain', 'Job application sent!') // TODO: unreliable, fails randomly, fix and re-enable (also tested on next line)
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  })

  after(() => {
    cy
    .callTestAPI('delete_data', { model: 'Job', params: { title: jobs[0].title } })
    .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
    .callTestAPI('delete_data', { model: 'User', params: { email: newFreelancer.email } })
    .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
    .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
    .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
    .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0] } })
    .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: educations[0].id } })
    .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: positions[0].id } })
  })
})
