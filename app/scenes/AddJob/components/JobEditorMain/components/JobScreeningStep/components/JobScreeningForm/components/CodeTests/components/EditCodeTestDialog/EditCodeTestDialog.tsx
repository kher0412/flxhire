import React from 'react'
import { Button, DialogTitle, DialogContent, DialogActions, Grid } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { TextField, TextArea } from 'components/themed'
import { IProject } from 'types'
import styles from './EditCodeTestDialog.module.css'

export interface IEditCodeTestDialogProps {
  codeTest: Partial<IProject>
  open: boolean
  onChange: (project: Partial<IProject>) => void
  onClose: () => void
}

export interface IEditCodeTestDialogState {
  temporaryCodeTest: Partial<IProject>
}

export default class EditCodeTestDialog extends React.Component<IEditCodeTestDialogProps, IEditCodeTestDialogState> {
  constructor(props) {
    super(props)

    this.state = {
      temporaryCodeTest: props.codeTest || {},
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (this.props.codeTest !== nextProps.codeTest) {
      this.setState({
        temporaryCodeTest: nextProps.codeTest || {},
      })
    }
  }

  render() {
    const { codeTest, open, onClose } = this.props
    const { temporaryCodeTest } = this.state

    if (!open) {
      return null
    }

    return (
      <ResponsiveDialog open maxWidth="md" onClose={onClose}>
        <div className={styles.spanner} />

        <DialogTitle>
          {!codeTest && 'Create new code test'}
          {codeTest && 'Edit code test'}
        </DialogTitle>

        <DialogContent style={{ paddingBottom: 12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={temporaryCodeTest?.title}
                label="Title"
                onChange={this.handleTitleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextArea
                label="Description"
                value={temporaryCodeTest?.description}
                placeholder="Code test details..."
                onChange={this.handleDescriptionChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button color="primary" onClick={this.handleSave}>
            {!codeTest && 'Create'}
            {codeTest && 'Save'}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleTitleChange = (e) => {
    const { target: { value } } = e

    this.setState(state => ({
      temporaryCodeTest: {
        ...state.temporaryCodeTest,
        title: value,
      },
    }))
  }

  handleDescriptionChange = (e) => {
    const { target: { value } } = e

    this.setState(state => ({
      temporaryCodeTest: {
        ...state.temporaryCodeTest,
        description: value,
      },
    }))
  }

  handleSave = () => {
    const { onChange, onClose, codeTest } = this.props
    const { temporaryCodeTest } = this.state

    if (onClose) {
      onClose()
    }

    if (onChange) {
      onChange({
        ...(codeTest || {}),
        ...temporaryCodeTest,
      })
    }
  }
}
