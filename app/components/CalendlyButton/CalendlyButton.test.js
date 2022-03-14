import { getCalendlyOptions } from './CalendlyButton'

describe('CalendlyButton', () => {
  it('does not use real email', () => {
    const user = { email: 'realemail@veryreal.com' }
    const options = getCalendlyOptions(user)
    expect(options.prefill.email === user.email).toEqual(false)
    expect(typeof options.prefill.email).toEqual('string')
  })
})
