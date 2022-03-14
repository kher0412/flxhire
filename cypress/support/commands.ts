// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const { parse: parseQueryParams } = require('qs')

// NOTE: add to the Chainable interface all the custom cypress commands
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    logout(): Chainable
    login(username: string, password: string): Chainable
    waitForIFrameToLoad(): Chainable
    iframe(): Chainable
    queryParams(): Chainable
    addWireTransferFunds(amount: number): Chainable
    getReduxState(): Chainable
    callTestAPI(url: string, body?: any): Chainable
    addWireTransferAccount(options?: any): Chainable
    addPlaidBankAccount(): Chainable
    dispatch(action: any): Chainable
    currentURL(options?: any): Chainable
    menuNavigateTo(target: string): Chainable
    getByEnv(desktopSelector: string, mobileSelector: string, options?: any): Chainable
    confirmEmail(user: { email: string }): Chainable
    closeMenuIfOpen(): Chainable
    openMenuIfClosed(): Chainable
  }
}

const API = Cypress.env('API_ROOT_URL') || 'http://localhost:3000/api/v1'

Cypress.Commands.add('login', (email, password) => {
  // 1: call log in
  return cy.request('POST', `${API}/auth/log_in`, {
    user: { email, password },
  })
  // 2: Cookie gets set
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authEmail')
  localStorage.removeItem('authRole')
  localStorage.removeItem('currentUser')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('authEmail')
  sessionStorage.removeItem('authRole')
  sessionStorage.removeItem('currentUser')
  cy.clearCookies()
})

Cypress.Commands.add('callTestAPI', (url, ...params) => {
  return cy.request(`${API}/test/${url}`, ...params)
})

Cypress.Commands.add('getReduxState', () => {
  return cy.window().then((w) => {
    return cy.wrap((w as any).reduxStore.getState())
  })
})

Cypress.Commands.add('closeMenuIfOpen', () => {
  return cy
    .get('[data-cy=new-client-desktop]', { timeout: 60000 }).should('exist')
    .wait(1000)
    .get('body').then((body) => {
      if (body.find('[data-cy=close-drawer]').length > 0) {
        return cy.get('[data-cy=close-drawer]').click({ force: true }).wait(1000)
      }

      return cy
  })
})

Cypress.Commands.add('openMenuIfClosed', () => {
  return cy
    .get('[data-cy=new-client-desktop]', { timeout: 60000 }).should('exist')
    .wait(1000)
    .get('body').then((body) => {
      // note: it would be nicer if we detected whether the drawer was open or not, but it doesn't seem reliable currently
      return cy.get('[data-cy=open-drawer]').click({ force: true }).wait(1000)
    })
})

// This code has been copied from somewhere then edited for our use case
// original src: https://github.com/cypress-io/cypress/issues/136#issuecomment-342391119
Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe) => {
  return cy.wrap($iframe.contents().find('body'))
})

Cypress.Commands.add('waitForIFrameToLoad', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve, reject) => {
    const onLoad = () => resolve($iframe.contents().find('body'))
    const onTimeout = () => {
      // Timed out waiting for IFrame to load
      reject(new Error('Timed out waiting for iFrame to load, use cy.iframe if it is already loaded'))
    }
    const isIframeAlreadyLoaded = $iframe && $iframe.contents && $iframe.contents()
    if (isIframeAlreadyLoaded) {
      resolve($iframe.contents().find('body'))
    } else {
      const timeout = setTimeout(onTimeout, 10000)
      $iframe.on('load', () => {
        clearTimeout(timeout)
        onLoad()
      })
    }
  })
})

Cypress.Commands.add('addWireTransferFunds', (amount) => {
  // adds funds available to the first ach_credit_transfer payment method on the current user's firm
  // this only changes the model so that it is accepted as a valid payment method
  // charging will fail unless funds are also added through stripe

  if (amount > 0) {
    return cy.callTestAPI('add_funds', { amount })
  }

  return cy
})

Cypress.Commands.add('addWireTransferAccount', (options = {}) => {
  return cy
    .get('[data-cy=payment-setup-wire-transfer]').click()
    .get('[data-cy=wire-transfer-dialog-loading]', { timeout: 20000 }).should('not.exist')
    .get('[data-cy=add-wire-transfer]').click()
    .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Wire transfer configured successfully')
    .addWireTransferFunds(options.funds || 0)
    .get('[data-cy=close-wire-transfer]').click()
})

Cypress.Commands.add('addPlaidBankAccount', () => {
  return cy
    .get('[data-cy=payment-setup-bank-account]').click()
    .get('[data-cy=plaid-link-container] button').first().click() // Opens plaid dialog
    .get('iframe#plaid-link-iframe-1').as('plaid')
    .waitForIFrameToLoad()
    .get('@plaid', { timeout: 120000 }).iframe().find('[role=button]', { timeout: 60000 }).click() // Click Agree
    .get('@plaid').iframe().find('[data-institution=bofa-api]').click() // Select Bank
    .get('@plaid').iframe().find('#username').type('user_good')
    .get('@plaid').iframe().find('#password').type('pass_good')
    .get('@plaid').iframe().find('button[type=submit]').click() // Submit Credentials
    .get('@plaid', { timeout: 120000 }).iframe().find('#0_question').clear().type('1234') // Enter PIN
    .get('@plaid').iframe().find('button[role=button]').click() // Click Continue
    .get('@plaid').iframe().find('.ListItem', { timeout: 120000 }).first().click() // Select First Account
    .get('@plaid').iframe().find('button[role=button]').click() // Click Continue
    .get('.snackbar-open', { timeout: 60000 }).should('contain', 'Bank connected successfully')
})

Cypress.Commands.add('dispatch', (...args) => {
  return cy.window().then((w) => {
    return cy.wrap((w as any).reduxStore.dispatch(...args))
  })
})

Cypress.Commands.add('currentURL', (options = {}) => {
  return cy.window().location('pathname', { timeout: 120000, ...options })
})

Cypress.Commands.add('queryParams', () => {
  return cy.window().location('search', { timeout: 120000 }).then((search) => {
    const searchFixed = search.length > 0 && search[0] === '?' ? search.substring(1) : search
    return parseQueryParams(searchFixed)
  })
})

Cypress.Commands.add('checkIfUnchecked', { prevSubject: 'element' }, (checkbox) => {
  if (!checkbox[0].checked) {
    return checkbox.click()
  }
  return checkbox
})

Cypress.Commands.add('uncheckIfChecked', { prevSubject: 'element' }, (checkbox) => {
  if (checkbox[0].checked) {
    return checkbox.click()
  }
  return checkbox
})

Cypress.Commands.add('selectDateInDatePicker', (selector, date) => {
  const year = date.format('YYYY')
  const month = date.format('MMM')
  const day = date.format('D')
  return cy
    .get(`[data-cy=date-range-picker-${selector}]`).within(() => {
      cy
        .get('[data-cy=select-month]').click()
        .get(`[data-cy=years] [data-cy=${year}]`).click()
        .get(`[data-cy=months] [data-cy=${month}]`).click()
        .get('[data-cy=select-month]').click()
        .wait(1000) // Wait for animations.
        // .last() is needed because the same day can show up twice if it's one of the last days of the month
        .get(`[data-cy=days] [data-cy=${day}]`).last().click()
    })
})

Cypress.Commands.add('menuNavigateTo', (menu) => {
  if (Cypress.env('RUN_RESOLUTION') === 'MOBILE') {
    cy.get('[data-cy=mobile-navigation]', { timeout: 120000 }).click()
    cy.get(`[data-cy=mobile-${menu}]`, { timeout: 120000 }).click()
  } else {
    cy.get(`[data-cy=${menu}]`, { timeout: 120000 }).click()
  }
  return cy
})

Cypress.Commands.add('getByEnv', (desktopSelector, mobileSelector, options) => {
  return cy.get(Cypress.env('RUN_RESOLUTION') === 'MOBILE' ? mobileSelector : desktopSelector, options)
})

Cypress.Commands.add('uploadVideo', () => {
  cy.get('[data-cy=input-upload-video]', { timeout: 60000 }).then((subject) => {
    return cy.fixture('video.webm', 'base64').then((base64String) => {
      const blob = Cypress.Blob.base64StringToBlob(base64String, 'video/webm')
      let testfile = new File([blob], 'video.webm', { type: 'video/webm' })
      let dataTransfer = new DataTransfer()
      let fileInput = subject[0] as any

      dataTransfer.items.add(testfile)
      // This triggers the @change event on the input.
      fileInput.files = dataTransfer.files

      return cy.wrap(subject).each(el => cy.wrap(el).trigger('change', { force: true }))
    })
  })
})

Cypress.Commands.add('recordVideo', () => {
  // NOTE: this does not work on CI. If you can figure it out, then nice
  // If you need this on CI, use `uploadVideo` instead
  // Start recording: cypress mocks the webcam by providing sample video and audio
  cy.get('[data-cy=start-recording]', { timeout: 10000 }).click()
  // We have to wait for the 3 sec countdown to be over
  cy.get('[data-cy=countdown]', { timeout: 10000 }).should('not.exist')
  // Stop recording as soon as possible
  cy.get('[data-cy=end-recording]', { timeout: 10000 }).click()
  cy.get('[data-cy=save-video]', { timeout: 30000 }).click()
  // Remember that the video has to upload which takes a while so make sure your test waits for the upload to complete
})

  const SKILLS = ['Laravel', 'PHP']

Cypress.Commands.add('fillSimpleJobForm', (jobData, skillNames = SKILLS) => {
  return cy
    .get('[data-cy=textfield-input-title]', { timeout: 10000 }).type(jobData.title)
    .wait(2000)
    .get('[data-cy=select-industry]').click()
    .get('[data-cy=select-industry-technology]').click()
    .get('[data-cy=textarea-description]').first().type(jobData.description)
    .get('[data-cy=select-type]').click()
    .get('[data-cy=select-type-freelancer]').click()
    .get('[data-cy=textfield-input-client_rate]').first().type(`${jobData.client_rate_cents / 100}`)
    .get('[data-cy=textfield-input-min_client_rate]').first().type(`${jobData.min_client_rate_cents / 100}`)
    .get('[data-cy=select-duration]').click()
    .get(`[data-cy=select-duration-${jobData.project_length_in_months}]`).click()
    .wait(1000)
    .get('[data-cy=chipfield-input-job_skills]').first().type(`${skillNames.join(' ')} `, { delay: 250 })
})

Cypress.Commands.add('fillJobForm', (jobData) => {
  cy.get('[data-cy=tutorial-bubble-close]', { timeout: 60000 }).click()
  cy.wait(200)

  // Title:
  cy.get('[data-cy=job-title-open]').click()
  cy.get('[data-cy=job-title-input]').type(jobData.title)

  // Position type and rates:
  cy.get('[data-cy=job-job_rates-open]').click()
  cy.get('[data-cy=job-job_positions-select]').click()
  cy.get('[data-cy=job-job_positions-select-freelance]').click()
  cy.wait(500) // Wait for Select to close
  cy.get('[data-cy=textfield-input-min_client_rate]').type(`${jobData.min_client_rate_cents / 100}`)
  cy.get('[data-cy=textfield-input-client_rate]').type(`${jobData.client_rate / 100}`)
  cy.get('[data-cy=job-job_rates-close]').click()

  // Freelancer type:
  cy.get('[data-cy=job-freelancer_type-select').click()
  cy.get('[data-cy=job-freelancer_type-select-technology').click()
  cy.get('[data-cy=job-freelancer_type-close').click()
  cy.wait(500) // Wait for Select to close

  // Project length:
  cy.get('[data-cy=job-project_length_in_months-select]').click()
  cy.get(`[data-cy=job-project_length_in_months-select-item-${jobData.project_length_in_months}]`).click()
  cy.wait(500) // Wait for dropdown close animation to finish because it refocuses the field after it.

  // Skills:
  // Optional skills:
  cy.get('[data-cy=job-job_skills-open]').eq(1).click()
  cy.get('[data-cy=chipfield-input-job_skills]').type(`${SKILLS[0]} `, { delay: 250 })
  cy.get('[data-cy=job-job_skills-close]').click()

  // TODO: add tests for required skills too

  // Description(s):
  cy.get('[data-cy=job-description-open]').click()
  cy.get('[data-cy=job-description-input]').type(jobData.description)
  cy.get('[data-cy=job-description_responsibilities-open]').click()
  cy.get('[data-cy=job-description_responsibilities-input]').type(jobData.description_responsibilities)
  cy.get('[data-cy=job-description_experience-open]').click()
  cy.get('[data-cy=job-description_experience-input]').type(jobData.description_experience)

  return cy
})

Cypress.Commands.add('confirmEmail', (user) => {
  return cy
    .currentURL().should('equal', '/confirm_email')
    .callTestAPI('get_email_confirmation_token', { email: user.email })
    .its('body').then(({ token }) => {
      return cy
        .get('[data-cy=enter-code]').click()
        .get('[data-cy=textfield-input-token]').type(token)
        .get('[data-cy=submit-confirmation-token]').click()
        .get('.snackbar-open', { timeout: 40000 }).should('contain', 'Email confirmed!')
    })
})
