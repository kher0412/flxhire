describe('Static Pages', () => {
  it('renders the homepage', () => {
    cy
      .visit('/')
      .get('[data-cy=main-cta]') // verify element is rendered
  })

  it('can reach the FAQ from homepage', () => {
    cy
      .visit('/')
      .menuNavigateTo('guest-navigation-faq')
      .currentURL().should('equal', '/faq')
  })

  it('FAQ works', () => {
    cy.visit('/faq')
  })

  it('can reach How it Works from homepage', () => {
    cy
      .visit('/')
      .menuNavigateTo('guest-navigation-how-it-works')
      .currentURL().should('equal', '/how_it_works')
  })

  it('How it Works works', () => {
    cy.visit('/how_it_works')
  })
})
