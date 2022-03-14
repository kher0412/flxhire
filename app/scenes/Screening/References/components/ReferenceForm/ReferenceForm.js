import React from 'react'
import { RadioButtons, ServerError } from 'components'
import { Button, TextField } from 'components/themed'

import { reduxForm, Field } from 'redux-form'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/icons/Menu'
import Done from '@material-ui/icons/Done'
import Pending from '@material-ui/icons/HourglassEmpty'
import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

import MediaQuery from 'components/MediaQuery'
import { connect } from 'react-redux'
import { Divider } from '@material-ui/core'
import { getAPIClient } from 'api'
import { Reference } from '../Reference'
import { submitReferenceForm, setReferences } from './ReferenceFormDucks'
import styles from '../../../Screening.module.css'

class _ReferenceFormComponent extends React.Component {
  relationOptions = [
    { label: 'Friends', value: 'friend' },
    { label: 'Work colleague', value: 'coworker' },
    { label: 'Classmate', value: 'classmate' },
    { label: 'I was a client', value: 'client' },
    { label: 'Other', value: 'other' },
  ]

  professionalOptions = [
    { label: '5 - Expert', value: '5' },
    { label: '4 - Very good', value: '4' },
    { label: '3 - Good', value: '3' },
    { label: '2 - Basic', value: '2' },
    { label: '1 - Poor', value: '1' },
  ]

  recommendOptions = [
    { label: 'Yes', value: '5' },
    { label: 'No', value: '1' },
  ]

  componentDidMount() {
    this.props.getReferences()
  }

  render() {
    const { handleSubmit, pristine, submitting, submitForm, serverError, name } = this.props

    return (
      <div>
        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">
                Step 2 - Professional References
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Please provide at least <strong>two</strong> professional references from
                either a previous company, client, or a work colleague who can tell us how awesome you are.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {this.references()}
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 24 }}>
                <Grid container spacing={3} alignItems="flex-start" className={styles.fields}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Field name="name" label="Name" component={TextField} fullWidth />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Field name="email" label="Email" component={TextField} fullWidth />
                  </Grid>

                  <Grid item xs={12} sm={12} md={1}>
                    <Button
                      type="submit"
                      color="primary"
                      fullWidth
                      data-cy="send-reference"
                      disabled={pristine || submitting}
                    >
                      Send
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <ServerError error={serverError} />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={styles.box}>
          <div className={styles['reference-example']}>
            <div className={styles.note}>Your reference will receive the following email from Flexhire</div>
            <Paper>
              <AppBar position="static" style={{ backgroundColor: grey['800'] }}>
                <Toolbar>
                  <IconButton>
                    <Menu style={{ color: '#FFF' }} />
                  </IconButton>
                  <Typography style={{ fontSize: '2rem', color: '#FFF' }}>
                    Flexhire
                  </Typography>
                </Toolbar>
              </AppBar>

              <div className={styles.title}>Reference for {name}</div>
              <br />
              <div className={styles.fields}>
                <Field name="complete_reference_token" component={() => { return null }} />
                <Field name="reference_name" disabled label="Enter your full name" component={TextField} style={{ width: '35%' }} />
                <div className={styles.statement}>How do you know {name}?</div>
                <Field name="relation" disabled options={this.relationOptions} component={RadioButtons} />
                <div className={styles.statement}>How well would you rate their professional talents?</div>
                <Field name="rating_professional" disabled options={this.professionalOptions} component={RadioButtons} />
                <div className={styles.statement}>Would you recommend {name}?</div>
                <Field name="would_recommend" disabled options={this.recommendOptions} component={RadioButtons} />
                <Field
                  name="comments"
                  disabled
                  multiLine
                  rows={3}
                  label="Please leave any additional comments. Thank you"
                  component={TextField}
                  style={{ width: '70%' }}
                />
              </div>
              <div style={{ padding: '20px' }}>All feedback is completely anonymous</div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }

  references() {
    const { references } = this.props

    if (references.length > 0) {
      return (
        <div>
          <MediaQuery maxDeviceWidth={1223}>
            {this.renderMobileReference(references)}
          </MediaQuery>
          <MediaQuery minDeviceWidth={1224}>
            {this.renderDesktopReference(references)}
          </MediaQuery>
        </div>
      )
    }
  }

  renderMobileReference(references) {
    const buildAvatar = (reference) => {
      const DoneAvatar = (
        <Avatar style={{ backgroundColor: green['700'] }}>
          <Done />
        </Avatar>
      )
      const PendingAvatar = (
        <Avatar style={{ backgroundColor: yellow['700'] }}>
          <Pending />
        </Avatar>
      )
      return reference.status === 'completed' ? DoneAvatar : PendingAvatar
    }

    const buildPrimaryText = ({ name, email }) => (
      <div style={{ wordBreak: 'break-word' }}>
        <div>{name}</div>
        <div>{email}</div>
      </div>
    )
    return (
      <List>
        {references.map(reference => (
          <ListItem key={reference.id} button>
            <ListItemIcon>
              {buildAvatar(reference)}
            </ListItemIcon>
            <ListItemText primary={buildPrimaryText(reference)} secondary={reference.status} />
          </ListItem>
        ))}
      </List>
    )
  }

  renderDesktopReference(references) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-cy="reference-table-body">
          {references.map(reference => <Reference reference={reference} key={reference.id} />)}
        </TableBody>
      </Table>
    )
  }
}

export const ReferenceFormComponent = _ReferenceFormComponent

const form = {
  form: 'profileReference',
  validate: (values) => {
    const errors = {}
    if (!values.name) { errors.name = 'Required' }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  },
}

const mapStateToProps = (state) => {
  const user = state.auth.currentUser
  return {
    serverError: state.screening.referenceForm.serverError,
    references: state.screening.referenceForm.references,
    name: `${user.first_name} ${user.last_name}`,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData) => { dispatch(submitReferenceForm(formData)) },
    getReferences: async () => {
      const references = await getAPIClient().getReferences()
      dispatch(setReferences(references))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(form)(ReferenceFormComponent))
