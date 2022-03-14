import React from 'react'
import ReactMarkdown from 'react-markdown'
import { DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemIcon, Collapse } from '@material-ui/core'
import { ResponsiveDialog, LoadingIcon } from 'components'
import { trackError } from 'services/analytics'
import { IProject } from 'types'
import { AddCircle } from '@material-ui/icons'
import styles from './ExistingCodeTestsBrowser.module.css'
import { ExistingCodeTestsBrowserContainerProps } from './ExistingCodeTestsBrowserContainer'

export interface IExistingCodeTestsBrowserProps {
  open: boolean
  onAdd: (codeTest: IProject) => void
  onClose: () => void
}

export interface IExistingCodeTestsBrowserState {
  codeTests: IProject[]
  codeTestsReceived: boolean
  openedCodeTestId: number
}

export default class ExistingCodeTestsBrowser extends React.Component<IExistingCodeTestsBrowserProps & ExistingCodeTestsBrowserContainerProps, IExistingCodeTestsBrowserState> {
  state: IExistingCodeTestsBrowserState = {
    codeTests: [],
    codeTestsReceived: false,
    openedCodeTestId: undefined,
  }

  async componentDidMount() {
    try {
      this.setState({
        codeTests: await this.props.getCodeTests({ per_page: 10 }),
        codeTestsReceived: true,
      })
    } catch (error) {
      trackError(error)
    }
  }

  render() {
    const { open, onClose } = this.props
    const { codeTests, codeTestsReceived, openedCodeTestId } = this.state

    if (!open) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={onClose}>
        <DialogTitle>
          Browse Existing Code Tests
        </DialogTitle>

        <DialogContent>
          <List>
            {(codeTests.length === 0 && !codeTestsReceived) && (
              <ListItem>
                <ListItemIcon>
                  <LoadingIcon />
                </ListItemIcon>

                <ListItemText secondary="Loading..." />
              </ListItem>
            )}

            {codeTests.map(codeTest => (
              <React.Fragment key={codeTest.id}>
                <ListItem
                  key={codeTest.id}
                  button
                  onClick={() => this.handleItemClick(codeTest)}
                  className={codeTest.id === openedCodeTestId ? 'open-item' : undefined}
                >
                  <ListItemText primary={codeTest.title} />
                </ListItem>

                <Collapse in={codeTest.id === openedCodeTestId}>
                  <div className={styles.collapse}>
                    <div className={styles['code-test-description']}>
                      <ReactMarkdown source={codeTest.description || 'No description.'} />
                    </div>

                    <div>
                      <Button color="primary" onClick={() => this.handleItemAddClick(codeTest)}>
                        <AddCircle className={styles['button-icon']} /> Add
                      </Button>
                    </div>
                  </div>
                </Collapse>
              </React.Fragment>
            ))}

            {(codeTests.length === 0 && codeTestsReceived) && (
              <ListItem>
                <ListItemText secondary="No results" />
              </ListItem>
            )}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleItemClick = (codeTest: IProject) => {
    this.setState(state => ({
      openedCodeTestId: (state.openedCodeTestId === codeTest.id) ? undefined : codeTest.id,
    }))
  }

  handleItemAddClick = (codeTest: IProject) => {
    const { onAdd } = this.props

    if (onAdd) {
      onAdd(codeTest)
    }
  }
}
