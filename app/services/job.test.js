import { isRateMatching } from './job'

describe('isRateMatching', () => {
  it('returns true when rate equals the job rate', () => {
    const match = isRateMatching({ profile: { rate: 10 } }, { position_types: ['freelancer'], freelancer_rate: 10 })
    expect(match).toEqual(true)
  })

  it('returns true when rate equals the min job rate', () => {
    const match = isRateMatching({ profile: { rate: 10 } }, { position_types: ['freelancer'], min_freelancer_rate: 10 })
    expect(match).toEqual(true)
  })

  it('returns true when rate is within range', () => {
    const match = isRateMatching({ profile: { rate: 15 } }, { position_types: ['freelancer'], min_freelancer_rate: 10, freelancer_rate: 20 })
    expect(match).toEqual(true)
  })

  it('returns true when rate is below range', () => {
    const match = isRateMatching({ profile: { rate: 5 } }, { position_types: ['freelancer'], min_freelancer_rate: 10, freelancer_rate: 20 })
    expect(match).toEqual(true)
  })

  it('returns false when rate is above range', () => {
    const match = isRateMatching({ profile: { rate: 25 } }, { position_types: ['freelancer'], min_freelancer_rate: 10, freelancer_rate: 20 })
    expect(match).toEqual(false)
  })

  it('returns true when rate is above range but position type is not freelancer', () => {
    const match = isRateMatching({ profile: { rate: 25 } }, { position_types: ['permanent'], min_freelancer_rate: 10, freelancer_rate: 20 })
    expect(match).toEqual(true)
  })
})
