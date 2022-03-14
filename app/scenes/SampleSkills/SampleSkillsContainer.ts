import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { GET_TOP_FREELANCERS, GET_SKILL } from './SampleSkillsDucks'
import SampleSkills from './SampleSkills'
import { RootState } from 'reducers'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'

const mapStateToProps = (state: RootState) => ({
  skill: state.sampleSkills.skill,
  skillReceived: state.sampleSkills.skillReceived,
  topFreelancers: state.sampleSkills.topFreelancers,
  topFreelancersReceived: state.sampleSkills.topFreelancersReceived,
})

const mapDispatchToProps = dispatch => ({
  getSkill: skillSlug => dispatch(createAction(GET_SKILL)({ slug: skillSlug })),
  getTopFreelancers: (skillSlug, freelancerTypeName) => dispatch(createAction(GET_TOP_FREELANCERS)({ slug: skillSlug, freelancerTypeName })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(SampleSkills))

