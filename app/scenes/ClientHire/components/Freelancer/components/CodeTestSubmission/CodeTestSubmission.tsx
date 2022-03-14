import React from 'react'
import { ListItem, List, ListItemIcon, ListItemText, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { ExternalLink, ResponsiveDialog, FreelancerCardInfoItem, Picture } from 'components'
import { Button } from 'components/themed'
import ReactMarkdown from 'react-markdown'
import { CheckCircle, Link } from '@material-ui/icons'

interface ICodeTestSubmissionProps {
  projectSubmission: {
    description: string
    url: string
    screenshot_url: string
  }
  freelancer: {
    first_name: string
  }
}

export default class CodeTestSubmission extends React.PureComponent<ICodeTestSubmissionProps, { isDialogOpen: boolean }> {
  state = {
    isDialogOpen: false,
  }

  render() {
    const { projectSubmission } = this.props

    if (!projectSubmission) return null

    return (
      <React.Fragment>
        <FreelancerCardInfoItem
          button
          onClick={this.handleOpen}
          icon={<CheckCircle />}
          primary="Completed"
          secondary="Code Test"
        />

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { projectSubmission, freelancer } = this.props

    if (!this.state.isDialogOpen || !projectSubmission || !freelancer) return null

    return (
      <ResponsiveDialog open onClose={this.handleClose} maxWidth="md">
        <div style={{ width: 99999 }} />

        <DialogTitle>
          Code test submission by {freelancer.first_name}
        </DialogTitle>

        <DialogContent>
          <List disablePadding>
            <ListItem style={{ paddingLeft: 6, paddingRight: 0 }}>
              <ListItemIcon style={{ marginRight: 0, minWidth: 39 }}>
                <Link />
              </ListItemIcon>

              <ListItemText
                style={{ padding: 0 }}
                primary={(
                  <ExternalLink
                    style={{
                      display: 'inline-block',
                      lineHeight: '1em',
                      verticalAlign: 'middle',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    href={projectSubmission.url}
                    label={projectSubmission.url}
                  />
                )}
              />
            </ListItem>
          </List>

          {projectSubmission.screenshot_url && (
            <div
              style={{
                margin: '24px -24px',
                padding: '24px 0 12px 0',
                width: 'calc(100% + 48px)',
                textAlign: 'center',
                borderTop: '1px solid rgba(0, 0, 0, 0.1',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }}
            >
              <Picture src={projectSubmission.screenshot_url} alt="Screenshot" /><br />

              <div style={{ fontSize: '12px', marginTop: 12, color: 'rgba(0, 0, 0, 0.6)' }}>
                Screenshot
              </div>
            </div>
          )}

          {projectSubmission.description && (
            <DialogContentText>
              <ReactMarkdown source={projectSubmission.description} />
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleOpen = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
