import React from 'react'
import { Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { GridExpandable } from 'components'
import { NumberField } from 'components/themed'

export interface IReferralBoostFieldProps {
  input: FormValueInput<number>
  meta: FormValueMeta
}

export interface IReferralBoostFieldState {
  open: boolean
}

export default class ReferralBoostField extends React.PureComponent<IReferralBoostFieldProps, IReferralBoostFieldState> {
  static getDerivedStateFromProps(props: IReferralBoostFieldProps, state: IReferralBoostFieldState): IReferralBoostFieldState {
    if (props.input?.value > 0 && !state.open) {
      return {
        open: true,
      }
    }

    return null
  }

  constructor(props: IReferralBoostFieldProps) {
    super(props)

    this.state = {
      open: props.input?.value > 0,
    }
  }

  render() {
    const { input, meta } = this.props
    const { open } = this.state

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  onChange={this.handleToggle}
                  checked={open}
                  data-cy="referral_bounty-checkbox"
                />
              </ListItemIcon>

              <ListItemText primary="Add Referral Boost" />
            </ListItem>
          </List>
        </Grid>

        <GridExpandable item xs={12} md={12} expand={open}>
          <NumberField
            name="referral_bounty"
            value={input.value}
            onChange={input.onChange}
            error={meta.error && meta.touched}
            helperText={meta.error}
            startAdornment="$"
            label="Referral fee"
          />
        </GridExpandable>
      </Grid>
    )
  }

  handleToggle = () => {
    const { input } = this.props
    const { open } = this.state

    if (open) {
      if (input.value > 0) {
        input.onChange(0)
      }

      window.setTimeout(() => {
        this.setState({
          open: false,
        })
      }, 0)
    } else {
      this.setState({
        open: true,
      })

      if (input.value !== 100) {
        input.onChange(100)
      }
    }
  }
}
