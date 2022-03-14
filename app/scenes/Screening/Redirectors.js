import { get } from 'lodash'

const paths = {
  applying: '/application/introduction',
  references: '/application/references',
  submitApplication: '/application/interview',
  interview: '/application/interview',
  applied: '/application/interview',
}

export function getApplicationPathForUser(user) {
  if (user.status === 'interview') {
    return paths.interview
  } if (user.status === 'applying') {
    if (!user.video?.url) {
      return paths.applying
    } if (get(user, 'references', []).filter(r => r.status === 'completed').length < 2) {
      return paths.references
    }
    return paths.submitApplication
  } if (user.status === 'applied') {
    return paths.applied
  }
  return paths.applying
}
