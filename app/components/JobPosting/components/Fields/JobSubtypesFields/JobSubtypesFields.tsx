import React from 'react'
import { DialogTitle, DialogContent, DialogActions, Button, IconButton, Grow, DialogContentText, Tooltip, FormControlLabel, Checkbox, Typography, ListSubheader } from '@material-ui/core'
import { UserSkillsCollection, ResponsiveDialog, FocusFadeGroup } from 'components'
import { IFreelancerSubtype, FormValue } from 'types'
import { getGroupsByIndex } from 'services/job'
import { Create } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './JobSubtypesFields.module.css'

const TransitionComponent: any = React.forwardRef((props: any, ref) => (
  <Grow ref={ref} {...props} />
))

interface IJobSubtypeFieldsProps {
  editable: boolean
  freelancerSubtypes: Pick<IFreelancerSubtype, 'id' | 'freelancer_type_id' | 'name'>[]
  freelancer_type_id: FormValue<number>
  freelancer_subtypes: FormValue<{ id: number, name: string, group_index?: number }[]>
  label?: string
}

interface IJobSubtypeFieldsState {
  isEditorOpen: boolean
}

// eslint-disable-next-line react/no-multi-comp
export default class JobSubtypesFields extends React.PureComponent<IJobSubtypeFieldsProps, IJobSubtypeFieldsState> {
  container: any

  state = {
    isEditorOpen: false,
  }

  render() {
    // eslint-disable-next-line camelcase
    const { freelancer_type_id, freelancer_subtypes, freelancerSubtypes = [], editable, label } = this.props
    const selectedFreelancerSubtypes = freelancer_subtypes.input.value || []
    const freelancerSubtypesFiltered = freelancerSubtypes.filter(freelancerSubtype => freelancerSubtype.freelancer_type_id === freelancer_type_id.input.value)

    if (editable) {
      return (
        <div ref={div => this.container = div}>
          <FocusFadeGroup focused={false}>
            {freelancerSubtypesFiltered.length > 0 && (
              <div>
                {selectedFreelancerSubtypes.length === 0 && (
                  <span className={styles.placeholder}>
                    No specializations selected
                  </span>
                )}

                <div style={{ display: 'inline-block', maxWidth: 'calc(100% - 72px)' }}>
                  <UserSkillsCollection
                    freelancerSubtypes={selectedFreelancerSubtypes}
                    hideExperience
                  />
                </div>

                <Tooltip title="Edit specializations" placement="right">
                  <IconButton onClick={this.handleDialogOpen} className={styles['icon-button']}>
                    <Create />
                  </IconButton>
                </Tooltip>

                <FormErrorHint message={freelancer_subtypes.meta.touched && freelancer_subtypes.meta.error} />
              </div>
            )}

            {(label && selectedFreelancerSubtypes.length > 0) && (
              <Typography variant="subtitle2" style={{ marginTop: -9, marginBottom: 3 }}>
                {label}
              </Typography>
            )}
          </FocusFadeGroup>

          {this.renderDialog()}
        </div>
      )
    }

    // Non-editable version:

    if (selectedFreelancerSubtypes.length === 0) {
      return null
    }

    return (
      <div ref={div => this.container = div}>
        <div>
          <UserSkillsCollection
            freelancerSubtypes={selectedFreelancerSubtypes}
            hideExperience
            style={{ display: 'inline-block' }}
          />

          {(label && selectedFreelancerSubtypes.length > 0) && (
            <Typography variant="subtitle2" style={{ marginTop: -9, marginBottom: 3 }}>
              {label}
            </Typography>
          )}
        </div>

        {this.renderDialog()}
      </div>
    )
  }

  renderDialog() {
    // eslint-disable-next-line camelcase
    const { freelancer_type_id, freelancer_subtypes, freelancerSubtypes = [] } = this.props
    const { isEditorOpen } = this.state

    if (isEditorOpen) {
      const containerBounds = this.container.getBoundingClientRect()
      const selectedFreelancerType = freelancer_type_id.input.value
      const freelancerSubtypesFiltered = freelancerSubtypes.filter(freelancerSubtype => freelancerSubtype.freelancer_type_id === freelancer_type_id.input.value)
      let groups = getGroupsByIndex(freelancer_subtypes.input.value)
      if (groups.length === 0 || groups[groups.length - 1].items.length > 0) {
        groups.push({ items: [], index: groups.length })
      }

      return (
        <ResponsiveDialog
          open
          onClose={this.handleDialogClose}
          TransitionComponent={TransitionComponent}
          TransitionProps={{
            style: {
              transformOrigin: `${containerBounds.left}px ${containerBounds.top}px`,
            },
          }}
        >
          <DialogTitle>
            Edit specializations
          </DialogTitle>

          <DialogContent>
            {selectedFreelancerType && (
              <React.Fragment>
                <DialogContentText className={styles.text}>
                  Select the specializations a good candidate for your position should have.
                  Note: specializations are dependent on the job industry.
                  Changing the job industry later will clear any set specializations.
                </DialogContentText>

                {groups.map(g => (
                  <div className={styles.subtypes}>
                    <ListSubheader>Specialization set #{g.index + 1}</ListSubheader>
                    {freelancerSubtypesFiltered.map(freelancerSubtype => (
                      <FormControlLabel
                        key={freelancerSubtype.id}
                        label={freelancerSubtype.name}
                        control={(
                          <Checkbox
                            key={freelancerSubtype.id}
                          // className={styles.checkbox}
                            color="primary"
                            checked={Boolean(g.items.find(s => s.id === freelancerSubtype.id))}
                            onChange={() => this.handleSubtypeCheckToggle(freelancerSubtype, g.index)}
                            data-cy={`freelancer-subtype-${freelancerSubtype.name}`}
                            inputProps={{ 'data-cy': `freelancer-subtype-${freelancerSubtype.name}-input` } as any}
                          />
                      )}
                      />
                    ))}
                  </div>
                ))}

              </React.Fragment>
            )}

            {!selectedFreelancerType && (
              <React.Fragment>
                <DialogContentText className={styles.text}>
                  Before associating specializations to the job, choose which kind of job/position this is.
                </DialogContentText>
              </React.Fragment>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleDialogClose} data-cy="job-job_subtypes-close">
              Ok
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }

    return null
  }

  handleSubtypeCheckToggle = (freelancerSubtype: IJobSubtypeFieldsProps['freelancer_subtypes']['input']['value'][number], groupIndex: number) => {
    // eslint-disable-next-line camelcase
    const { freelancer_subtypes } = this.props

    if (freelancer_subtypes.input.value) {
      if (freelancer_subtypes.input.value.find(s => s?.id === freelancerSubtype?.id && (s?.group_index || 0) === (groupIndex || 0))) {
        freelancer_subtypes.input.onChange(freelancer_subtypes.input.value.filter(s => s.id !== freelancerSubtype?.id && (s.group_index || 0) !== (groupIndex || 0)))
      } else {
        freelancer_subtypes.input.onChange(freelancer_subtypes.input.value.concat({ ...freelancerSubtype, group_index: groupIndex }))
      }
    } else {
      freelancer_subtypes.input.onChange([{ ...freelancerSubtype, group_index: groupIndex }])
    }
  }

  handleDialogOpen = () => {
    this.setState({
      isEditorOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditorOpen: false,
    })
  }
}
