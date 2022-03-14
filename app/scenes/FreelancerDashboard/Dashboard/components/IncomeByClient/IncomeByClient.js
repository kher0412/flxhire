import React from 'react'
import styles from './IncomeByClient.module.css'
import { Card, CardHeader } from '@material-ui/core'
import { Doughnut as DoughnutChart } from 'react-chartjs'

class IncomeByClient extends React.PureComponent {
  render() {
    const totalByClient = this.getTotalByClient()
    const maxTotal = Array.from(totalByClient.values()).reduce((a, b) => Math.max(a, b), 0)

    const data = Array.from(totalByClient.keys()).map(clientId => {
      const total = totalByClient.get(clientId)
      const contract = this.props.runningContracts.find(contract => contract.client.id === clientId)

      const colorAlpha = total / maxTotal
      const colorAlphaHL = total / maxTotal * 0.9

      return {
        value: total,
        label: contract ? contract.client.name : '-',
        color: `rgba(63, 81, 181, ${colorAlpha})`,
        highlight: `rgba(63, 81, 181, ${colorAlphaHL})`
      }
    })

    return (
      <Card className={styles.container}>
        <CardHeader
          title={<span className={styles.title}>Income by client</span>}
        />

        <div className={styles.chart}>
          <DoughnutChart
            data={data}
            options={{
              responsive: true,
              percentageInnerCutout: 66,
              segmentStrokeWidth: 4
            }}
          />
        </div>
      </Card>
    )
  }

  getTotalByClient() {
    const clientIdToTotal = new Map()

    for (const timesheet of this.props.timesheets) {
      const timesheetHoursTotal = parseInt(timesheet.total_to_pay_for_hours_freelancer, 10)

      if (!clientIdToTotal.has(timesheet.client_id)) {
        clientIdToTotal.set(timesheet.client_id, timesheetHoursTotal)
      } else {
        clientIdToTotal.set(timesheet.client_id, timesheetHoursTotal + clientIdToTotal.get(timesheet.client_id))
      }
    }

    return clientIdToTotal
  }
}

export default IncomeByClient
