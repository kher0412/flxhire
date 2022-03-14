import { pick } from 'lodash'
import { skipOnCI } from '../../support/services'
import { institutes } from '../../fixtures/institutes'
import { freelancer4, freelancer4Profile, freelancer3, freelancer3Profile } from '../../fixtures/freelancer'
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { offers } from '../../fixtures/contracts'
import { educations, positions } from '../../fixtures/timeline_entries'
import { skills } from '../../fixtures/skills'
import { questions } from '../../fixtures/questions'
import { freelancerTypes } from '../../fixtures/freelancer_types'
import { fillOutProfile, SKILLS } from '../../common/profile'

describe('Freelancer Profile', () => {
  before(() => {
    cy
      .callTestAPI('delete_data', { model: 'Institute', params: { id: institutes[0].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer4.email } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: freelancer3.email } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
      .callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
      .callTestAPI('create_data', { model: 'FreelancerType', params: freelancerTypes[0] })
  })

  beforeEach(() => {
    cy.login(freelancer4.email, freelancer4.password)
  })

  describe('Profile Creation Process', () => {
    before(() => {
      cy
        .callTestAPI('create_user', { params: pick(freelancer4, ['id', 'email', 'password', 'roles', 'avatar_url', 'confirmed_at', 'hidden']), method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: pick(freelancer4Profile, ['user_id']) })
        .callTestAPI('create_user', { params: freelancer3, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer3Profile })
    })

    beforeEach(() => {
      cy.login(freelancer4.email, freelancer4.password)
    })

    it('Profile is private', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit('/')
        .wait(1000)
        .menuNavigateTo('freelancer-navigation-profile')
        // Check that "Profile is private until submitted" message is displayed to user
        .get('[data-cy=private-profile] [data-cy=info-message]', { timeout: 120000 }).should('contain', 'Your profile will not be publicly visible until you submit it')
        // Check that profile really is private
        .getReduxState((state) => {
          const slug = state.auth.currentUser.profile.slug
          return cy
            .logout()
            .visit(`/${slug}`)
            .get('[data-cy=info-message]').should('contain', 'This Profile is private')
        })
    })

    it('Profile is shown on login if the user has not finished it', () => {
      cy
        .visit('/')
        .wait(1000) // This breaks on fresh DBs without wait. I don't know why
        .currentURL().should('equal', '/profile')
    })

    it('Validates properly', () => {
      cy
        .visit('/profile')
        .wait(1000)
        // TODO: test that not having an avatar triggers the Avatar Required error
        .get('[data-cy=save-and-continue]').click()
        .get('[data-cy=profile-error]').should('contain', 'Please complete your Profile')
        .get('[data-cy=profile-name-error]').should('contain', 'Required')
        .get('[data-cy=profile-location-error]').should('contain', 'Location is required')
        .get('[data-cy=profile-freelancer-type-error]').should('contain', 'Required')
        .get('[data-cy=profile-job-type-error]').invoke('text').should('contain', 'At least one job type is required')
        .get('[data-cy=profile-introduction-error]').should('contain', 'Required')

        .get('[data-cy=add-education]').click()
        .get('[data-cy=textarea-description]').type('.')
        .get('[data-cy=save]').click()
        // .get('[data-cy=autocomplete-place]').should('contain', 'Required') // @TODO Somewhy no validation error shown here
        // .get('[data-cy=textfield-helper-place]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-date_start]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-date_end]').should('not.contain', 'Required') // End date isn't required
        .get('[data-cy=textfield-input-date_start]').type('2000')
        .get('[data-cy=textfield-input-date_end]').type('1999')
        .get('[data-cy=save]').click()
        .get('[data-cy=textfield-helper-date_end]').should('contain', 'Must be after the start year')
        .get('[data-cy=textfield-input-date_start]').clear()
        .get('[data-cy=textfield-input-date_end]').clear()
        .get('[data-cy=textarea-description]').clear()
        .get('[data-cy=cancel]').click()

        .get('[data-cy=add-work]').click()
        .get('[data-cy=textarea-description]').type('.')
        .get('[data-cy=save]').click()
        .get('[data-cy=textfield-helper-title]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-place]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-date_start]').should('contain', 'Required')
        .get('[data-cy=textfield-helper-date_end]').should('not.contain', 'Required') // End date isn't required
        .get('[data-cy=textfield-input-date_start]').type('2000')
        .get('[data-cy=textfield-input-date_end]').type('1999')
        .get('[data-cy=save]').click()
        .get('[data-cy=textfield-helper-date_end]').should('contain', 'Must be after the start year')
        .get('[data-cy=textfield-input-date_start]').clear()
        .get('[data-cy=textfield-input-date_end]').clear()
        .get('[data-cy=textarea-description]').clear()
        .get('[data-cy=cancel]').click()
    })

    it('Can be filled out and saved', () => {
      cy
        .visit('/profile')
        .wait(1000)
      fillOutProfile()

      cy
        .get('[data-cy=open-video-introduction]').click()
        .uploadVideo()
        .get('[data-cy=video-uploading-message]').should('exist')
        .get('[data-cy=video-uploading-message]', { timeout: 120000 }).should('not.exist')
        .get('[data-cy=save-and-continue]').click()
        .get('.snackbar-open', { timeout: 120000 }).should('contain', 'Your Profile is now Public!')
        .currentURL().should('equal', '/member/dashboard')
    })

    function checkProfile() {
      cy
        .get('[data-cy=verification-badge-unverified]').should('exist')
        .get('[data-cy=available-now]').should('exist')
        .get('[data-cy=timezone]').should('contain', freelancer4.timezone_name)

        .get('[data-cy=profile-summary]').should('contain', freelancer4.first_name)
        .get('[data-cy=profile-summary]').should('contain', 'Technology')

        .get('[data-cy=profile-total-experience-container]').should('contain', '0-2 years')

        .get('[data-cy=text-introduction]').should('contain', freelancer4Profile.text_introduction)
        .get('[data-cy=skills]')
          .should('contain', SKILLS[0])
        .get('[data-cy=timeline] [data-cy=item]:eq(0)')
          .should('contain', positions[0].title)
          .should('contain', positions[0].place)
          .should('contain', positions[0].date_start.substring(0, 4))
          .should('contain', positions[0].date_end.substring(0, 4))
          .should('contain', positions[0].description)
        .get('[data-cy=timeline] [data-cy=item]:eq(1)')
          .should('contain', educations[0].place)
          .should('contain', educations[0].title)
          .should('contain', educations[0].date_start.substring(0, 4))
          .should('contain', educations[0].date_end.substring(0, 4))
          .should('contain', educations[0].description)
    }

    it('Can view own public profile', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit(`/${freelancer4Profile.slug}`)
        .get('[data-cy=freelancer]', { timeout: 60000 }).within(checkProfile)
        .get('[data-cy=freelancer-rate]').should('contain', freelancer4Profile.freelancer_rate_cents / 100)
    })

    it('Can view public profile as a guest', () => {
      cy
        .logout()
        .visit(`/${freelancer4Profile.slug}`)
        .get('[data-cy=freelancer]').within(checkProfile)
        .get('[data-cy=freelancer-rate]').should('not.exist') // guests can't view freelancer rate.
    })

    it('Can view public profile as another freelancer', () => {
      cy
        .logout()
        .login(freelancer3.email, freelancer3.password)
        .visit(`/${freelancer4Profile.slug}`)
        .get('[data-cy=freelancer]').within(checkProfile)
        // TODO: the next assertion fails because in dev mode everyone is admin, and the rate is sent back
        // .get('[data-cy=freelancer-rate]').should('not.exist') // other freelancers can't view freelancer rate.
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer3.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer3.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
    })
  })

  describe('Unverified profiles', () => {
    before(() => {
      cy
        .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
        .callTestAPI('create_user', { params: { ...freelancer4, status: 'unverified' }, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
        .callTestAPI('create_data', { model: 'Skill', params: skills[0] })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: skills[0].id, experience: 2, user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'Institute', params: institutes[0] })
        .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...educations[0], user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'TimelineEntry', params: { ...positions[0], user_id: freelancer4.id } })
        .callTestAPI('create_data', { model: 'Video', params: { status: 'processed', user_id: freelancer4.id, url: 'http://test.com/fakevideo' } })
    })

    it('Profile can be shared publicly with permalink', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit('/')
        .wait(1000)
        .getReduxState().then((state: any) => {
          const slug = state.auth.currentUser.profile.slug
          return cy
            .visit(`/${slug}`)
            .get('[data-cy=public-profile] [data-cy=info-message]').should('contain', `Share your profile with the world at flexhire.com/${slug}`)
        })
    })

    // TODO: replace this test with a component test, it is flaky on CI
    skipOnCI('Profile is public', () => {
      cy
        .login(freelancer4.email, freelancer4.password)
        .visit('/')
        .menuNavigateTo('freelancer-navigation-profile')
        .get('[data-cy=public-profile] [data-cy=info-message]', { timeout: 120000 }).should('contain', 'Share your profile')
    })

    it('Video answers can be managed', () => {
      cy
        .callTestAPI('delete_data', { model: 'Answer', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Video', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Question', params: { id: questions[0].id } })
        .callTestAPI('create_data', { model: 'Question', params: questions[0] })
        .callTestAPI('create_data', { model: 'Answer', params: { id: 50000, user_id: freelancer4.id, question_id: questions[0].id } })
        .callTestAPI('create_data', { model: 'Video', params: { status: 'processed', user_id: freelancer4.id, answer_id: 50000, url: 'http://test.com/fakevideo' } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/profile')
        .get('[data-cy=tab-video-answers]').click()
        .get('[data-cy=answers-list]').children().should('have.length', 1)
        .get(`[data-cy=answer-to-${questions[0].id}-visible`).should('exist')
        .get(`[data-cy=toggle-visibility-answer-to-${questions[0].id}`).click()
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('.snackbar-open').should('contain', 'Video updated')
        .get(`[data-cy=answer-to-${questions[0].id}-hidden`).should('exist')
        .get('.snackbar-open', { timeout: 120000 }).should('not.exist') // need to wait for the snackbar to away otherwise the second action is too fast and the snackbar message does not work
        .get(`[data-cy=delete-answer-to-${questions[0].id}`).click()
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get(`[data-cy=delete-answer-to-${questions[0].id}`).should('not.exist')
        .get('.snackbar-open').should('contain', 'Video deleted')
    })

    it('can manage sample work', () => {
      cy
        .callTestAPI('delete_data', { model: 'Project', params: { user_id: freelancer4.id } })
        .login(freelancer4.email, freelancer4.password)
        .visit('/profile')
        .get('[data-cy=tab-sample-work]').click()
        .get('[data-cy=sample-work-0]').should('not.exist')
        .get('[data-cy=add-sample-work]').click()
        .get('[data-cy=textfield-input-title]').clear().type('My sample work')
        .get('[data-cy=submit-custom-project]').click()
        .get('[data-cy=textfield-helper-url]').should('contain', 'Required')
        .get('[data-cy=textfield-input-url]').clear().type('https://github.com')
        .get('[data-cy=submit-custom-project]').click()
        .get('.snackbar-open').should('contain', 'Sample work submitted')
        .get('[data-cy=sample-work-0]').within(() => {
          return cy
            .get('[data-cy=title]').should('contain', 'My sample work')
            .get('[data-cy=toggle-visibility]').click()
        })
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('.snackbar-open').should('contain', 'Sample work updated')
        .get('[data-cy=sample-work-0]').within(() => {
          return cy
            .get('[data-cy=delete]').click()
        })
        .get('[data-cy=confirm-dialog-confirm]').click()
        .get('.snackbar-open').should('contain', 'Sample work deleted')
        .get('[data-cy=sample-work-0]').should('not.exist')
    })

    describe('as a client', () => {
      before(() => {
        cy
          .callTestAPI('create_user', { params: clients[1], method: 'create' })
          .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      })

      it('freelancer data and client rate is displayed', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=freelancer-rate]')
          .should('contain', freelancer4Profile.client_rate_cents / 100) // client see the client rate
      })

      // TODO: test seems to always fail on CI. Review and re-enable
      it.skip('notification about job can be sent', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=notify-freelancer]', { timeout: 30000 }).click()
          .get('[data-cy=notify-freelancer-dialog]').within(() => {
            return cy
              .get('[data-cy=select-job]').should('exist')
              .get('[data-cy=notify]', { timeout: 120000 }).should('not.be.disabled')
              .get('[data-cy=notify]').click()
          })
          .get('.snackbar-open').should('contain', 'Notification email sent', { timeout: 30000 })
      })

      it('offer can be made', () => {
        cy
          .login(clients[1].email, clients[1].password)
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=make-offer]', { timeout: 120000 }).click()
          .currentURL().should('match', /client\/invitation_team/)
          .get('[data-cy=textfield-input-client_rate]', { timeout: 20000 }).type('50')
          .get('[data-cy=select-job_id]', { timeout: 20000 }).click()
          .wait(500)
          .get('[data-cy=job-0]', { timeout: 20000 }).click()
          .wait(1000)
          .get('[data-cy=invitation-form-continue]').click()
          .wait(3000)
          .get('[data-cy=submit-invitation]').click()
          .get('.snackbar-open', { timeout: 30000 }).should('contain', 'Offer sent')
          .currentURL().should('match', /client\/hire/)
          .get('[data-cy=result-list]', { timeout: 120000 }).children().should('have.length', 1)
          .get('[data-cy=result-list]').children().eq(0).within(() => {
            cy
              .get('[data-cy=freelancer-card-header]', { timeout: 120000 })
              .should('contain', freelancer4.first_name)
              .get('[data-cy=status-badge]')
              .should('contain', 'Offer Made')
          })
          // Deleting the contract is needed for the next test
          .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      })

      it.skip('freelancer profile will be shown to a client regardless of if it is in lite mode', () => {
        // TODO: fix this test so it views a different profile, otherwise it will
        // cause all tests after this to fail because the profile is edited to be closed to opportunities
        cy
          .login(freelancer4.email, freelancer4.password)
          .visit('/profile')
          .get('[data-cy=open-to-opportunities-button]').click()
          .get('[data-cy=save-and-continue]').click()
          .wait(1000)
          .logout()
          .wait(1000)
          .callTestAPI('create_data', { model: 'Contract', params: { job_id: jobs[1].id, client_id: clients[1].id, freelancer_id: freelancer4.id, status: 'job_application_sent' } })
          .login(clients[1].email, clients[1].password)
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=take-action]', { timeout: 30000 }).should('exist')
      })

      after(() => {
        cy
          .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
          .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: freelancer4.id }, method: 'delete_all' })
          .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      })
    })

    describe('as a guest', () => {
      it('rate is hidden but client actions are available', () => {
        cy
          .logout()
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=notify-freelancer]', { timeout: 30000 }).should('exist')
          .get('[data-cy=make-offer]').should('exist')
          .get('[data-cy=freelancer-rate]').should('not.exist') // guest don't see rates
      })

      it('notification about job redirects to signup', () => {
        cy
          .logout()
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=notify-freelancer]', { timeout: 30000 }).click()
          .currentURL().should('equal', '/signup/client')
          .queryParams().should('deep.equal', { url: `/${freelancer4Profile.slug}` })
      })

      it('offer redirects to signup', () => {
        cy
          .logout()
          .visit(`/${freelancer4Profile.slug}`)
          .get('[data-cy=make-offer]', { timeout: 30000 }).click()
          .currentURL().should('equal', '/signup/client')
          .queryParams().should('deep.equal', { url: `/${freelancer4Profile.slug}` })
      })
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
        .callTestAPI('delete_data', { model: 'Skill', params: { id: skills[0].id } })
    })
  })

  after(() => {
    cy.callTestAPI('delete_data', { model: 'FreelancerType', params: { id: freelancerTypes[0].id } })
  })
})
