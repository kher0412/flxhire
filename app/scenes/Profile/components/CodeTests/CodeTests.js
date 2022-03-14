import React from 'react'
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { ConfirmButton } from 'components'
import { Delete } from '@material-ui/icons'

export default class CodeTests extends React.PureComponent {
  render() {
    const { codeTests = [], onDeleteProjectSubmission = () => undefined } = this.props

    return (
      <div>
        <List>
          {codeTests.map(codeTest => (
            <ListItem>
              <ListItemText
                primary={codeTest.title}
                secondary={codeTest.public ? 'Public' : 'Private'}
              />

              <ListItemSecondaryAction>
                <ConfirmButton
                  icon
                  tooltip="Delete sample work submission"
                  dialogTitle="Delete sample work submission"
                  onClick={() => onDeleteProjectSubmission(codeTest.id)}
                >
                  <Delete />
                </ConfirmButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}
