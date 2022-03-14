import React from 'react'
import dynamic from 'services/dynamic'
import { FieldArrayFieldsProps, FieldArrayMetaProps } from 'redux-form'
import { getTotalHours, getTotalMinutes, getTotalCostForHours, formatTime, getDay } from 'services/timesheets'
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
import { MoreButtonMenu, TableActionCell } from 'components'
import MediaQuery from 'components/MediaQuery'
import moment from 'moment'
import { sortBy } from 'lodash'
import { trackError } from 'services/analytics'
import { Button, Box } from 'components/themed'
import { Currency } from 'types'
import { formatAsCurrency } from 'services/formatting'
import { AddCircle, Create, MoreVert } from '@material-ui/icons'
import { ContainerProps } from './TimeWorkedFieldsContainer'

const EditWorkItemDialog = dynamic(() => import(/* webpackChunkName: "EditWorkItemDialog" */'./components/EditWorkItemDialog'), { ssr: false }) as any

interface ITimeWorkedFieldsProps extends ContainerProps {
  fields: FieldArrayFieldsProps<any>
  meta: FieldArrayMetaProps
  editable?: boolean
  rate?: number
  currency?: Currency
}

interface ITimeWorkedFieldsState {
  currentWorkItemIndex: number
  editing: Boolean
}

export default class TimeWorkedFields extends React.Component<ITimeWorkedFieldsProps, ITimeWorkedFieldsState> {
  state = {
    currentWorkItemIndex: -1,
    editing: false,
  }

  render() {
    const { editable, values: activities } = this.props
    const { currentWorkItemIndex, editing } = this.state
    const values = this.getOrderedItems()

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box disableBottomPadding>
            <Typography variant="h5">
              Work Done
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <div style={{ maxWidth: '100%', width: '100%', overflow: 'hidden' }}>
            <MediaQuery maxWidth={1000}>
              {isMobile => isMobile ? this.renderMobile(values) : this.renderDesktop(values, activities)}
            </MediaQuery>
          </div>
        </Grid>

        {editable && (
          <Grid item xs={12}>
            <Box disableTopPadding disableBottomPadding>
              <Button color="secondary" onClick={this.handleAddButtonClick} data-cy="add-work-item">
                <AddCircle /> Add work item
              </Button>
            </Box>

            <EditWorkItemDialog
              open={currentWorkItemIndex >= 0}
              onSave={this.handleEditDialogClose}
              onCancel={this.handleRemoveEditItem}
              fieldName={`timesheet_entries.${currentWorkItemIndex}`}
              editing={editing}
            />
          </Grid>
        )}
      </Grid>
    )
  }

  renderDesktop(values, activities) {
    const { editable } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Work</TableCell>
            <TableCell>Project Code</TableCell>
            <TableCell>Fin. Alloc</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell align="right">Amount</TableCell>
            {editable && <TableActionCell />}
          </TableRow>
        </TableHead>

        <TableBody data-cy="work-done-table-body">
          {values.map((data) => {
            const activity = data.value
            return (
              <TableRow key={activity.id} data-cy="row">
                <TableCell>
                  {getDay(activity.start_time || activity.end_time)}
                </TableCell>

                <TableCell style={{ whiteSpace: 'pre-wrap', maxWidth: '220px', overflow: 'hidden', overflowWrap: 'break-word' }}>
                  {activity.description || '\u2014'}
                </TableCell>

                <TableCell>
                  {activity.project_code || '\u2014'}
                </TableCell>

                <TableCell style={{ textTransform: 'uppercase' }}>
                  {activity.expense_type || '\u2014'}
                </TableCell>

                <TableCell>
                  {formatTime(activity.start_time) || '\u2014'}
                </TableCell>

                <TableCell>
                  {formatTime(activity.end_time) || '\u2014'}
                </TableCell>

                <TableCell>
                  {this.getTotalTime(activity)}
                </TableCell>

                <TableCell align="right">
                  {this.getCost(activity)}
                </TableCell>

                {editable && (
                  <TableActionCell>
                    {this.renderActions(data.index)}
                  </TableActionCell>
                )}
              </TableRow>
            )
          })}

        </TableBody>

        <TableFooter data-cy="work-done-table-footer">
          <TableRow>
            <TableCell colSpan={6} />

            <TableCell>
              <strong>
                {this.getTotalTime(activities)}
              </strong>
            </TableCell>

            <TableCell align="right">
              <strong>
                {this.getTotalCost(activities)}
              </strong>
            </TableCell>

            {editable && <TableActionCell />}
          </TableRow>
        </TableFooter>
      </Table>
    )
  }

  renderMobile(values) {
    const { editable } = this.props
    return (
      <List>
        {values.map((data) => {
          const activity = data.value
          return (
            <ListItem>
              <ListItemText
                primary={`${getDay(activity.start_time || activity.end_time)} ${formatTime(activity.start_time)} to ${formatTime(activity.end_time)}`}
                secondary={`Project Code: ${activity.project_code || '-'} | Fin. Alloc.: ${activity.expense_type || '-'} | ${activity.description}`}
              />
              {editable && (
                <ListItemSecondaryAction>
                  {this.renderActions(data.index, true)}
                </ListItemSecondaryAction>
              )}
            </ListItem>
          )
        })}
      </List>
    )
  }

  renderActions(index: number, mobile: boolean = false) {
    const { fields } = this.props
    if (mobile) {
      return (
        <MoreButtonMenu icon={<MoreVert />} data-cy="expense-actions">
          <MenuItem onClick={() => this.handleEditButtonClick(index)}>Edit</MenuItem>
          <MenuItem onClick={() => fields.remove(index)}>Remove</MenuItem>
        </MoreButtonMenu>
      )
    }

    return (
      <div style={{ width: 48 }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => this.handleEditButtonClick(index)} data-cy="edit-work-item">
            <Create />
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Event handling
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  handleAddButtonClick = () => {
    const { fields, values } = this.props

    let day = moment()
    if (values?.length > 0) {
      // If there are other entries, use the highest entry's day + 1
      day = moment.max(values.map(v => moment(v.start_time))).add(1, 'days')
    }
    const start = day.startOf('day').add(9, 'hours')
    const end = start.clone().add(8, 'hours')

    fields.push({
      start_time: start,
      end_time: end,
    })

    this.setState({
      currentWorkItemIndex: fields.length,
    })
  }

  handleEditButtonClick = (index) => {
    this.setState({
      currentWorkItemIndex: index,
      editing: true,
    })
  }

  handleEditDialogClose = () => {
    // Do not allow closing the dialog if there is an error.
    // Instead, mark the fields as touched so the errors are displayed.
    if (this.props.syncErrors?.timesheet_entries) {
      let fieldsWithError = []
      try {
        fieldsWithError = Object.keys(this.props.syncErrors?.timesheet_entries[this.state.currentWorkItemIndex])
      } catch (error) {
        // On Safari Mobile, this code can crash for some reason. Sentry Error: https://sentry.io/organizations/flexhire/issues/1851970212/?project=169865
        // Also crashes on Edge sometimes: https://sentry.io/organizations/flexhire/issues/2282466959
        trackError(error)
      }
      this.props.touch(...fieldsWithError.map(f => `timesheet_entries.${this.state.currentWorkItemIndex}.${f}`))
    } else {
      this.setState({
        currentWorkItemIndex: -1,
        editing: false,
      })
    }
  }

  handleRemoveEditItem = () => {
    const { fields } = this.props
    const index = this.state.currentWorkItemIndex
    this.setState({
      currentWorkItemIndex: -1,
    }, () => fields.remove(index))
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Utilities
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  getOrderedItems = () => {
    const { fields } = this.props
    const data = fields.map((name, index) => {
      const value = fields.get(index)
      return {
        name,
        index,
        value,
        time_order: value.start_time ? moment(value.start_time).valueOf() : 0,
      }
    })
    return sortBy(data, 'time_order')
  }

  getTotalCost = (values) => {
    const { rate, currency } = this.props

    return formatAsCurrency(getTotalCostForHours(values, rate), { currency, removeEmptyCents: false })
  }

  getCost = (activity) => {
    const { rate, currency } = this.props

    return formatAsCurrency(getTotalCostForHours([activity], rate), { currency, removeEmptyCents: false })
  }

  getTotalTime = (activity) => {
    const argument = Array.isArray(activity) ? activity : [activity]

    const hours = getTotalHours(argument)
    const minutes = getTotalMinutes(argument)

    if (minutes > 0) {
      if (hours > 0) return `${hours}h${minutes}m`
      return `${minutes}m`
    }
    if (hours > 0) return `${hours}h`
    return '—'
  }
}
