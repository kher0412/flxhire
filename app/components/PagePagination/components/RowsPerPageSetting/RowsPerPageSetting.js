import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import styles from './RowsPerPageSetting.module.css'

export default class RowsPerPageSetting extends React.Component {
  render() {
    const { value, onChange } = this.props

    return (
      <div className={styles.container}>
        <Select value={value} onChange={e => onChange && onChange(e.target.value)} className={styles.select}>
          <MenuItem value={5}>
            5 per page
          </MenuItem>

          <MenuItem value={10}>
            10 per page
          </MenuItem>

          <MenuItem value={25}>
            25 per page
          </MenuItem>

          <MenuItem value={50}>
            50 per page
          </MenuItem>
        </Select>
      </div>
    )
  }
}
