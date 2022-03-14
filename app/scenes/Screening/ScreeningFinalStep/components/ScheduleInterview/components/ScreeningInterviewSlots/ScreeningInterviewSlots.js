import React from 'react'
import { isEmpty } from 'lodash'
import MediaQuery from 'components/MediaQuery'
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardActions,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
  Paper
} from '@material-ui/core'
import {
  ConfirmButton,
  Pagination,
  InfoMessage,
  LoadingPage,
  PagePlaceholder
} from 'components'

const statusMap = {
  available: 'Available',
  postponed: 'Postponed',
  booked: 'Booked'
}

class ScreeningInterviewSlots extends React.Component {

  componentDidMount() {
    this.props.getScreeningInterviews()
  }

  onChangePage = (event, page) => {
    const params = {
      page: page,
      rowsPerPage: this.props.pagination.rowsPerPage
    }
    this.props.onChangePage(params)
  }

  onChangeRowsPerPage = (event) => {
    const params = {
      rowsPerPage: event.target.value
    }
    this.props.onChangeRowsPerPage(params)
  }

  renderPagination = () => {
    return (
      <Pagination
        count={this.props.pagination.count}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={this.props.pagination.rowsPerPage}
        page={this.props.pagination.page}
        onChangePage={this.onChangePage}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
      />
    )
  }

  handleItemBookClick = (slot) => (event) => {
    this.props.bookSlot(slot.id)
  }

  getBookDialogProps = (slot) => {
    return {
      dialogTitle: 'Confirm Booking',
      dialogMessage: (
        <div>
          Your video conference will start at <strong>{this.renderDateTime(slot)}</strong>
        </div>
      ),
      dialogConfirmLabel: 'Book this slot'
    }
  }

  renderDateTime(slot) {
    const m = new moment(slot.datetime)
    return `${m.format('LLL')} - ${m.fromNow()}`
  }

  renderDate(slot) {
    const m = new moment(slot.datetime)
    return m.format('dddd, MMMM Do YYYY')
  }

  renderTime(slot) {
    const m = new moment(slot.datetime)
    return m.format('h:mm:ss a')
  }

  renderSlotDistance(slot) {
    const m = new moment(slot.datetime)
    return m.fromNow(true)
  }

  renderStatus(slot) {
    return statusMap[slot.status] || 'Unknown'
  }

  renderDesktopTable() {
    return (
      <Paper>
        <div>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Starts In</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.interviewSlots.map((slot, index) =>
                <TableRow
                  key={index}
                  hover
                >
                  <TableCell data-cy={`interviews-date-${index}`}>
                    {this.renderDate(slot)}
                  </TableCell>

                  <TableCell data-cy={`interviews-time-${index}`}>
                    {this.renderTime(slot)}
                  </TableCell>

                  <TableCell data-cy={`interviews-starts-${index}`}>
                    {this.renderSlotDistance(slot)}
                  </TableCell>

                  <TableCell>
                    <ConfirmButton
                      variant='contained'
                      color='primary'
                      onClick={this.handleItemBookClick(slot)}
                      {...this.getBookDialogProps(slot)}
                      fullWidth
                      data-cy={`interviews-book-${index}`}
                    >Book</ConfirmButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              {this.renderPagination()}
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }

  renderMobilePagination = () => {
    return (
      <Table>
        <TableFooter>
          <Pagination
            count={this.props.pagination.count}
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={this.props.pagination.rowsPerPage}
            page={this.props.pagination.page}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    )
  }

  renderMobileTable() {
    return (
      <div>
        {this.renderMobilePagination()}
        {this.props.interviewSlots.map((slot, index) => {
          return (
            <Card key={index}>
              <CardHeader
                title={<div> <p>{this.renderDateTime(slot)}</p> </div>}
                subtitle={this.renderStatus(slot)}
              />
              <CardActions>
                <ConfirmButton
                  variant='contained'
                  color='primary'
                  onClick={this.handleItemBookClick(slot)}
                  fullWidth
                  data-cy={`interviews-book-${index}`}
                >Book</ConfirmButton>
              </CardActions>
            </Card>
          )
        })}
        {this.renderMobilePagination()}
      </div>
    )
  }

  renderContent () {
    const {
      interviewSlotsReceived,
      interviewSlots
    } = this.props
    if (!interviewSlotsReceived) {
      return <LoadingPage />
    } else if (isEmpty(interviewSlots)) {
      return <PagePlaceholder
        title='No available Interview Slots at this time'
        subtitle='Contact us at info@flexhire.com'
      />
    } else {
      return (
        <div>
          <MediaQuery maxDeviceWidth={1224}>
            {this.renderMobileTable()}
          </MediaQuery>
          <MediaQuery minDeviceWidth={1224}>
            {this.renderDesktopTable()}
          </MediaQuery>
        </div>
      )
    }
  }

  render() {
    return <div>
      <InfoMessage>
        Slots are displayed in your timezone. If there are no slots that suit you, contact us at info@flexhire.com
      </InfoMessage>
      {this.renderContent()}
    </div>
  }
}

export default ScreeningInterviewSlots
