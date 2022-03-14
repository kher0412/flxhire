import React from 'react'
import {
  Divider,
  Grid,
  Typography,
  MenuItem,
} from '@material-ui/core'
import { Field } from 'redux-form'
import { GridExpandable, Link } from 'components'
import { SelectField, Button, InfoMessage, TextArea, TextField, InputGroup, InputGroupHelpButton, Box, CheckboxField } from 'components/themed'
import { useAvoidBillingSetupDialog, useCurrentUser } from 'hooks'
import { Currency } from 'types'
import { Help, Save } from '@material-ui/icons'
import { InvoicesFormContainerProps } from './InvoicesFormContainer'

function InvoicesForm(props: InvoicesFormContainerProps) {
  const { submitting, pristine, handleSubmit, submitForm, unifyInvoicesInPreferredCurrency } = props
  const [user] = useCurrentUser()
  const currencies = user.configuration?.supported_currencies || [{ code: user.firm?.currency || 'USD' } as Currency]

  useAvoidBillingSetupDialog()

  return (
    <form onSubmit={handleSubmit(formData => submitForm(formData))}>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h4">
              Invoice Settings
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              These fields allow you to customize how we invoice you.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">
              Company Invoice Settings
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              These settings affect your entire company.
            </Typography>
          </Grid>

          <Grid item md={12} />

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputGroup>
                  <Field
                    name="unify_invoices_in_preferred_currency"
                    component={CheckboxField}
                    label="Convert all invoices to one currency"
                    fullWidth
                  />

                  <InputGroupHelpButton title="Convert all invoices to one currency">
                    The Flexhire fees such as open jobs, manager fees etc are invoiced in USD while the payroll for your
                    team is invoiced in the currency set on each of their individual contracts.
                    <br />
                    <br />
                    However, should you enable this option, all the
                    Flexhire fees and payroll items will be invoiced in one currency, at the live exchange rate
                    at the moment of invoice creation.
                  </InputGroupHelpButton>
                </InputGroup>
              </Grid>

              <GridExpandable item xs={12} expand={unifyInvoicesInPreferredCurrency && currencies.length > 0}>
                <InputGroup>
                  <Field
                    name="currency"
                    component={SelectField}
                    label="Preferred Invoice Currency"
                    fullWidth
                  >
                    {currencies.map(v => (
                      <MenuItem value={v.code} key={v.code}>{v.code}</MenuItem>
                    ))}
                  </Field>

                  <InputGroupHelpButton title="Preferred Currency">
                    This field determines the currency we invoice you in for the payroll and the Flexhire fees such as open jobs and manager fees etc
                    which are specfied in your associated <Link to="/account/plans">Payment Plan</Link>, when the unify invoices in one currency option is enabled.
                    <br />
                    <br />
                    The default is USD and should you choose EUR and enable the Unify invoices in one currency option,
                    we will invoice you on the live equivalent Euro amount at the date of invoice
                    based on our exchange rate policy.
                  </InputGroupHelpButton>
                </InputGroup>
              </GridExpandable>
            </Grid>

          </Grid>

          {user.configuration?.allow_changing_auto_invoice_charge && (
            <Grid item xs={12} md={6}>
              <InputGroup>
                <Field
                  name="allow_invoice_auto_charge"
                  label="Auto-pay due invoices"
                  component={CheckboxField}
                  fullWidth
                />
                <InputGroupHelpButton title="Auto-pay due invoices">
                  When this setting is enabled, invoices are automatically paid using your preferred payment method
                  (cards and connected bank accounts).
                  If not enabled, care must be taken to pay invoices manually before their due date.
                  We recommend enabling it for a smoother experience.
                  <InfoMessage>
                    When enabled, funds sent via manual bank transfers will be automatically used to pay invoices as soon as we receive them.
                  </InfoMessage>
                </InputGroupHelpButton>
              </InputGroup>
            </Grid>
          )}

          {currencies.length <= 1 && (
            // Grid filler
            <Grid item xs={12} sm={12} md={6} />
          )}

          {!user.configuration?.allow_changing_auto_invoice_charge && (
            // Grid filler
            <Grid item xs={12} sm={12} md={6} />
          )}

          <Grid item xs={12}>
            <InputGroup>
              <Field
                name="additional_invoice_text"
                label="Additional Invoice Text"
                style={{ minHeight: 200 }}
                component={TextArea}
                placeholder="This field allows you to enter in any additional text you want to appear on every company invoice"
              />

              <InputGroupHelpButton title="Additional Invoice Text">
                Should you want any custom text to appear on all your invoices for your company, such as custom vendor numbers etc, you can write it here.
                Make sure to write it exactly as you wish the text to appear on the invoice.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>

          <Grid item xs={12} sm={12}>
            <InputGroup>
              <Field
                name="emails_for_invoices"
                fullWidth
                label="Additional emails to receive invoices (comma separated)"
                component={TextField}
              />

              <InputGroupHelpButton title="Additional emails for invoices">
                Should you want all Flexhire invoices to your company to be emailed to any specific email addresses
                other than that of the manager associated with each invoice you can write them here in a comma separated list.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">
              Your Individual Invoice Settings
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              These settings only affect invoices where you are the assigned recipient.
            </Typography>
          </Grid>

          <Grid item md={12} />

          <Grid item xs={12} sm={12} md={4}>
            <InputGroup>
              <Field name="purchase_order_number" fullWidth label="Purchase Order Number" component={TextField} />

              <InputGroupHelpButton title="Purchase Order Number">
                Should you want any payroll invoices associated only with your account to have a specific purchase order number on it you can add that here.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <InputGroup>
              <Field
                name="additional_invoice_text_user"
                component={TextArea}
                style={{ minHeight: 200 }}
                label="Additional Invoice Text"
                placeholder="This field allows you to enter in any additional text you want to appear on invoices where you are the assigned recipient"
              />

              <InputGroupHelpButton title="Additional Invoice Text">
                Should you want any custom text to appear on all invoices where you are the assigned recipient
                (such as custom vendor numbers, etc), you can write it here.
                Make sure to write it exactly as you wish the text to appear on the invoice.
                <br />
                <br />
                Note, this text will be added to invoices where you are the assigned recipient <strong>in addition</strong> to
                the company-level additional invoice text.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box style={{ textAlign: 'right' }}>
        <Button color="primary" type="submit" disabled={submitting || pristine} data-cy="invoices-save-button">
          <Save /> Save
        </Button>
      </Box>
    </form>
  )
}

export default React.memo(InvoicesForm)
