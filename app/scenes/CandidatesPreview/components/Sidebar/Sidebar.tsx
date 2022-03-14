import React from 'react'
import { Card } from '@material-ui/core'
import { IFreelancerType, IFreelancerSubtype } from 'types'
import { Link } from 'components'
import { Button } from 'components/themed'
import FiltersPanel from 'scenes/ClientHire/components/FiltersPanel'
import styles from './Sidebar.module.css'

interface ISidebarProps {
  hideFilters?: boolean
  drawer?: boolean
  disabled?: boolean
  freelancerType: IFreelancerType
  freelancerSubtype: IFreelancerSubtype
}

export default class Sidebar extends React.PureComponent<ISidebarProps> {
  render() {
    const { hideFilters, drawer } = this.props

    if (hideFilters) return null

    if (drawer) {
      return (
        <div className={styles.container} style={{ marginTop: 12 }}>
          <FiltersPanel disabled firm={null} tab="potential" filterParams={{}} setFilterParam={(name: any) => null} />
          {this.renderActions()}
        </div>
      )
    }

    return (
      <Card raised className={styles.container}>
        <FiltersPanel disabled firm={null} tab="potential" filterParams={{}} setFilterParam={(name: any) => null} />
        {this.renderActions()}
        <div className={styles.arrow} />
      </Card>
    )
  }

  renderActions() {
    const { freelancerType, freelancerSubtype } = this.props

    return (
      <div className={styles.buttons}>
        <Button
          color="primary"
          muiComponent={Link}
          to={`/signup/client?freelancer_type=${freelancerType.id}&freelancer_subtype=${freelancerSubtype.id}&action=job`}
          fullWidth
        >
          Join now to filter experts
        </Button>
      </div>
    )
  }
}
