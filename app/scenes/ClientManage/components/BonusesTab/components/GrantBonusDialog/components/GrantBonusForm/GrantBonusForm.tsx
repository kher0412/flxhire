import { useState, memo } from 'react'
import { DialogActions, DialogContent, Grid } from '@material-ui/core'
import { Button, SelectField, DatePicker, CheckboxField, InputGroup } from 'components/themed'
import { Field } from 'redux-form'
import { Suspense } from 'components'
import ContractBonusAmountField from 'components/themed/ContractBonusAmountField'
import { IGrantBonusFormContainerProps } from './GrantBonusFormContainer'
import BonusRecipientSelectField, { IBonusContractCurrency } from './components/BonusRecipientSelectField'

export interface IGrantBonusFormPayload {
  contractId: string
  clientAmount: number
  startDate: string
  endDate: string
  autoApprove: boolean
}

export interface IGrantBonusFormProps {
  submitForm: (formData: IGrantBonusFormPayload, currencyCode: string) => any
  onCancel: () => void
}

function GrantBonusForm(props: IGrantBonusFormProps & IGrantBonusFormContainerProps) {
  const { handleSubmit, contractIdFieldValue, submitForm, onCancel } = props

  // TODO: this approach is not so nice, but we need the contract currency based on the selected contract,
  // for which the bonus is granted, and currently it's only feasible to pull it out of its own field,
  // an alternative is also storing the currency as a form field, and then getting rid of it, but that's also smelly
  const [currency, setCurrency] = useState<IBonusContractCurrency>()

  const submitAction = (formData: IGrantBonusFormPayload) => {
    submitForm(formData, currency?.code)
  }

  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={(<SelectField disabled fullWidth label="Recipient" />)}>
              <Field
                name="contractId"
                component={BonusRecipientSelectField}
                onCurrencyChange={setCurrency}
              />
            </Suspense>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputGroup>
              <Field
                name="clientAmount"
                component={ContractBonusAmountField}
                contractId={contractIdFieldValue}
                currency={currency}
              />
            </InputGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <Field
              name="startDate"
              component={DatePicker}
              label="Period Start"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field
              name="endDate"
              component={DatePicker}
              label="Period End"
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="autoApprove"
              component={CheckboxField}
              label="Approve now"
              disableBorder
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>

        <Button color="secondary" type="submit" data-cy="submit-bonus">
          Grant Bonus
        </Button>
      </DialogActions>
    </form>
  )
}

export default memo(GrantBonusForm)
