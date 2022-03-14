import React from 'react'

export default class ExpenseTypeHint extends React.Component<{}, {}> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <React.Fragment>
        Optionally classify this work as either a capital expense
        (CAPEX: work allocated to increase the value of a company asset and recorded on the balance sheet),
        or as an operating expense
        (OPEX: ongoing expenses occurred during regular course of business recorded on the profit &amp; loss statement)
      </React.Fragment>
    )
  }
}
