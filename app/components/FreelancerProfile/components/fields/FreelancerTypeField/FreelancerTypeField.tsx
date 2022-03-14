import React from 'react'
import { snakeCase } from 'lodash'
import { ListSubheader, MenuItem } from '@material-ui/core'
import { MoreButtonMenu, Tag, FocusFadeGroup } from 'components'
import MediaQuery from 'components/MediaQuery'
import { FormValueInput, FormValueMeta, IFreelancerType } from 'types'
import { ArrowDropDown } from '@material-ui/icons'
import styles from './FreelancerTypeField.module.css'

interface IFreelancerTypeFieldProps {
  editable?: boolean
  input: FormValueInput<number>
  meta: FormValueMeta
  freelancerTypes: IFreelancerType[]
}

export default class FreelancerTypeField extends React.PureComponent<IFreelancerTypeFieldProps> {
  render() {
    const { editable, input: { value }, meta, freelancerTypes = [] } = this.props

    const freelancerTypeId = value
    const freelancerType = freelancerTypes.find(_freelancerType => _freelancerType?.id === freelancerTypeId)
    const hasError = meta.touched && meta.error
    const style = hasError ? { paddingBottom: 24 } : undefined

    if (!freelancerType && !editable) {
      return false
    }

    if (freelancerType) {
      return (
        <Tag className={styles.container} data-cy="profile-freelancer-type" style={style}>
          <FocusFadeGroup focused={false} style={{ display: 'inline-block' }}>
            {freelancerType.name}
            {this.renderEditButton()}
            {this.renderError()}
          </FocusFadeGroup>
        </Tag>
      )
    }

    return (
      <Tag className={styles.container} style={style}>
        <FocusFadeGroup focused={false} style={{ display: 'inline-block' }}>
          <span style={{ opacity: 0.5 }}>
            <MediaQuery maxWidth={600}>
              {mobile => mobile ? 'Area of Expertise' : 'Select Your Area of Expertise'}
            </MediaQuery>
          </span>

          {this.renderEditButton()}
          {this.renderError()}
        </FocusFadeGroup>
      </Tag>
    )
  }

  renderError() {
    const { meta } = this.props

    return meta.touched && meta.error && (
      <div className={styles.error} data-cy="profile-freelancer-type-error">
        {meta.error}
      </div>
    )
  }

  renderEditButton() {
    const { editable, input: { value, onChange }, freelancerTypes = [] } = this.props

    if (!editable) {
      return null
    }

    const freelancerTypeId = value

    return (
      <MoreButtonMenu
        tooltip="Edit project length"
        placement="right"
        icon={<ArrowDropDown />}
        data-cy="profile-freelancer-type-edit"
        className={styles.edit}
      >
        <ListSubheader>
          What's your industry?
        </ListSubheader>

        {freelancerTypes.map(_freelancerType => (
          <MenuItem
            key={_freelancerType.id}
            selected={_freelancerType.id === freelancerTypeId}
            onClick={() => onChange(_freelancerType.id)}
          >
            <span data-cy={`freelancer-type-${snakeCase(_freelancerType.name)}`}>{_freelancerType.name}</span>
          </MenuItem>
        ))}
      </MoreButtonMenu>
    )
  }
}
