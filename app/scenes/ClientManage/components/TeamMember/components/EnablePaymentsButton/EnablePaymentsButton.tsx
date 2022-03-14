import React from 'react'
import { Field } from 'redux-form'
import {
  DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core'
import moment from 'moment'
import { ResponsiveDialog } from 'components'
import { DatePicker, Button, NumberField } from 'components/themed'
import { IContractForClient } from 'types'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { debounce } from 'lodash'
import { formatAsCurrency } from 'services/formatting'
import { CheckCircle } from '@material-ui/icons'
import { ContainerProps } from './EnablePaymentsButtonContainer'

interface IEnablePaymentsButtonProps extends ContainerProps {
  contract: IContractForClient
}

interface IEnablePaymentsButtonState {
  isDialogOpen: boolean
  loadingPreview: boolean
  contractPreview: IContractForClient
  previewError: string
}

export default class EnablePaymentsButton extends React.Component<IEnablePaymentsButtonProps, IEnablePaymentsButtonState> {
  state = {
    isDialogOpen: false,
    loadingPreview: false,
    contractPreview: null as IContractForClient,
    previewError: null,
  }

  componentDidMount() {
    if (this.props.clientRate) this.getContractPreview()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clientRate !== this.props.clientRate) this.getContractPreview()
  }

  render() {
    const { contract } = this.props
    if (!contract || contract.invitation_type !== 'invitation' || contract.payments_enabled) return null
    return (
      <React.Fragment>
        <Button
          responsive
          color="primary"
          onClick={this.handleDialogOpen}
        >
          <CheckCircle /> Payments
        </Button>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { handleSubmit } = this.props
    const { isDialogOpen } = this.state

    if (isDialogOpen) {
      return (
        <ResponsiveDialog open onClose={this.handleDialogClose}>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <DialogTitle>
              Enable payments processing
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Enable work report tracking, contract management, taxation & payment processing for this contract.
                Flexhire will fully automate payment based on submitted and approved timesheets.
              </DialogContentText>

              <Field
                name="client_rate"
                label="Hourly rate"
                component={NumberField}
                numDecimals={2}
                fullWidth
              />

              <Field
                name="end_date"
                label="Contract end date"
                component={DatePicker}
                minDate={moment().add(1, 'day').toDate()}
                autoOk
                fullWidth
              />

              {this.renderMarginNotice()}
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleDialogClose}>
                Cancel
              </Button>

              <Button color="primary" type="submit">
                Enable Payments
              </Button>
            </DialogActions>
          </form>
        </ResponsiveDialog>
      )
    }

    return null
  }

  renderMarginNotice = () => {
    const { contractPreview: contract, loadingPreview, previewError } = this.state

    return (
      <DialogContentText style={{ marginTop: 24 }} data-cy="margin-notice">
        {previewError && `Error Previewing Rate: ${previewError}`}

        {loadingPreview && !previewError && '...'}

        {!loadingPreview && !previewError && contract?.invitation_type === 'invitation' && (
          <div>
            Note: for this contract, where {contract.freelancer.first_name} was invited by you to Flexhire,
            we charge a margin of {contract.margin}% for contract management,
            1099 taxation handling and payment distribution;
            thus, {contract.freelancer.first_name} will receive
            {' '}
            {formatAsCurrency(contract.freelancer_rate, { currency: contract.currency })}
            {' '}
            per {contract.rate_mode}.<br />
            <br />
          </div>
        )}

        {!loadingPreview && !previewError && contract?.invitation_type === 'hire' && (
          <div>
            Note: for this contract, where {contract.freelancer.first_name} was sourced by Flexhire,
            we charge a margin of {contract.margin}% for contract management,
            1099 taxation handling and payment distribution;
            thus, {contract.freelancer.first_name} will receive
            {' '}
            {formatAsCurrency(contract.freelancer_rate, { currency: contract.currency })}
            {' '}
            per {contract.rate_mode}.<br />
            <br />
          </div>
        )}
      </DialogContentText>
    )
  }

  handleSubmit = (formData) => {
    const { submitForm, contract } = this.props

    submitForm(contract.id, formData)

    this.setState({
      isDialogOpen: false,
    })
  }

  handleDialogOpen = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  getContractPreview = debounce(async () => {
    try {
      const formData = {
        payments_enabled: true,
        client_rate: this.props.clientRate,
      }
      this.setState({ loadingPreview: true, contractPreview: null, previewError: null })
      const contractPreview = await getAPIClient().updateContract(this.props.contract.id, formData, true)
      if (contractPreview) {
        this.setState({ contractPreview, loadingPreview: false, previewError: null })
      } else {
        this.setState({ loadingPreview: false, previewError: 'Something went wrong' })
      }
    } catch (error) {
      this.setState({ previewError: error.response || error.message, loadingPreview: false })
      trackError(error)
    }
  }, 1000)
}
