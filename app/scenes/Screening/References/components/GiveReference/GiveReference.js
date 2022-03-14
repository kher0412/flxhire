import { Component } from 'react'
import { Field, change } from 'redux-form'
import { Divider } from '@material-ui/core'
import { RadioButtons, FormErrorSummary, PageWrapper } from 'components'
import { Button, TextField, TextArea } from 'components/themed'
import { get, pickBy } from 'lodash'
import { extractQueryParams } from 'services/router'
import { relationOptions, professionalOptions, recommendOptions } from './selectOptions'
import styles from './GiveReference.module.css'

class GiveReference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOther: get(props, 'initialValues.relation') === 'other',
    }
  }

  componentDidMount() {
    const { router, getUser, formAction } = this.props
    const query = extractQueryParams(router.asPath)
    if (query.user_id) getUser(query.user_id)
    if (query.complete_reference_token) {
      formAction(change('profileGiveReference', 'complete_reference_token', query.complete_reference_token))
    }
  }

  handleRelation = (value) => {
    const selectedValue = Object.values(pickBy(value, i => typeof i === 'string')).join('')
    this.setState({ isOther: selectedValue === 'other' })
  }

  render() {
    const { handleSubmit, submitting, serverError, user, submitFailed } = this.props
    const { isOther } = this.state
    const name = user.name || 'this person'

    return (
      <div className={styles.container}>
        <div className={styles.reference}>
          <PageWrapper raised>
            <div className={styles.title}>Reference for {name}</div>
            <form onSubmit={handleSubmit(this.props.submitForm)}>
              <div className={styles.fields}>
                <Field name="complete_reference_token" component={() => null} />
                <Field name="name" label="Enter your full name" component={TextField} />
                <div className={styles.statement}>How do you know {name}?</div>
                <Field
                  name="relation"
                  options={relationOptions}
                  component={RadioButtons}
                  onChange={this.handleRelation}
                />

                {isOther && (
                  <Field name="other_relation" label={`How do you know ${name}?`} component={TextField} />
                )}

                <div className={styles.statement}>How well would you rate their professional talents?</div>
                <Field name="rating_professional" options={professionalOptions} component={RadioButtons} />

                <div className={styles.statement}>Would you recommend {name}?</div>
                <Field name="would_recommend" options={recommendOptions} component={RadioButtons} />

                <div style={{ marginTop: 24 }}>
                  <Field
                    name="comments"
                    label="Additional comments"
                    placeholder="Please leave any additional comments, thank you."
                    component={TextArea}
                  />
                </div>
              </div>

              <Divider className={styles.divider} />

              <div className={styles['button-container']}>
                <FormErrorSummary show={submitFailed || serverError} message={serverError} />

                <Button type="submit" disabled={submitting} color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </PageWrapper>
        </div>
      </div>
    )
  }
}

export default GiveReference
