/* eslint-disable indent */
import { clients } from '../../fixtures/client'
import { jobs } from '../../fixtures/jobs'
import { freelancer4, freelancer4Profile, freelancer5, freelancer5Profile, freelancer6, freelancer6Profile } from '../../fixtures/freelancer'
import { activeContracts } from '../../fixtures/contracts'
import { firms } from '../../fixtures/firms'

const LARAVEL_SKILL_ID = 21
const REACT_SKILL_ID = 22

export function openFiltersIfHidden() {
  return cy
    .get('[data-cy=page-bundle-placeholder]').should('not.exist')
    .get('body').then((body) => {
      if (body.find('[data-cy=open-filters]').length > 0) {
        return cy.get('[data-cy=open-filters]').click()
      }
      return undefined
    })
}

export function closeFiltersIfOpen() {
  return cy
    .get('body').then((body) => {
      if (body.find('[data-cy=close-filters]').length > 0) {
        return cy.get('[data-cy=close-filters]').click()
      }
      return undefined
    })
}

describe('Client Manage Team', () => {
  before(() => {
    cy
      // Make sure everything created in this file is deleted
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[2].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[2].email } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'User', params: { email: clients[1].email } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[1].email }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_email: clients[2].email }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'Firm', params: { name: clients[1].company_name } })
      .callTestAPI('delete_data', { model: 'Tag', params: { name: 'cypresstag' } })
      .callTestAPI('delete_data', { model: 'ContractTag', params: { contract_id: activeContracts[2].id } })

      .callTestAPI('create_data', { model: 'Firm', params: { ...firms[0], name: clients[1].company_name, legacy_billing: true } })
      .callTestAPI('create_user', { params: { ...clients[1], firm_id: firms[0].id }, method: 'create' })
      .callTestAPI('create_data', { model: 'Job', params: { ...jobs[1], user_id: clients[1].id } })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: LARAVEL_SKILL_ID, job_id: jobs[1].id } })
      .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: REACT_SKILL_ID, job_id: jobs[1].id } })
      .callTestAPI('create_user', { params: { ...clients[2], firm_id: firms[0].id }, method: 'create' })
      .callTestAPI('create_user', { params: freelancer4, method: 'create' })
      .callTestAPI('create_data', { model: 'Profile', params: freelancer4Profile })
      .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: LARAVEL_SKILL_ID, experience: 2, user_id: freelancer4.id } })
      .callTestAPI('create_data', { model: 'Tag', params: { id: 10001, name: 'cypresstag' } })
  })

  describe('Bar', () => {
    // NOTE: the following test won't work if ran after the other tests
    // The reason is probably some issue where the manager contract for clients[1] gets deleted
    it('buttons work', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/manage?tab=team')

        .wait(3000) // clicking too fast sometimes does not work
        .get('body').then((body) => {
        if (body.find('[data-cy=client-navigation-manage]').length > 0) {
          return cy.menuNavigateTo('client-navigation-manage')
        }
        return cy.get('[data-cy=client-team-overview]').first().click()
          .get('[data-cy=team-overview-team]').first().click()
      })
        .wait(3000) // clicking too fast can cause DOM element to be detached
        .get('[data-cy=invite]', { timeout: 120000 }).click()
        .currentURL().should('equal', '/client/invitation_team')
    })
  })

  describe('Active contracts list freelancer cards work properly', () => {
    beforeEach(() => {
      cy
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
        .callTestAPI('create_data', { model: 'ContractTag', params: { tag_id: 10001, contract_id: activeContracts[2].id } })
        .clearLocalStorage() // needed to avoid persistence of filters
    })

    it('Freelancer data shown properly', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 1)

        .wait(5000) // prevent "element detached from DOM"

        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0)').should('contain', 'Technology')

        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy
            .get('[data-cy=freelancer-card-header]')
              .should('contain', freelancer4.first_name)
            .get('[data-cy=status-badge]')
              .should('contain', 'Active')
              // .should('contain', Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? `${activeContracts[2].client_rate_cents/100}/hr` : jobs[1].title)
            // .wait(2000) // wait a bit to avoid element detached
            // .get('[data-cy=freelancer-skills-button]').click()
        })
        // Note: the freelancer-skills element is outside of the result list.
        // .get('[data-cy=freelancer-skills]').should('contain', 'Laravel 2+ yrs')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy.get('[data-cy=freelancer-info]').should('contain', `${clients[1].first_name} ${clients[1].last_name}`)
          if (Cypress.env('RUN_RESOLUTION') !== 'MOBILE') {
            cy
              .get('[data-cy=freelancer-info]')
              .should('contain', `${activeContracts[2].client_rate_cents / 100}/hr`)
              .should('contain', `${clients[1].first_name} ${clients[1].last_name}`)
              // .should('contain', moment(activeContracts[2].end_date).format(DATE_TIME_FORMAT)) // @TODO There are timezone problems that needs to be resolved for these assertions:
              // .should('contain', jobs[1].title) // This is commented out because the related feature in app/scenes/ClientTeam/MyTeam/components/TeamMember/components/FreelancerCard/FreelancerCard.js is commented out too.
          }
        })
    })

    // TODO: flaky test on CI
    it.skip('Card editing: manager can be edited', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)

        .wait(2000)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=edit-contract]').click()
        .get('[data-cy=contact-settings-dialog] [data-cy=select-client_id]').click()
        .wait(2000)
        .get(`[data-cy=select-manager-option-${clients[2].id}]`, { timeout: 20000 }).click()
        .get('[data-cy=contact-settings-dialog] [data-cy=submit]').click()

        .get('[data-cy=freelancer-list]').should('not.exist')

        .wait(3000) // avoid element detached from dom
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get(`[data-cy=select-filter-by-manager-option-${clients[2].id}]`).click()

        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-info]').should('contain', `${clients[2].first_name} ${clients[2].last_name}`)

        // Check persistency after reload.
        .visit('/client/team')
        .wait(3000) // avoid element detached from dom
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get(`[data-cy=select-filter-by-manager-option-${clients[2].id}]`).click()
        // .get('[data-cy=select-status-option-${clients[2].id}]').click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-info]').should('contain', `${clients[2].first_name} ${clients[2].last_name}`)
    })

    it('Card editing: contract rate can be edited', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/team')
        .wait(3000) // avoid element detached problem
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get('[data-cy=select-filter-by-manager-option-').click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)

      cy
        .wait(2000)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=edit-contract]', { timeout: 120000 }).click()
        .get('[data-cy=contact-settings-dialog]').within(() => {
          cy
            // NOTE: we used to .clear() this field before typing the new rate but for some reason that doesn't work
            // the field does not get cleared.
            .get('[data-cy=textfield-input-client_rate]').type('0')
            // TODO: move this to component test
            // .get('[data-cy=margin-notice]').should('contain', '$80')
            .get('[data-cy=submit]').click()
        })
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=compensation-hourly-rate]', { timeout: 30000 }).should('contain', '$400/hr')
        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=compensation-hourly-rate]', { timeout: 30000 }).should('contain', '$400/hr')
    })

    it('Card editing: contract end date can be edited', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)

      cy
        .wait(2000)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=edit-contract]').click()
        // @TODO Find a way to enter a date into React-Material's datepicker.
        /*
        .get('[data-cy=contact-settings-dialog]').within(() => {
          cy
            .get('[data-cy=datefield-input-end_date]').clear().type(NEW_CONTRACT_END_DATE)
            .get('[data-cy=submit]').click()
          })
          .get('[data-cy=freelancer-info]').should('contain', NEW_CONTRACT_END_DATE)
          .visit('/client/team')
          .get('[data-cy=freelancer-info]').should('contain', NEW_CONTRACT_END_DATE)
          .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=edit-contract]').click()
          .get('[data-cy=update-end-date-dialog] [data-cy=datefield-input-end-date]').should('have.value', NEW_CONTRACT_END_DATE)
          */
    })

    it('Card Editing: custom tags can be added and removed', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .get('[data-cy=page-placeholder-loading]', { timeout: 10000 }).should('not.exist')
        .wait(2000)
        .get('[data-cy=add-tags]').first().click()
        // check initial value
        .get('[data-cy=freelancer-chip-tag-cypresstag]').should('contain', 'cypresstag')
        .get('[data-cy=freelancer-chip-tag-first]').should('not.exist')
        .get('[data-cy=freelancer-chip-tag-second]').should('not.exist')
        // try changing value with text field
        .get('[data-cy=textfield-input-add-tags]').should('have.value', 'cypresstag')
        .wait(1000) // if done too quickly it fails on CI
        .get('[data-cy=textfield-input-add-tags]').clear()
        .wait(1000) // if done too quickly it fails on CI
        .get('[data-cy=textfield-input-add-tags]').type('first second')
        .get('[data-cy=save-tags]').click()
        // .get('.snackbar-open').should('contain', 'Contract updated')
        .wait(1000)
        .get('[data-cy=add-tags]').first().click()

        // check new value
        .get('[data-cy=textfield-input-add-tags]').invoke('val').should('match', /first second|second first/)
        .get('[data-cy=freelancer-chip-tag-first]').should('contain', 'first')
        .get('[data-cy=freelancer-chip-tag-first]').invoke('attr', 'data-active').should('equal', 'true')
        .get('[data-cy=freelancer-chip-tag-second]').should('contain', 'second')
        .get('[data-cy=freelancer-chip-tag-second]').invoke('attr', 'data-active').should('equal', 'true')
        // TODO: verify if cypresstag being present is correct behavior or not. I think it's not
        // .get('[data-cy=freelancer-chip-tag-cypresstag]').invoke('attr', 'data-active').should('equal', 'false')
        // try changing value with clicks on chips
        .get('[data-cy=freelancer-chip-tag-first]').click()
        .get('[data-cy=textfield-input-add-tags]').should('have.value', 'second')
        .get('[data-cy=freelancer-chip-tag-first]').invoke('attr', 'data-active').should('equal', 'false')
        .get('[data-cy=freelancer-chip-tag-second]').invoke('attr', 'data-active').should('equal', 'true')
    })

    it('Card actions: freelancer profile can be viewed', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=freelancer-avatar]', { timeout: 120000 })
        .first().click()
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)

        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=view-profile]', { timeout: 120000 }).click()
        .currentURL().should('equal', `/${freelancer4Profile.slug}`)
    })

    it('Card actions: contract can be paused and resumed', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .get('[data-cy=page-placeholder-loading]', { timeout: 10000 }).should('not.exist')
        .wait(2000)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy
            .get('[data-cy=pause-contract]').click()
            .get('[data-cy=pause-contract]').should('not.exist')
            .get('[data-cy=resume-contract]').should('exist')
        })
        openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-paused]').click()
        closeFiltersIfOpen()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0)').within(() => {
          cy
            .wait(1000) // Wait for animation to finish
            .get('[data-cy=resume-contract]').click()
            .get('[data-cy=resume-contract]').should('not.exist')
            .get('[data-cy=pause-contract]').should('exist')
        })
    })

    it('Card actions: contract can be terminated', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]:eq(0) [data-cy=end-contract]').click()
        .get('[data-cy=confirm-dialog]').within(() => {
          cy
            .get('[data-cy=confirm-dialog-title]').should('contain', 'Remove')
            .get('[data-cy=confirm-dialog-confirm]').click()
        })
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
        .get('[data-cy=status-badge]').should('contain', 'Deleted')
        .wait(1000) // Wait for animation to finish

      // check if item has been permanently deleted (ie it goes away after restart)
      cy
        .visit('/client/team')
        .wait(5000) // avoid element detached from DOM
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 0)
    })

    afterEach(() => {
      cy
        .callTestAPI('delete_data', { model: 'ContractTag', params: { tag_id: 10001 } })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: activeContracts[2].id }, method: 'delete_all' })
    })
  })

  describe('Bulk actions', () => {
    beforeEach(() => {
      cy
        .callTestAPI('create_user', { params: freelancer5, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer5Profile })
        .callTestAPI('create_user', { params: freelancer6, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer6Profile })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], id: 60000, freelancer_id: freelancer5.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], id: 60001, freelancer_id: freelancer6.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
    })

    it('can update status', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/manage?tab=team')

        .wait(3000) // avoid element detached problem
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get('[data-cy=select-filter-by-manager-option-]').click()
        .wait(3000) // avoid element detached problem
        openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-active]').click()
        closeFiltersIfOpen()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)

        .wait(2000) // if we click select-all too fast it selects 0 items on CI
        .get('[data-cy=select-all]').click()
        .get('[data-cy=num-selected-items]').should('contain', 3)
        .wait(2000) // if we click too fast the dropdown is misplaced
        .get('[data-cy=set-status]').click()
        .wait(1000)
        .get('[data-cy=set-status-paused]').click()
        .get('.snackbar-open', { timeout: 120000 }).should('contain', '3 contracts updated')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 0)

        openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-paused]').click()
        closeFiltersIfOpen()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)
    })

    it('can change end date', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/manage?tab=team')

        .wait(5000) // fix element detached from DOM
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get(`[data-cy=select-filter-by-manager-option-${clients[1].id}]`).click()
        openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-]').click()
        closeFiltersIfOpen()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)

        .wait(2000) // if we click select-all too fast it selects 0 items on CI
        .get('[data-cy=select-all]').click()
        .get('[data-cy=num-selected-items]').should('contain', 3)
        .get('[data-cy=set-end-date]').click()
        .get('[data-cy=end-date]').click()
        // TODO: Figure out how to enter a date in the material-ui date picker
        // .get('.snackbar-open', { timeout: 120000 }).should('contain', '3 contracts updated')
    })

    it('can update manager', () => {
      cy
        .login(clients[1].email, clients[1].password)
        .visit('/client/manage?tab=team')

        .wait(3000) // avoid element detached problem
        .get('[data-cy=select-filter-by-manager]').first().click()
        // not chaining the next command because it sometimes fails if chained
      cy.get(`[data-cy=select-filter-by-manager-option-${clients[1].id}]`).click()
      openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .wait(1000)
        .get('[data-cy=select-status-option-]').click()
      closeFiltersIfOpen()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)

        .wait(2000) // if we click select-all too fast it selects 0 items on CI
        .get('[data-cy=select-all]').click()
        .get('[data-cy=num-selected-items]').should('contain', 3)
        .wait(2000) // if we click too fast the dropdown is misplaced
        .get('[data-cy=set-manager]').click()
        .get(`[data-cy=set-manager-${clients[2].id}]`).click()
        .get('.snackbar-open', { timeout: 120000 }).should('contain', '3 contracts updated')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 0)

        .wait(3000) // avoid element detached problem
        .get('[data-cy=select-filter-by-manager]').first().click()
        .get(`[data-cy=select-filter-by-manager-option-${clients[2].id}]`).click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)
    })

    afterEach(() => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { id: activeContracts[2].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: 60000 }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: 60001 }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: activeContracts[2].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: 60000 }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'Contract', params: { id: 60001 }, method: 'delete_all' })
    })
  })

  describe('Filters', () => {
    before(() => {
      cy
        .callTestAPI('create_data', { model: 'Job', params: { ...jobs[2], user_id: clients[1].id } })
        .callTestAPI('create_data', { model: 'JobSkill', params: { skill_id: LARAVEL_SKILL_ID, job_id: jobs[2].id } })
        .callTestAPI('create_user', { params: freelancer5, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer5Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: LARAVEL_SKILL_ID, experience: 2, user_id: freelancer5.id } })
        .callTestAPI('create_user', { params: freelancer6, method: 'create' })
        .callTestAPI('create_data', { model: 'Profile', params: freelancer6Profile })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: LARAVEL_SKILL_ID, experience: 2, user_id: freelancer6.id } })
        .callTestAPI('create_data', { model: 'UserSkill', params: { skill_id: REACT_SKILL_ID, experience: 2, user_id: freelancer6.id } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer4.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer5.id, client_id: clients[2].id, job_id: jobs[2].id, description: jobs[2].description, id: 60000, status: 'paused' } })
        .callTestAPI('create_data', { model: 'Contract', params: { ...activeContracts[2], freelancer_id: freelancer6.id, client_id: clients[1].id, job_id: jobs[1].id, description: jobs[1].description, id: 60001, start_date: '2017-01-01', end_date: '2017-03-01', status: 'expired', previous_status: 'active' } })
    })

    beforeEach(() => cy.clearLocalStorage()) // needed to avoid persistence of filters

    it('Team filter: Check filtering by manager', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .wait(3000) // sometimes on CI it does not open the filters even though it should
      openFiltersIfHidden()
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-active]').click()
      closeFiltersIfOpen()

        .get('[data-cy=select-filter-by-manager]').first().click()
        .wait(1000)
        .get(`[data-cy=select-filter-by-manager-option-${clients[1].id}]`).click()
        .wait(5000)
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').its('length').should('be.gt', 0)
        .get('[data-cy=team-member-manager]').each(el => cy.wrap(el).should('contain', clients[1].first_name))

        .get('[data-cy=select-filter-by-manager]').first().click()
        .wait(1000)
        .get(`[data-cy=select-filter-by-manager-option-${clients[2].id}]`).click()
      openFiltersIfHidden()
        .wait(1000)
        .get('[data-cy=select-status]').click()
        .wait(1000)
        .get('[data-cy=select-status-option-]').click()

        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').its('length').should('be.gt', 0)
        .get('[data-cy=team-member-manager]').each(el => cy.wrap(el).should('contain', clients[2].first_name))
      closeFiltersIfOpen()

        .get('[data-cy=select-filter-by-manager]').first().click()
        .wait(1000)
        .get('[data-cy=select-filter-by-manager-option-]').click()
        .wait(1000)

        // because we had at least 1-1 item with 2 separate managers, having no manager filter must result in at least 2 items
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]', { timeout: 30000 }).its('length').should('be.gte', 2)
    })

    it('Team filter: Check filtering by job', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .wait(3000) // fix element detached from DOM
      openFiltersIfHidden()

        .get('[data-cy=select-status]', { timeout: 30000 }).click()
        .wait(1000)
        .get('[data-cy=select-status-option-]').click()
      closeFiltersIfOpen()

        .get('[data-cy=select-filter-by-manager]').first().click()
        .wait(1000)
        .get('[data-cy=select-filter-by-manager-option-]').click()

      openFiltersIfHidden()
        .get('[data-cy=select-filter-by-job]').first().click()
        .wait(1000)
        .get(`[data-cy=select-filter-by-job-option-${jobs[1].id}]`).click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 2)

        .get('[data-cy=select-filter-by-job]').first().click()
        .wait(1000)
        .get(`[data-cy=select-filter-by-job-option-${jobs[2].id}]`).click()
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]', { timeout: 120000 }).should('have.length', 1)
    })

    it('Team filter: Check filtering by skill', () => {
      cy
        .login(clients[1].email, clients[1].password)

        .visit('/client/team')
        .wait(5000) // fix filters not being opened
      openFiltersIfHidden()

        .wait(5000) // fix dom detached error
        .get('[data-cy=select-status]').click()
        .get('[data-cy=select-status-option-]').click()
      closeFiltersIfOpen()

        .get('[data-cy=select-filter-by-manager]').first().click()
        .get('[data-cy=select-filter-by-manager-option-]').click()

      openFiltersIfHidden()
        .get('[data-cy=chipfield-input-filter-by-skill]').type('Laravel ')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 3)
        .get('[data-cy=chipfield-input-filter-by-skill]').type('{backspace}{backspace}React ')
        .get('[data-cy=freelancer-list] [data-cy=freelancer-card]').should('have.length', 1)
    })

    after(() => {
      cy
        .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[2].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'Contract', params: { client_id: clients[1].id }, method: 'delete_all' })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer6.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'User', params: { id: freelancer5.id } })
        .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
        .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
    })
  })

  after(() => {
    cy
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Profile', params: { user_id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'User', params: { id: freelancer4.id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[2].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[2].id } })
      .callTestAPI('delete_data', { model: 'Referral', params: { referer_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'UserSkill', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Job', params: { user_id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Contract', params: { freelancer_id: clients[1].id }, method: 'delete_all' })
      .callTestAPI('delete_data', { model: 'User', params: { id: clients[1].id } })
      .callTestAPI('delete_data', { model: 'Tag', params: { name: 'cypresstag' } })
  })
})
