import React from 'react'
import { Field, Fields } from 'redux-form'
import { Collapse, Divider } from '@material-ui/core'
import { Tags } from 'components'
import { IFreelancerType } from 'types'
import styles from './Summary.module.css'
import NameFields from '../fields/NameFields'
import FreelancerTypeField from '../fields/FreelancerTypeField'
import TextIntroductionField from '../fields/TextIntroductionField'
import AvatarField from '../fields/AvatarField'
import LocationFields from '../fields/LocationFields'
import RateFields from '../fields/RateFields'
import FreelancerSubtypesFields from '../fields/FreelancerSubtypesFields'
import SocialLinksFields from '../fields/SocialLinksFields'
import BadgesArea from './components/BadgesArea'

interface ISummaryProps {
  editable: boolean
  liteMode: boolean
  freelancerTypes: IFreelancerType[]
  backgroundCheckCompleted?: boolean
  timezone: string
  rate: number
}

export default class Summary extends React.PureComponent<ISummaryProps> {
  render() {
    const { editable, freelancerTypes, backgroundCheckCompleted, timezone, rate, liteMode } = this.props

    return (
      <div className={styles.summary} data-cy="summary">
        <div className={styles['map-wrapper']}>
          <Fields
            names={[
              'location_latitude',
              'location_longitude',
              'location_bounds_0',
              'location_bounds_1',
              'location_bounds_2',
              'location_bounds_3',
              'full_address',
              'city',
              'region',
              'country',
            ]}
            component={LocationFields}
            editable={editable}
          />
        </div>

        <div className={styles.headline}>
          <Field
            name="avatar_url"
            component={AvatarField}
            editable={editable}
          />

          <div className={styles.name} data-cy="profile-summary">
            {editable && (
              <React.Fragment>
                <Fields
                  names={['first_name', 'last_name']}
                  component={NameFields}
                  editable={editable}
                />

                <Field
                  name="freelancer_type_id"
                  component={FreelancerTypeField}
                  freelancerTypes={freelancerTypes}
                  editable={editable}
                />
              </React.Fragment>
            )}

            {!editable && (
              <Tags>
                <Fields
                  names={['first_name', 'last_name']}
                  component={NameFields}
                  editable={editable}
                />

                <Field
                  name="freelancer_type_id"
                  component={FreelancerTypeField}
                  freelancerTypes={freelancerTypes}
                  editable={editable}
                />
              </Tags>
            )}
          </div>

          <Collapse mountOnEnter unmountOnExit in={!liteMode}>
            {editable && (
              <Divider className={styles.divider} />
            )}

            <Fields
              names={['managed_team_size', 'status', 'availability', 'can_work_in_the_us', 'availability_type']}
              component={BadgesArea}
              backgroundCheckCompleted={backgroundCheckCompleted}
              editable={editable}
              timezone={timezone}
            />

            <div className={styles.actions}>
              <Fields
                names={['url_blog', 'url_github', 'url_linkedin', 'url_dribbble', 'url_resume']}
                component={SocialLinksFields}
                editable={editable}
              />
            </div>

            <div className={styles.rateWrapper} style={editable ? undefined : { marginBottom: 0 }}>
              <Fields
                // Rate and compensation
                names={['job_types', 'freelancer_rate', 'annual_compensation', 'total_experience']}
                component={RateFields}
                editable={editable}
                rate={rate}
              />
            </div>

            <Divider className={styles.divider} />

            <div className={styles.subtypes}>
              <Fields
                // Freelancer subtypes
                names={['freelancer_type_id', 'freelancer_subtype_ids']}
                component={FreelancerSubtypesFields}
                editable={editable}
              />
            </div>

            {editable && (
              <Divider className={styles.divider} />
            )}

            <div className={styles.introduction} data-cy="text-introduction">
              <Field
                name="text_introduction"
                component={TextIntroductionField}
                editable={editable}
              />
            </div>
          </Collapse>

          <Collapse mountOnEnter unmountOnExit in={liteMode}>
            <div
              // spacer
              style={{ height: 48 }}
            />
          </Collapse>
        </div>
      </div>
    )
  }
}
