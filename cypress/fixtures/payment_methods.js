export const stripeBankAccounts = [
  {
    payment_method_type: 'plaid_link',
    customer_id: 'cus_EZTSg6qbkPTcZB',
    account_id: 'my_bank_account_id',
    mask: 'test',
    name: 'My Test Account',
    institution_name: 'TestyBanky',
  },
]

export const stripeCards = [
  {
    payment_method_type: 'card',
    account_id: 'card_1E6KVdK8GwmAZBWkNQF3OzQz',
    customer_id: 'cus_EZTSg6qbkPTcZB',
    mask: '4242',
    token: 'tok_1E6KVdK8GwmAZBWkcRC5bbKz',
    exp_month: 12,
    exp_year: 2022,
    cvc_check: true,
    cardholder_name: 'Ernst Tripe',
  },
]
