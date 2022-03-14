import React from 'react'
import { snakeCase } from 'lodash'
import { Chip, Avatar, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, Collapse } from '@material-ui/core'
import { ResponsiveDialog, FocusFadeGroup } from 'components'
import { Button } from 'components/themed'
import { FormValue, IFreelancerSubtype } from 'types'
import { AddCircle, Create } from '@material-ui/icons'
import styles from './FreelancerSubtypesFields.module.css'

export interface IFreelancerSubtypesFieldsProps {
  editable: boolean
  freelancer_subtype_ids: FormValue<number[]>
  freelancer_type_id: FormValue<number>
  editableFreelancerSubtypes: IFreelancerSubtype[]
  editableFreelancerSubtypesReceived: boolean
}

export interface IFreelancerSubtypesFieldsState {
  isEditMode: boolean
}

export default class FreelancerSubtypesFields extends React.Component<IFreelancerSubtypesFieldsProps, IFreelancerSubtypesFieldsState> {
  state = {
    isEditMode: false,
  }

  render() {
    // eslint-disable-next-line camelcase
    const { editable, freelancer_subtype_ids, editableFreelancerSubtypes, editableFreelancerSubtypesReceived } = this.props
    const freelancerSubtypeIds = freelancer_subtype_ids.input.value || []
    let subtypes = freelancerSubtypeIds
    if (editable) subtypes = subtypes.filter(s => editableFreelancerSubtypes.find(es => es.id === s))

    const hasSubtypes = subtypes.length > 0
    const showLoading = (editable && !editableFreelancerSubtypesReceived && freelancerSubtypeIds.length > 0)
    const showSubtypes = (!editable || editableFreelancerSubtypes.length !== 0)

    return (
      <div style={{ marginBottom: -5 }}>
        <FocusFadeGroup focused={false}>
          <Collapse in={showLoading} mountOnEnter unmountOnExit>
            <Chip
              variant="outlined"
              style={{ margin: '0 5px 5px 0', borderColor: '#3399ff', color: '#3399ff', opacity: 0.5 }}
              label={(
                <span className={styles['expertise-content']} style={{ color: '#3399ff' }}>
                  Loading...
                </span>
              )}
            />
          </Collapse>

          <Collapse in={!showLoading && showSubtypes} mountOnEnter unmountOnExit>
            {subtypes.length > 0 && subtypes.map(this.renderSubtype)}

            {editable && (
              <Chip
                variant="outlined"
                style={{ margin: '0 5px 5px 0', borderColor: '#3399ff', color: '#3399ff', cursor: 'pointer' }}
                label={(
                  <span className={styles['expertise-content']} style={{ color: '#3399ff' }}>
                    {hasSubtypes ? 'Edit' : 'Add your specializations'}
                  </span>
                )}
                avatar={(
                  <Avatar style={{ color: '#3399ff', background: 'none', height: 32, width: 32 }}>
                    {hasSubtypes ? <Create /> : <AddCircle />}
                  </Avatar>
                )}
                onClick={this.handleDialogOpen}
                data-cy="profile-specializations-edit"
              />
            )}
          </Collapse>

          {this.renderEditDialog()}
        </FocusFadeGroup>
      </div>
    )
  }

  renderSubtype = (subtypeId) => {
    const { editableFreelancerSubtypes } = this.props
    const freelancerSubtype = editableFreelancerSubtypes.find(subtype => subtype.id === subtypeId)

    if (freelancerSubtype) {
      return (
        <Chip
          key={subtypeId}
          style={{ margin: '0 5px 5px 0', background: '#3399ff' }}
          label={(
            <span className={styles['expertise-content']}>
              {freelancerSubtype.name || freelancerSubtype}
            </span>
          )}
        />
      )
    }

    return null
  }

  renderEditDialog() {
    // eslint-disable-next-line camelcase
    const { editableFreelancerSubtypes, freelancer_subtype_ids, freelancer_type_id } = this.props
    const { isEditMode } = this.state
    const selectedFreelancerTypeId = freelancer_type_id.input.value
    const selectedFreelancerSubtypeIds = freelancer_subtype_ids.input.value || []

    if (!isEditMode) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <DialogTitle>
          Select your specializations
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 99999 }} />

          {!selectedFreelancerTypeId && (
            <div>
              Select your industry to configure specializations.
            </div>
          )}

          {selectedFreelancerTypeId && editableFreelancerSubtypes.map(freelancerSubtype => (
            <FormControlLabel
              key={freelancerSubtype.id}
              label={freelancerSubtype.name}
              control={(
                <Checkbox
                  key={freelancerSubtype.id}
                  color="primary"
                  checked={selectedFreelancerSubtypeIds.includes(freelancerSubtype.id)}
                  onChange={() => this.handleSubtypeCheckToggle(freelancerSubtype.id)}
                  data-cy={`profile-specialization-${snakeCase(freelancerSubtype.name)}`}
                />
              )}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose} data-cy="profile-specializations-close">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isEditMode: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditMode: false,
    })
  }

  handleSubtypeCheckToggle = (freelancerSubtypeId) => {
    // eslint-disable-next-line camelcase
    const { freelancer_subtype_ids } = this.props

    if (freelancer_subtype_ids.input.value) {
      if (freelancer_subtype_ids.input.value.includes(freelancerSubtypeId)) {
        freelancer_subtype_ids.input.onChange(freelancer_subtype_ids.input.value.filter(id => id !== freelancerSubtypeId))
      } else {
        freelancer_subtype_ids.input.onChange(freelancer_subtype_ids.input.value.concat(freelancerSubtypeId))
      }
    } else {
      freelancer_subtype_ids.input.onChange([freelancerSubtypeId])
    }
  }
}
