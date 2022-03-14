import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import AddIcon from '@material-ui/icons/Add'
import { browserHistory } from 'services/router'
import { setFieldToEventValue } from 'services/stateManagement'

class UseQuestionDialog extends React.Component {
  state = {
    selectedJobSlug: null,
  }

  render() {
    const { question = {}, open, onClose, jobs = [] } = this.props
    const { selectedJobSlug } = this.state
    return (
      <ResponsiveDialog open={open} onClose={onClose}>
        <DialogTitle>{question.title}</DialogTitle>

        {question.description && (
          <DialogContent>
            <DialogContentText>{question.description}</DialogContentText>
          </DialogContent>
        )}

        <DialogContent>
          <DialogContentText>
            Choose which Job you want to add the Question to, or add it to a New Job.
          </DialogContentText>
        </DialogContent>

        <DialogContent>
          <Select
            value={selectedJobSlug || 0}
            onChange={this.changeSelectedJobSlug}
            fullWidth
            data-cy="select-job"
          >
            <MenuItem value={0} key={0} data-cy="select-job-0">New Job</MenuItem>
            {jobs.map(j => (
              <MenuItem value={j.slug} key={j.slug} data-cy={`select-job-${j.slug}`}>{j.title}</MenuItem>
            ))}
          </Select>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.closeDialog} data-cy="close-dialog">Close</Button>
          <Button
            color="primary"
            onClick={this.addQuestionToJob}
            data-cy="submit-dialog"
          >
            <AddIcon style={{ marginRight: '10px' }} /> Add
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  addQuestionToJob = () => {
    const { selectedJobSlug } = this.state
    const { question } = this.props
    if (selectedJobSlug) {
      browserHistory.push('/client/job/[id]', `/client/job/${selectedJobSlug}?question_title=${question.title}`)
    } else {
      browserHistory.push('/client/job/add_job/job', `/client/job/add_job/job?question_title=${question.title}`)
    }
  }

  changeSelectedJobSlug = setFieldToEventValue('selectedJobSlug').bind(this)
}

export default UseQuestionDialog
