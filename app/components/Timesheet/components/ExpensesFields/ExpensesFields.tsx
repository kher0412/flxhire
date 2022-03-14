import React from 'react'
import dynamic from 'services/dynamic'
import MediaQuery from 'components/MediaQuery'
import { WrappedFieldArrayProps } from 'redux-form'
import moment from 'moment'
import { DATE_FORMAT, formatAsCurrency } from 'services/formatting'
import { getTotalCostForExpenses } from 'services/timesheets'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Grid,
  Typography,
} from '@material-ui/core'
import { Condition, MoreButtonMenu } from 'components'
import { Button, Box } from 'components/themed'
import { Currency } from 'types'
import { AddCircle, CloudDownload, Create, MoreVert } from '@material-ui/icons'
import styles from './ExpensesFields.module.css'
import { ContainerProps } from './ExpensesFieldsContainer'

const EditExpenseDialog = dynamic(() => import(/* webpackChunkName: "EditExpenseDialog" */'./components/EditExpenseDialog'), { ssr: false }) as any

interface IExpensesFieldsProps {
  editable: boolean
  currency: Currency
}

interface IExpensesFieldsState {
  currentWorkItemIndex: number
}

export default class ExpensesFields extends React.PureComponent<IExpensesFieldsProps & WrappedFieldArrayProps & ContainerProps, IExpensesFieldsState> {
  state = {
    currentWorkItemIndex: -1,
  }

  render() {
    const { editable, currency } = this.props
    const { currentWorkItemIndex } = this.state

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box disableBottomPadding>
            <Typography variant="h5">
              Expenses
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <MediaQuery maxWidth={1000}>
            {isMobile => isMobile ? this.renderMobile() : this.renderDesktop()}
          </MediaQuery>
        </Grid>

        {editable && (
          <Grid item xs={12}>
            <Box disableTopPadding disableBottomPadding>
              <Button color="secondary" onClick={this.handleAddButtonClick} data-cy="add-expense">
                <AddCircle /> Add expense
              </Button>
            </Box>

            <EditExpenseDialog
              open={currentWorkItemIndex >= 0}
              onSave={this.handleEditDialogClose}
              onCancel={this.removeEditField}
              fieldName={`expenses.${currentWorkItemIndex}`}
              currency={currency}
            />
          </Grid>
        )}
      </Grid>
    )
  }

  renderDesktop() {
    const { fields, editable, currency } = this.props

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Receipt</TableCell>
            <TableCell>Project Code</TableCell>
            <TableCell>Fin. Alloc</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody data-cy="expenses-table-body">
          {fields.map((name, expenseIndex) => {
            const expense = fields.get(expenseIndex)
            return (
              <React.Fragment>
                <TableRow key={expense.id} data-cy="row">
                  <TableCell>
                    {expense.expense_date ? moment(expense.expense_date).format(DATE_FORMAT) : ''}
                  </TableCell>

                  <TableCell>
                    {expense.description}
                  </TableCell>

                  <TableCell>
                    {expense.receipt_url && (
                      <a href={expense.receipt_url} target="_blank" className={styles.link} rel="noopener noreferrer">
                        receipt
                      </a>
                    )}
                  </TableCell>

                  <TableCell>
                    {expense.project_code || '-'}
                  </TableCell>

                  <TableCell style={{ textTransform: 'uppercase' }}>
                    {expense.expense_type || '-'}
                  </TableCell>

                  <TableCell>
                    {formatAsCurrency(expense.amount, { currency, removeEmptyCents: false })}
                  </TableCell>

                  <TableCell style={{ paddingRight: 0, width: 48 }}>
                    {editable && this.renderActions(expenseIndex)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          })}
        </TableBody>

        <TableFooter data-cy="expenses-footer">
          <Condition condition={fields.length === 0}>
            <TableRow>
              <TableCell colSpan={7}>
                No expenses associated with this work report
              </TableCell>
            </TableRow>
          </Condition>

          <Condition condition={fields.length > 0}>
            <TableRow>
              <TableCell colSpan={6} />

              <TableCell>
                {this.getTotal()}
              </TableCell>
            </TableRow>
          </Condition>
        </TableFooter>
      </Table>
    )
  }

  renderMobile() {
    const { fields } = this.props

    return (
      <List disablePadding>
        {fields.map((name, expenseIndex) => {
          const expense = fields.get(expenseIndex)
          const date = expense.expense_date ? moment(expense.expense_date).format(DATE_FORMAT) : 'N/A'

          return (
            <ListItem>
              <ListItemText
                primary={`${date} - ${expense.description}`}
                secondary={`$${expense.amount} | Project Code: ${expense.project_code || '-'} | Fin. Alloc.: ${expense.expense_type || '-'}`}
              />
              <ListItemSecondaryAction>
                {this.renderActions(expenseIndex, true)}
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}

        <Condition condition={fields.length === 0}>
          <ListItem>
            <ListItemText
              secondary="No expenses associated with this work report"
            />
          </ListItem>
        </Condition>
      </List>
    )
  }

  renderActions(expenseIndex: number, mobile: boolean = false) {
    const { fields, editable } = this.props

    if (mobile) {
      if (editable) {
        return (
          <MoreButtonMenu icon={<MoreVert />} data-cy="expense-actions">
            <MenuItem onClick={() => window.location = fields.get(expenseIndex).receipt_url}>Download Receipt</MenuItem>
            <MenuItem onClick={() => this.handleEditButtonClick(expenseIndex)}>Edit</MenuItem>
            <MenuItem onClick={() => fields.remove(expenseIndex)}>Remove</MenuItem>
          </MoreButtonMenu>
        )
      }

      return <IconButton onClick={() => window.location = fields.get(expenseIndex).receipt_url}><CloudDownload /></IconButton>
    }

    return (
      <React.Fragment>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => this.handleEditButtonClick(expenseIndex)}
            data-cy="edit-expense"
          >
            <Create />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    )
  }

  getTotal = () => {
    const { fields, currency } = this.props
    return formatAsCurrency(getTotalCostForExpenses(fields.getAll()), { currency, removeEmptyCents: false })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Event handling
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  handleAddButtonClick = () => {
    const { fields } = this.props

    fields.push({
      expense_date: moment(),
    })

    this.setState({
      currentWorkItemIndex: fields.length,
    })
  }

  handleEditButtonClick = (index) => {
    this.setState({
      currentWorkItemIndex: index,
    })
  }

  handleEditDialogClose = () => {
    // Do not allow closing the dialog if there is an error.
    // Instead, mark the fields as touched so the errors are displayed.
    const errors = this.props.syncErrors?.expenses?.[this.state.currentWorkItemIndex]
    if (errors) {
      console.log('Expense errors', errors)
      const fieldsWithError = Object.keys(errors)
      this.props.touch(...fieldsWithError.map(f => `expenses.${this.state.currentWorkItemIndex}.${f}`))
    } else {
      this.setState({
        currentWorkItemIndex: -1,
      })
    }
  }

  removeEditField = () => {
    const { fields } = this.props
    const index = this.state.currentWorkItemIndex
    this.setState({
      currentWorkItemIndex: -1,
    }, () => fields.remove(index))
  }
}
