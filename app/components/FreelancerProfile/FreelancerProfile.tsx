/* eslint camelcase: 0 */

import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Field, Fields, FieldArray } from 'redux-form'
import { Divider, Tabs, Tab, Collapse } from '@material-ui/core'
import { IFreelancerType, IVideo } from 'types'
import { Summary } from './components/Summary'
import UserSkillsFields from './components/fields/UserSkillsFields'
import TimelineEntriesField from './components/fields/TimelineEntriesField'
import VideoAnswersField from './components/fields/VideoAnswersField'
import ProjectSubmissionsField from './components/fields/ProjectSubmissionsField'
import VideoField from './components/fields/VideoField'
import BlogPostsField from './components/fields/BlogPostsField'
import styles from './FreelancerProfile.module.css'
import ErrorBadge from './components/ErrorBadge'

export interface IFreelancerProfileProps {
  editable: boolean
  liteMode: boolean
  defaultTab?: number
  freelancerTypes: IFreelancerType[]
  backgroundCheckCompleted?: boolean
  currentVideo?: IVideo
  timezone?: string
  rate?: number
  errors?: any
}

interface IFreelancerProfileState {
  currentTab: number
}

export default class FreelancerProfile extends React.PureComponent<IFreelancerProfileProps, IFreelancerProfileState> {
  state = {
    currentTab: 0,
  }

  tabsWrapperElement: any

  componentDidMount() {
    const { defaultTab } = this.props

    if (this.props.defaultTab) {
      this.setState({
        currentTab: defaultTab,
      })

      window.setTimeout(() => {
        if (this.tabsWrapperElement) {
          this.tabsWrapperElement.scrollIntoView()
        }
      }, 2000) // TODO: instead of a hard delay, use a more reactive approach
    }
  }

  componentDidUpdate(prevProps) {
    // Switch to timeline tab if there are timeline errors.
    if (this.props.errors?.timeline_entries?._error && !prevProps.errors?.timeline_entries?._error) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentTab: 0,
      })
    }
  }

  render() {
    const { editable, children, freelancerTypes, backgroundCheckCompleted, currentVideo, timezone, rate, errors, liteMode } = this.props
    const { currentTab } = this.state

    return (
      <div className={styles.freelancer} data-cy="freelancer">
        <div className={styles.container}>
          <div className={styles['freelancer-container']}>
            <div>
              <Summary
                freelancerTypes={freelancerTypes}
                backgroundCheckCompleted={backgroundCheckCompleted}
                editable={editable}
                liteMode={liteMode}
                timezone={timezone}
                rate={rate}
              />

              <Collapse mountOnEnter unmountOnExit in={!liteMode}>
                <Fields
                  names={['user_skills', 'freelancer_type_id']}
                  component={UserSkillsFields}
                  editable={editable}
                />

                <div className={styles.actions}>
                  {children}
                </div>

                <Field
                  name="video_id"
                  component={VideoField}
                  editable={editable}
                  currentVideo={currentVideo}
                />

                <MediaQuery maxWidth={900}>
                  <Divider />
                </MediaQuery>

                <div ref={div => this.tabsWrapperElement = div}>
                  <Tabs
                    className={styles.tabs}
                    value={currentTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab
                      label={(
                        <React.Fragment>
                          <MediaQuery minWidth={501}>
                            Work & Education <ErrorBadge count={errors?.timeline_entries?._error ? 1 : 0} />
                          </MediaQuery>

                          <MediaQuery maxWidth={500}>
                            Timeline <ErrorBadge count={errors?.timeline_entries?._error ? 1 : 0} />
                          </MediaQuery>
                        </React.Fragment>
                      )}
                      className={styles.tab}
                      data-cy="tab-work-education"
                    />

                    <Tab
                      label={(
                        <React.Fragment>
                          <MediaQuery minWidth={501}>
                            Video Answers
                          </MediaQuery>

                          <MediaQuery maxWidth={500}>
                            Answers
                          </MediaQuery>
                        </React.Fragment>
                      )}
                      className={styles.tab}
                      data-cy="tab-video-answers"
                    />

                    <Tab
                      label={(
                        <React.Fragment>
                          <MediaQuery minWidth={501}>
                            Sample Work
                          </MediaQuery>

                          <MediaQuery maxWidth={500}>
                            Samples
                          </MediaQuery>
                        </React.Fragment>
                      )}
                      className={styles.tab}
                      data-cy="tab-sample-work"
                    />

                    <Tab
                      label="Posts"
                      className={styles.tab}
                      data-cy="tab-posts"
                    />
                  </Tabs>
                </div>

                <div style={{ display: currentTab === 0 ? 'block' : 'none' }}>
                  {/* "Work & Education" tab */}
                  <FieldArray
                    name="timeline_entries"
                    component={TimelineEntriesField}
                    editable={editable}
                  />
                </div>

                {currentTab === 1 && (
                  // "Video Answers" tab
                  <Field
                    name="answers"
                    component={VideoAnswersField}
                    editable={editable}
                  />
                )}

                {currentTab === 2 && (
                  // "Sample Work" tab
                  // TODO: only show this tab if sample work submissions are enabled for freelancer type
                  <Field
                    name="project_submissions"
                    component={ProjectSubmissionsField}
                    editable={editable}
                  />
                )}

                {currentTab === 3 && (
                  // "Posts" tab
                  <Field
                    name="blog_posts"
                    component={BlogPostsField}
                    editable={editable}
                  />
                )}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleTabChange = (e, tabIndex) => {
    this.setState({
      currentTab: tabIndex,
    })
  }
}
