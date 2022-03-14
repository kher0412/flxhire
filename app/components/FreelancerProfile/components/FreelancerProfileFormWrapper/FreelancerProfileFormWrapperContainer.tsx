import { connect } from 'react-redux'
import { RootState } from 'reducers'
import { IFreelancer } from 'types'
import { reduxForm } from 'redux-form'
import FreelancerProfileFormWrapper from './FreelancerProfileFormWrapper'

const readonlyFreelancerProfileForm = {
  form: 'readonlyFreelancerProfileForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
}

const availableAtDefault = new Date(Date.now() + 3600 * 1000).toString()

const mapStateToProps = (state: RootState, ownProps) => {
  const freelancer: IFreelancer = ownProps.freelancer || {}
  const profile = freelancer.profile
  let availableAt = profile.available_at

  if (availableAt == null || availableAt === undefined) {
    availableAt = availableAtDefault
  } else {
    availableAt = new Date(availableAt).toString()
  }

  return {
    initialValues: {
      id: profile.id,
      first_name: freelancer.first_name,
      last_name: freelancer.last_name,
      city: profile.city,
      blog_posts: freelancer.blog_posts || [],
      video_id: freelancer.video?.id,
      region: profile.region,
      country: profile.country,
      user_skills: freelancer.user_skills,
      full_address: profile.full_address,
      timeline_entries: freelancer.timeline_entries,
      answers: freelancer.answers,
      project_submissions: freelancer.project_submissions,
      managed_team_size: profile.managed_team_size,
      avatar_url: freelancer.avatar_url,
      status: freelancer.status || (freelancer['verified?'] ? 'accepted' : null),
      availability: profile.availability || 'available_now',
      visibility: profile.visibility || 'visibility_public',
      freelancer_rate: profile.rate === 0 ? undefined : profile.rate,
      annual_compensation: profile.annual_compensation,
      availability_type: profile.availability_type || [],
      job_types: profile.job_types || [],
      available_at: availableAt,
      freelancer_type_id: profile.freelancer_type_id,
      freelancer_subtype_ids: profile.freelancer_subtype_ids || [],
      text_introduction: profile.text_introduction,
      total_experience: profile.total_experience,
      can_work_in_the_us: profile.can_work_in_the_us,
      location_latitude: profile.location_latitude,
      location_longitude: profile.location_longitude,
      location_bounds_0: profile.location_bounds_0,
      location_bounds_1: profile.location_bounds_1,
      location_bounds_2: profile.location_bounds_2,
      location_bounds_3: profile.location_bounds_3,
      url_resume: freelancer.resume?.url,
      url_blog: profile.url_blog,
      url_dribbble: profile.url_dribbble,
      url_github: profile.url_github,
      url_linkedin: profile.url_linkedin,
    },
  }
}

export default connect(mapStateToProps)(reduxForm(readonlyFreelancerProfileForm)(FreelancerProfileFormWrapper as any))
