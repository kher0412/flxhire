import { submitProfile } from './ProfileSaga'

test('profile saga submits profile and redirects to job application', () => {
  const action = {
    formData: {},
  }
  const user = {
    status: 'pending',
    profile: { slug: 'rando' },
  }
  const jobApplications = [
    {
      status: 'job_application_draft',
      job_slug: 'random_job',
      firm_slug: 'coolcompany',
    },
  ]
  const saga = submitProfile(action)
  let next = saga.next()
  next = saga.next(user)
  expect(next.value.payload.fn.name).toEqual('updateUser')
  next = saga.next(user)
  expect(next.value.payload.fn.name).toEqual('getContracts')
  next = saga.next(jobApplications)
  expect(next.value.payload.fn.name).toEqual('sendSubmitProfile')
  next = saga.next({ ...user, status: 'unverified' })
  expect(next.value.payload.action.type).toEqual('flexhire/auth/SET_CURRENT_USER')
  next = saga.next()
  expect(next.value.payload.action.type).toEqual('flexhire/profile/SUBMIT_MY_PROFILE_SUCCESS')
  next = saga.next()
  expect(next.value.payload.fn.name).toEqual('updateRoute')
  expect(next.value.payload.args).toEqual(['/[...slugs]', '/coolcompany/random_job?applying=true'])
})
