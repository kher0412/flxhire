export const skipOnCI = (name: string, callback: () => void) => (Cypress.env('SHIPPABLE') ? it.skip(`SKIPPED: ${name}`, callback) : it(name, callback))
export const skipOnDocker = (name: string, callback: () => void) => (Cypress.env('RUN_ENV') === 'DOCKER' ? it.skip(`SKIPPED: ${name}`, callback) : it(name, callback))
export const slugify = (string: string) => string.toLowerCase().replace(/[^0-9a-zA-Z ]/g, '').replace(/[ ]/g, '-')
