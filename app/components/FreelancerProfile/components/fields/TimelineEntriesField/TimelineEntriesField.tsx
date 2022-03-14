import React from 'react'
import moment from 'moment'
import { FieldArrayFieldsProps, FieldArrayMetaProps } from 'redux-form'
import { startCase, sortBy, toLower } from 'lodash'
import { Chip, Tooltip, Typography } from '@material-ui/core'
import ReactMarkdown from 'react-markdown'
import { ConfirmButton, InfoMessage } from 'components'

import { ITimelineEntry } from 'types'
import { Button } from 'components/themed'
import { AddCircle, Create, Delete, School, Work } from '@material-ui/icons'
import EditTimelineEntryDialog from './components/EditTimelineEntryDialog'
import TabPlaceholder from '../../TabPlaceholder'
import styles from './TimelineEntriesField.module.css'
import { PropsFromRedux } from './TimelineEntriesFieldContainer'

interface ITimelineEntriesFieldProps extends PropsFromRedux {
  editable: boolean
  fields: FieldArrayFieldsProps<Partial<ITimelineEntry>>
  meta: FieldArrayMetaProps
}

export default class TimelineEntriesField extends React.Component<ITimelineEntriesFieldProps> {
  componentWillUnmount() {
    this.props.setCurrentItem(-1)
  }

  render() {
    const { editable } = this.props

    return (
      <React.Fragment>
        {editable && (
          <InfoMessage>
            For best results with potential clients, do not leave significant gaps in your timeline.
          </InfoMessage>
        )}

        {this.renderItems()}
      </React.Fragment>
    )
  }

  renderChip(item) {
    if (item?.institute?.world_rank) {
      return (
        <Chip
          label={(
            <span>
              2020 World Rank {item.institute.world_rank}
            </span>
          )}
        />
      )
    }

    return null
  }

  renderItems() {
    const { editable, fields, meta, syncErrors, freelancerTypeId, currentItemIndex, currentItemPreviousValue } = this.props

    const hasError = meta.error
    const isEmpty = (fields.length === 0)
    const orderedItems = this.getOrderedItems()

    if (orderedItems.length === 0 && !editable) {
      return (
        <TabPlaceholder
          title="No work & education history yet"
        />
      )
    }

    return (
      <div className={styles.timeline} data-cy="timeline">
        <div className={styles['mid-line']} />

        <div className={styles['main-icon']}>
          {editable && (
            <div className={styles.item} data-cy="item">
              <div className={styles['item-icon']}>
                <AddCircle />
              </div>

              <div className={`${styles['item-content']} ${styles.newItem}`}>
                <div className={styles['item-text']}>
                  {isEmpty ? 'Add your Education and Work history' : 'Add a new entry'}
                </div>

                {hasError && (
                  <div className={styles.error}>
                    {meta.error}
                  </div>
                )}

                <div className={styles['add-content']}>
                  <Tooltip title="Add position">
                    <Button iconOnly onClick={this.addWorkEntry} data-cy="add-work" style={{ marginRight: 12 }}>
                      <Work />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Add education">
                    <Button iconOnly onClick={this.addEducationEntry} data-cy="add-education">
                      <School />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          )}

          {orderedItems.map((object) => {
            const { index: i, value: item } = object
            const errors = (syncErrors as any)?.timeline_entries?.[i]
            const errorCount = errors ? Object.keys(errors).length : 0
            const editing = currentItemIndex === i
            const place = startCase(toLower(item.place || `(Unknown ${item.entry_type === 'work' ? 'Company' : 'Location'})`))
            const title = item.title || 'Untitled Entry'
            return (
              <div key={i} className={styles.item} data-cy="item">
                <div className={styles['item-icon']}>
                  {item.entry_type === 'education' ? <School /> : <Work />}
                </div>

                <div className={styles['item-content']} style={{ animationDelay: `${i * 240 + 80}ms` }}>
                  <div className={styles['item-text']}>
                    <Typography variant="h4">
                      {title}, {place} {this.renderChip(item)}
                    </Typography>
                  </div>

                  <div className={styles['item-years']}>
                    <Typography variant="subtitle2">
                      {item.date_start || '?'} - {item.date_end || 'Present'}
                    </Typography>
                  </div>

                  {errorCount > 0 && (
                    <div className={styles.error}>
                      {errorCount} Errors. Edit the entry to solve them
                    </div>
                  )}

                  <div className={styles['item-highlights']}>
                    <Typography variant="body2">
                      <ReactMarkdown source={item.description} />
                    </Typography>

                    {!!item.skills && item.skills.length > 0 && (
                      <div>
                        {item.skills.map(skill => (
                          <Chip label={skill.name} style={{ marginRight: 6, marginBottom: 6, background: '#B1C5DA', color: '#fff' }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {editable && (
                    <React.Fragment>
                      <Tooltip title="Edit">
                        <Button iconOnly onClick={() => this.handleEdit(i)} style={{ marginRight: 12 }}>
                          <Create />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <ConfirmButton
                          iconOnly
                          dialogTitle={item.entry_type === 'work' ? 'Delete position' : 'Delete education'}
                          onClick={() => this.handleDelete(i)}
                        >
                          <Delete />
                        </ConfirmButton>
                      </Tooltip>

                      <EditTimelineEntryDialog
                        open={editing}
                        freelancerTypeId={freelancerTypeId}
                        isNew={editing && !currentItemPreviousValue}
                        onSave={this.handleEditDialogClose}
                        onCancel={this.handleCancelEditItem}
                        fieldName={`timeline_entries.${i}`}
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  getOrderedItems = () => {
    const { fields } = this.props
    const currentYear = moment().toObject().years

    const data = fields.map((name, index) => {
      const value = fields.get(index)

      return {
        name,
        index,
        value,
        offset_start: currentYear - (parseInt(value.date_start, 10) || 0),
        offset_end: currentYear - (parseInt(value.date_end, 10) || currentYear),
        skills: value.skills,
      }
    })

    const result = sortBy(data, ['offset_end', 'offset_start'])
    return result
  }

  findSpotInOrder = (currentIndex) => {
    const { fields } = this.props
    const toOrder = fields.get(currentIndex)
    if (!toOrder) return currentIndex

    const start = parseInt(toOrder.date_start, 10)
    const end = parseInt(toOrder.date_end, 10)
    let finalIndex = 0

    fields.forEach((name, index) => {
      const value = fields.get(index)
      if (end < parseInt(value.date_end, 10)) finalIndex++
      if (end === parseInt(value.date_end, 10) && start < parseInt(value.date_start, 10)) finalIndex++
    })

    return finalIndex
  }

  handleEditDialogClose = () => {
    const { syncErrors, fields, touch, currentItemIndex, setCurrentItem } = this.props
    // Do not allow closing the dialog if there is an error.
    // Instead, mark the fields as touched so the errors are displayed.
    const fieldErrors = (syncErrors as any)?.timeline_entries?.[currentItemIndex]

    if (fieldErrors) {
      const fieldsWithError = Object.keys(fieldErrors)
      touch(...fieldsWithError.map(f => `timeline_entries.${currentItemIndex}.${f}`))
    } else {
      fields.move(currentItemIndex, this.findSpotInOrder(currentItemIndex))
      setCurrentItem(-1, null)
    }
  }

  handleCancelEditItem = () => {
    const { fields, currentItemIndex: index, currentItemPreviousValue: previousValue, setCurrentItem } = this.props
    setCurrentItem(-1, null)
    fields.remove(index)
    if (previousValue) fields.insert(index, previousValue)
  }

  handleEdit = (i) => {
    const { fields, setCurrentItem } = this.props
    setCurrentItem(i, fields.get(i))
  }

  handleDelete = (i) => {
    const { setCurrentItem, fields } = this.props
    setCurrentItem(-1)
    fields.remove(i)
  }

  addEducationEntry = () => {
    const { fields, setCurrentItem } = this.props

    fields.push({
      entry_type: 'education',
    })

    setCurrentItem(fields.length)
  }

  addWorkEntry = () => {
    const { fields, setCurrentItem } = this.props

    fields.push({
      entry_type: 'work',
    })

    setCurrentItem(fields.length)
  }
}
