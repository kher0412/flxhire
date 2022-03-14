import { clients } from '../../../fixtures/client'
import { freelancer2, freelancer4, freelancer4Profile, freelancer2Profile } from '../../../fixtures/freelancer'
import { jobs } from '../../../fixtures/jobs'
import { skills } from '../../../fixtures/skills'
import { jobQuestions } from '../../../fixtures/questions'
import { jobProjects } from '../../../fixtures/projects'
import { educations, positions } from '../../../fixtures/timeline_entries'
import { institutes } from '../../../fixtures/institutes'
import { newFreelancer } from '../../../fixtures/freelancer_signup'
import { freelancerTypes } from '../../../fixtures/freelancer_types'
import { freelancerSubtypes } from '../../../fixtures/freelancer_subtypes'

describe('Freelancer Jobs as an existing user', () => {
  beforeEach(() => {
    cy
      .callTestAPI('delete_data', { model: 'Job', params: { title: jobs[0].title } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer2.id } })
      .callTestAPI('delete_data', { model: 'Contract', method: 'delete_all', params: { freelancer_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Question', params: { id: jobQuestions[0].id } })
      .callTestAPI('delete_data', { model: 'Project', params: { id: jobProjects[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[1].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
      .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[1].id } })
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: educations[0].id } })
      .callTestAPI('delete_data', { model: 'TimelineEntry', params: { id: positions[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[1] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
      .callTestAPI('create_data', { model: 'Skill', params: skills[1] })
      .callTestAPI('create_user', clients[1])
      .callTestAPI('create_user', { ...freelancer2, video: null }) // create without video
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer2Profile, job_types: '{freelance}', freelancer_type_id: freelancerTypes[0].id } })
      .login(freelancer2.email, freelancer2.password)
  })

  function apply() {
    return cy
      .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Job application sent!')
      // check that the button turns to "Already Applied"
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
      // check that "Already Applied" is there after reload
      .visit(`/job/${jobs[0].slug}`)
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  }

  it('screened freelancer can apply to public job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id, freelancer_type_id: freelancerTypes[0].id },
      })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .wait(1000) // avoid nothing happens when clicking too fast
      .get('[data-cy=apply-for-job]').first().click()
    apply()
  })

  it('existing user with opportunity notification can apply to public job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id, freelancer_type_id: freelancerTypes[0].id },
      })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', {
        model: 'Contract',
        params: {
          job_id: jobs[0].id,
          freelancer_id: freelancer2.id,
          client_id: clients[1].id,
          status: 'job_application_invited',
        },
      })
      .visit(`/job/${jobs[0].slug}`)
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name) // need to wait for the user/login process to finish
      .wait(1000) // avoid nothing happens when clicking too fast
      .get('[data-cy=apply-for-job]').first().click()
    apply()
  })

  it('existing user with opportunity notification can auto-apply to public job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id, freelancer_type_id: freelancerTypes[0].id },
      })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', {
        model: 'Contract',
        params: {
          job_id: jobs[0].id,
          freelancer_id: freelancer2.id,
          client_id: clients[1].id,
          status: 'job_application_invited',
        },
      })
      .visit(`/job/${jobs[0].slug}?applying=true`)
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name) // need to wait for the user/login process to finish
    apply()
  })

  it('screened freelancer must accept to lower their rate to apply to low rate freelance job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id },
      })
      .callTestAPI('create_data', { model: 'User', params: { ...freelancer4, status: 'accepted' } })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, client_rate_cents: 10000, freelancer_rate_cents: 8000 } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer4.first_name)
      .wait(2000) // try fixing issue on CI
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=rate-message]')
      .should('contain', 'job offers a maximum hourly rate of $32')
      .should('contain', 'the rate on your profile of $80')
      .get('[data-cy=confirm]').click()
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
      .get('[data-cy=freelancer-navigation-profile]').click()
      .get('[data-cy=freelancer-rate]', { timeout: 120000 }).should('contain', '$32')
  })

  it('screened freelancer must accept to lower their annual compensation to apply to low compensation job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], user_id: clients[1].id, position_types: '{permanent}' },
      })
      .callTestAPI('create_data', { model: 'User', params: { ...freelancer4, status: 'accepted' } })
      .callTestAPI('create_data', { model: 'Profile', params: { ...freelancer4Profile, annual_compensation_cents: 10000000 } })
      .login(freelancer4.email, freelancer4.password)
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer4.first_name)
      .wait(2000) // try fixing issue on CI
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=compensation-message]')
      .should('contain', 'job offers an annual compensation of $67,584')
      .should('contain', 'preference of $100,000')
      .get('[data-cy=confirm]').click()
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
      .get('[data-cy=freelancer-navigation-profile]').click()
      .get('[data-cy=freelancer-annual-compensation]', { timeout: 120000 }).should('contain', '$67,584')
  })

  it('existing unverified freelancer can apply to public job', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], freelancer_type_id: freelancerTypes[0].id, user_id: clients[1].id },
      })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'unverified',
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
    apply()
  })

  // TODO: test might fail on CI due to element detached on the profile's name field (textarea). Add wait?
  it('existing freelancer is redirected to job application after updating profile', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: { ...jobs[0], freelancer_type_id: freelancerTypes[0].id, user_id: clients[1].id },
      })
      .callTestAPI('create_data', { model: 'Contract', params: { client_id: clients[1].id, freelancer_id: freelancer2.id, job_id: jobs[0].id, status: 'job_application_draft' } })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .visit('/profile')
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]', { timeout: 30000 }).should('contain', freelancer2.first_name)
      // Edit something in the profile
      .wait(500)
      .get('[data-cy=profile-name-edit]').click()
      .wait(500)
      .get('[data-cy=profile-name-field]').clear().type(`${freelancer4.first_name} ${freelancer4.last_name}2`).blur()
      .wait(1000)
      .get('[data-cy=save-and-continue]').click()
    apply()
  })

  it('existing user must match position type', () => {
    cy
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', {
        model: 'Project',
        params: jobProjects[0],
      })
      .callTestAPI('create_data', {
        model: 'Job',
        params: {
          ...jobs[0],
          user_id: clients[1].id,
          freelancer_type_id: freelancerTypes[0].id,
          position_types: '{permanent}',
          min_client_rate_cents: 3000,
          client_rate_cents: 5000,
        },
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=position-type-message]').should('exist')
      .get('[data-cy=position-type-message]').should('contain', 'This job is a permanent position')
      .get('[data-cy=position-type-message]').should('contain', 'your profile is set to accept freelance work only')
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=profile-rate-edit]', { timeout: 30000 }).click()
      .get('[data-cy=profile-job-type]').click()
      .get('[data-cy=profile-job-type-both]').click()
      .get('[data-cy=textfield-annual_compensation] input').clear().type('40000')
      .get('[data-cy=profile-rate-close]').click()
      .wait(3000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  })

  it('existing user must match industry', () => {
    cy
      .callTestAPI('create_data', {
        model: 'Job',
        params: {
          ...jobs[0],
          freelancer_type_id: freelancerTypes[1].id,
          user_id: clients[1].id,
        },
      })
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', {
        model: 'Project',
        params: jobProjects[0],
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=industry-type-message]').should('exist')
      .get('[data-cy=industry-type-message]').should('contain', `This job is a ${freelancerTypes[1].name} industry position`)
      .get('[data-cy=industry-type-message]').should('contain', `your profile is set to the ${freelancerTypes[0].name} industry`)
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=profile-freelancer-type-edit]', { timeout: 30000 }).click()
      .wait(1000)
      .get(`[data-cy=freelancer-type-${freelancerTypes[1].slug}]`).click()
      .wait(3000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  })

  it('existing user must match location country', () => {
    cy
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', {
        model: 'Project',
        params: jobProjects[0],
      })
      .callTestAPI('create_data', {
        model: 'Job',
        params: {
          ...jobs[0],
          user_id: clients[1].id,
          freelancer_type_id: freelancerTypes[0].id,
          location_type: 'specific_countries',
          job_countries: ['it', 'fr'],
        },
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=location-message]').should('exist')
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=address-full_address] input', { timeout: 30000 }).clear().type('Milan')
      .wait(1000) // wait for suggestions to load
      .get('[data-cy=address-suggestion-0]', { timeout: 30000 })
      .should('contain', 'Italy')
      .click()
      .get('[data-cy=address-suggestion-0]').should('not.exist')
      .wait(3000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  })

  it('existing user must match location timezone', () => {
    cy
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', {
        model: 'Project',
        params: jobProjects[0],
      })
      .callTestAPI('create_data', {
        model: 'Job',
        params: {
          ...jobs[0],
          user_id: clients[1].id,
          freelancer_type_id: freelancerTypes[0].id,
          location_type: 'job_timezone',
          job_timezone: '(GMT+09:00) Tokyo',
          timezone_range: 1,
        },
      })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=location-message]').should('exist')
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=address-full_address] input', { timeout: 30000 }).clear().type('Tainan, Taiwan')
      .wait(1000) // wait for suggestions to load
      .get('[data-cy=address-suggestion-0]', { timeout: 30000 })
      .should('contain', 'Taiwan')
      .click()
      .get('[data-cy=address-suggestion-0]').should('not.exist')
      .wait(3000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
      .get('[data-cy=apply-for-job]').should('not.exist')
      .get('[data-cy=application-message]').should('exist')
  })

  it('existing user must match subtypes', () => {
    cy
      .callTestAPI('update_user', {
        email: freelancer2.email,
        status: 'accepted',
      })
      .callTestAPI('create_data', { model: 'FreelancerSubtype', params: freelancerSubtypes[0] })
      .callTestAPI('create_data', { model: 'UserSkill', params: { user_id: freelancer2.id, skill_id: skills[0].id, experience: 1 } })
      .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer2.id } })
      .callTestAPI('create_data', {
        model: 'Project',
        params: jobProjects[0],
      })
      .callTestAPI('create_data', {
        model: 'Job',
        params: {
          ...jobs[0],
          user_id: clients[1].id,
          freelancer_type_id: freelancerTypes[0].id,
        },
      })
      .callTestAPI('create_data', { model: 'JobSubtype', params: { job_id: jobs[0].id, freelancer_subtype_id: freelancerSubtypes[0].id } })
      .visit(`/job/${jobs[0].slug}`)
      // need to wait for the user/login process to finish
      .get('[data-cy=logged-in-name]').should('contain', freelancer2.first_name)
      .get('[data-cy=apply-for-job]').first().click()
      .get('[data-cy=freelancer-subtype-message]').should('exist')
      .get('[data-cy=confirm]').click()
      .wait(5000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=profile-specializations-edit]', { timeout: 30000 }).click()
      .get('[data-cy=profile-specialization-bot_maintenance] input').click()
      .get('[data-cy=profile-specializations-close]').click()
      .wait(3000) // hopefully it fixes a CI problem where the profile gives validation error
      .get('[data-cy=save-and-continue]').click()
      .currentURL().should('equal', `/${clients[1].firm_slug}/${jobs[0].slug}`)
      .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Job application sent!')
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
