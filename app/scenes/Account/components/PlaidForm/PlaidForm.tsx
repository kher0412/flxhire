import React, { useCallback } from 'react'
import PlaidLink from 'react-plaid-link'
import Radio from '@material-ui/core/Radio'
import { ServerError } from 'components'
import { useAPIRead, useAPIWrite, useCurrentUser, useOnMount, useSnackbar } from 'hooks'
import { useRouter } from 'next/router'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IPaymentMethod } from 'types'
import styles from './PlaidForm.module.css'
import StripeBankAccountSetupButton from '../StripeForm/StripeBankAccountSetupButton'
import ACHCreditSetupButton from '../StripeForm/ACHCreditSetupButton'

function createACHCreditIfMissing(banks: IPaymentMethod[]): Promise<IPaymentMethod> {
  const achCreditBanks = banks.filter(x => x.payment_method_type === 'ach_credit_transfer')
  if (achCreditBanks.length === 0) {
    return getAPIClient().createPaymentMethod({ payment_method_type: 'ach_credit_transfer' }).catch(error => trackError(error))
  }
  return Promise.resolve(banks[0])
}

export interface IPlaidFormProps {
  checked: boolean
  handleChange: () => any
}

const PlaidForm = (props: IPlaidFormProps) => {
  const { handleChange, checked } = props
  const router = useRouter()
  const [user] = useCurrentUser()

  const enableSepaDebit = user?.configuration?.payment_method_types?.includes('sepa_debit')
  const enablePlaid = user?.configuration?.payment_method_types?.includes('plaid_link')
  const enableACHCredit = user?.configuration?.payment_method_types?.includes('ach_credit_transfer')

  const showSnackbarMessage = useSnackbar()
  const bankAccounts = useAPIRead(() => getAPIClient().getPaymentMethods({ except_cards: true }), { defaultValue: [] })
  const createBankAccount = useAPIWrite(params => (
    getAPIClient().createPaymentMethod(params).then(() => {
      showSnackbarMessage('Bank connected successfully')
      bankAccounts.refresh()
    })
  ))
  const createPlaidBankAccount = useCallback((token, metadata) => createBankAccount.submit({
    payment_method_type: 'plaid_link',
    token: token,
    account_id: metadata.account_id,
    mask: metadata.account.mask,
    name: metadata.account.name,
    institution_name: metadata.institution.name,
  }), [])
  const achCreditBank = bankAccounts.value.filter(x => x.payment_method_type === 'ach_credit_transfer')[0]
  const bank = bankAccounts.value.filter(x => ['sepa_debit', 'plaid_link'].indexOf(x.payment_method_type) >= 0)[0]
  useOnMount(async () => {
    const stripeSessionId = router?.query?.stripe_session_id
    const stripeSessionType = router?.query?.stripe_session_type
    if (stripeSessionId && stripeSessionType === 'sepa_debit') {
      try {
        await getAPIClient().createPaymentMethod({ payment_method_type: 'sepa_debit', session_id: stripeSessionId })
        showSnackbarMessage('Bank connected successfully')
      } catch (error) {
        trackError(error)
        showSnackbarMessage('Could not connect bank')
      }
    }
    await bankAccounts.refresh()
    if (enableACHCredit) {
      await createACHCreditIfMissing(bankAccounts.value)
      await bankAccounts.refresh()
    }
  })

  return (
    <div>
      <div className={styles.radio}>
        <Radio
          checked={checked}
          onChange={handleChange}
          value="bank"
          name="default-payment-method-bank-account"
        />

        Pay with bank account
      </div>

      <ServerError error={createBankAccount.error} />

      {bank && (
        <p>
          We have your bank account
          {' '}
          {bank.name}
          {' '}
          {bank.institution_name && `with the ${bank.institution_name} bank `}
          saved for you
        </p>
      )}

      {!bank && (
        <React.Fragment>
          <p>
            Flexhire uses Plaid and Stripe to connect your bank account,
            industry standards in bank account integration.
          </p>
          <p>
            By using this method, your bank credentials are safe with Plaid and Stripe and
            are not transmitted to nor stored by Flexhire.
          </p>
          {enableACHCredit && (
            <p>
              If you are a US customer, you can also pay by bank transfer.
            </p>
          )}
          <div data-cy="plaid-link-container" className={styles['buttons-container']}>
            {enablePlaid && (
            <PlaidLink
              clientName="Flexhire"
              env={process.env.PLAID_ENV}
              product={['auth']}
              publicKey={process.env.PLAID_KEY}
              onSuccess={createPlaidBankAccount}
              className={styles['button-plaidlink']}
              disabled={bank}
            >
              Add US Bank Account
            </PlaidLink>
            )}
            {enableSepaDebit && <StripeBankAccountSetupButton />}
            {enableACHCredit && <ACHCreditSetupButton bank={achCreditBank} />}
          </div>
        </React.Fragment>
      )}

    </div>
  )
}

export default PlaidForm
