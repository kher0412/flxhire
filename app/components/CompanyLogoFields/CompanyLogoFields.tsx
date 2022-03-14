import React from 'react'
import { Collapse, IconButton, Tooltip } from '@material-ui/core'
import { FormValue } from 'types'
import { pickAndStore } from 'services/filestack'
import { Picture } from 'components'
import { Button } from 'components/themed'
import { Delete, Image } from '@material-ui/icons'
import styles from './CompanyLogoFields.module.css'

export interface ICompanyLogoFieldsProps {
  logo_url: FormValue<string>
  alternative_background: FormValue<boolean>
  disabled?: boolean
  label?: string
}

export interface ICompanyLogoFieldsState {
  isPickerOpen: boolean
}

export default class CompanyLogoFields extends React.Component<ICompanyLogoFieldsProps> {
  state: ICompanyLogoFieldsState = {
    isPickerOpen: false,
  }

  render() {
    const { logo_url, disabled, alternative_background, label = 'Logo' } = this.props
    const { isPickerOpen } = this.state
    const alternativeBackgroundValue = alternative_background.input.value
    const logoUrlValue = logo_url.input.value
    const hasLogo = !!logoUrlValue

    return (
      <React.Fragment>
        <Collapse in={!hasLogo} mountOnEnter unmountOnExit>
          <Button color="secondary" onClick={this.handleOpenLogoDialog} disabled={isPickerOpen || disabled}>
            <Image /> Upload Company Logo
          </Button>
        </Collapse>

        <Collapse in={hasLogo} mountOnEnter unmountOnExit>
          <div className={styles.container} style={alternativeBackgroundValue ? { background: '#fff' } : undefined}>
            {(label && alternativeBackgroundValue) && (
              <div className={styles.label}>
                {label}
              </div>
            )}

            <Picture
              onClick={this.handleOpenLogoDialog}
              className={styles.logo}
              src={logoUrlValue}
              alt="logo"
            />

            <div className={styles.alt}>
              <Tooltip title="Clear logo">
                <IconButton onClick={this.handleClear} style={alternativeBackgroundValue ? undefined : { color: '#fff' }}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Collapse>
      </React.Fragment>
    )
  }

  handleClear = () => {
    this.props.logo_url.input.onChange(null)
  }

  handleOpenLogoDialog = () => {
    const { logo_url: { input: { onChange } } } = this.props

    this.setState({
      isPickerOpen: true,
    })

    pickAndStore(
      {
        onClose: () => {
          this.setState({
            isPickerOpen: false,
          })
        },
      },
      file => onChange(file.url),
    )
  }
}
