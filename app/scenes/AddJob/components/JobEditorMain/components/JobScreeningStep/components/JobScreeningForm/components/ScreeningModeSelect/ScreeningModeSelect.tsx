import React from 'react'
import { RadioGroup, FormControlLabel, Radio, Grid, Collapse, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { FormValue, IProject, IQuestion } from 'types'
import InfoMessage from 'components/themed/InfoMessage'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { Button } from 'components/themed'
import styles from './ScreeningModeSelect.module.css'

export interface IScreeningModeSelectProps {
  auto_send_screening_requests: FormValue<boolean>
  questions: FormValue<IQuestion[]>
  project: FormValue<IProject>
  screening_mode: FormValue<number>
  onEnabledStateChange?: (isEnabled: boolean) => void
}

export interface IScreeningModeSelectState {
  selectionValue: number
  isClearDialogOpen: boolean
}

export default class ScreeningModeSelect extends React.Component<IScreeningModeSelectProps, IScreeningModeSelectState> {
  constructor(props: IScreeningModeSelectProps) {
    super(props)

    let defaultSelectionValue = 0

    // This component is also a field component for the 'auto_send_screening_requests' job field.
    // If it's set, auto-initialize to the automatic-screening option.
    if (props.auto_send_screening_requests.input.value) {
      defaultSelectionValue = 2
    } else if (props.project.input.value || props.questions.input.value?.length) {
      defaultSelectionValue = 1
    }

    this.state = {
      selectionValue: defaultSelectionValue,
      isClearDialogOpen: false,
    }
  }

  componentDidMount() {
    if (this.state.selectionValue !== 0 && this.props.onEnabledStateChange) {
      this.props.onEnabledStateChange(true)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IScreeningModeSelectProps) {
    if (nextProps.auto_send_screening_requests.input.value !== this.props.auto_send_screening_requests.input.value) {
      this.setState(state => ({
        // eslint-disable-next-line no-nested-ternary
        selectionValue: nextProps.auto_send_screening_requests.input.value ? 2 : (state.selectionValue === 2 ? 1 : state.selectionValue),
      }))
    } else if (this.state.selectionValue === 0) {
      if (
        (!this.props.project.input.value && nextProps.project.input.value) ||
        (!this.props.questions.input.value?.length && nextProps.questions.input.value?.length)
      ) {
        this.setState({
          selectionValue: 1, // manual
        })
      }
    }
  }

  render() {
    const { selectionValue } = this.state
    const isEnabled = (selectionValue !== 0)

    return (
      <div className={styles.container} style={{ paddingTop: isEnabled ? 12 : 0 }}>
        {this.renderClearDialog()}

        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <div className={styles.radio}>
              <RadioGroup value={selectionValue} onChange={this.handleChange}>
                <FormControlLabel
                  value={0}
                  control={<Radio color="primary" data-cy="screening-mode-none" />}
                  label="No Screening"
                />

                <FormControlLabel
                  value={2}
                  control={<Radio color="primary" data-cy="screening-mode-automatic" />}
                  label="Automatic Screening"
                />

                <FormControlLabel
                  value={1}
                  control={<Radio color="primary" data-cy="screening-mode-manual" />}
                  label="Manual Screening"
                />
              </RadioGroup>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Collapse in={isEnabled}>
              {this.renderInfoMessage()}
            </Collapse>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderInfoMessage() {
    switch (this.state.selectionValue) {
      case 1:
        // Manual Screening
        return (
          <InfoMessage key={1} className={styles.infoMessage}>
            In manual mode, by clicking on the 'screen' button on each application to your job you manually request them to answer the screening requirements you configure on this page.
            That sends them a customizable message (below) which you can configure on this page.
            This setting can be changed at any time.
          </InfoMessage>
        )

      case 2:
        // Automatic Screening
        return (
          <InfoMessage key={2} className={styles.infoMessage}>
            In automatic mode, after each person applies to your job, a customizable message (below) gets sent automatically asking them to complete the screening requirements you configure on this page.
            This setting can be changed at any time.
          </InfoMessage>
        )
    }

    return null
  }

  renderClearDialog() {
    const { isClearDialogOpen } = this.state

    if (!isClearDialogOpen) return null

    return (
      <ResponsiveDialog open onClose={this.handleClearDialogClose}>
        <DialogTitle>
          Screening Mode
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Setting screening mode to "No Screening" will clear your previously configured questions and code tests from this job.
            Continue?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClearDialogClose}>
            Cancel
          </Button>

          <Button color="secondary" onClick={() => this.setScreeningMode(0)}>
            Clear and continue
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleClearDialogClose = () => {
    this.setState({
      isClearDialogOpen: false,
    })
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { questions, project } = this.props
    const mode = parseInt(e.target.value, 10)

    if (mode === 0 && (questions.input.value.length > 0 || project.input.value)) {
      // require confirmation
      this.setState({
        isClearDialogOpen: true,
      })
    } else {
      this.setScreeningMode(mode)
    }
  }

  setScreeningMode(mode: number) {
    const { questions, project } = this.props

    this.setState({
      selectionValue: mode,
      isClearDialogOpen: false,
    })

    if (mode === 0) {
      questions.input.onChange([])
      project.input.onChange(null)
    }

    // Set 'auto_send_screening_requests' field if set to automatic screening mode.
    this.props.auto_send_screening_requests.input.onChange(mode === 2)

    this.props.screening_mode.input.onChange(mode)

    if (this.props.onEnabledStateChange) {
      this.props.onEnabledStateChange(mode !== 0)
    }
  }
}
