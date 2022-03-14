// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// TODO: figure out how to make this work as a module
// then turn on isolatedModules on the cypress tsConfig
// also enable linting on cypress
require('./commands')

// NOTE: add to the Chainable interface all the custom cypress commands
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    logout(): Chainable<Element>
    login(username: string, password: string): Chainable<Element>
    waitForIFrameToLoad(): Chainable<Element>
    iframe(): Chainable<Element>
    queryParams(): Chainable<Element>
    addWireTransferFunds(amount: number): Chainable<Element>
    getReduxState(selector?: (state: any) => any): Chainable<Element>
    callTestAPI(url: string, body?: any): Chainable<Element>
    addWireTransferAccount(options?: any): Chainable<Element>
    dispatch(action: any): Chainable<Element>
    currentURL(options?: any): Chainable<Element>
    menuNavigateTo(target: string): Chainable<Element>
    getByEnv(desktopSelector: string, mobileSelector: string, options?: any): Chainable<Element>
    confirmEmail(user: { email: string }): Chainable
    uploadVideo(): Chainable
    checkIfUnchecked(): Chainable
    fillSimpleJobForm(job: any, skillNames?: string[]): Chainable
  }
}

beforeEach(() => {
  return cy.logout()
})

Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('uncaught:exception', err)
  // returning false here prevents Cypress from
  // failing the test
  return false
})
