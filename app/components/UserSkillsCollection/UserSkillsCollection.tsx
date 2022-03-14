import React from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { SkillChip } from 'components'
import { ITag, IJobSkill } from 'types'
import { getGroupsByIndex } from 'services/job'
import AddTag from './components/AddTag'
import styles from './UserSkillsCollection.module.css'

interface IUserSkillsCollectionProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean
  alwaysOpen?: boolean
  hideExperience?: boolean
  requiredSkills?: IJobSkill[]
  userSkills?: {
    id: number
    name: string
    experience?: number
    required_years?: number
    group_index?: number
  }[]
  freelancerSubtypes?: {
    id: number
    name: string
    group_index?: number
  }[]
  tags?: ITag[]
  addTags?: (newTags: string[]) => void
  removeTag?: (id: number) => void
  availableTags?: ITag[]
  children?: any
  icon?: any
  highlightedSkillIds?: number[]
}

interface IuserSkillsCollectionState {
  hasHiddenItems: boolean
  showHiddenItems: boolean
  showTagInput: boolean
  loading: boolean
}

export default class UserSkillsCollection extends React.PureComponent<IUserSkillsCollectionProps, IuserSkillsCollectionState> {
  static defaultProps = {
    animated: true,
    alwaysOpen: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      hasHiddenItems: false,
      showHiddenItems: props.alwaysOpen,
      showTagInput: false,
      loading: false,
    }
  }

  innerDiv: HTMLDivElement

  outerDiv: HTMLDivElement

  componentDidMount() {
    this.actualizeHiddenItemsState()
  }

  componentDidUpdate() {
    this.actualizeHiddenItemsState()
  }

  actualizeHiddenItemsState() {
    if (this.props.alwaysOpen) return
    if (!this.innerDiv) return

    if (this.innerDiv.clientHeight > 60) {
      // There are at least 2 rows of skills.
      const { hasHiddenItems } = this.state

      if (!hasHiddenItems) {
        this.setState({
          hasHiddenItems: true,
        })
      }
    } else {
      const { hasHiddenItems } = this.state

      if (hasHiddenItems) {
        this.setState({
          hasHiddenItems: false,
        })
      }
    }
  }

  render() {
    let {
      hideExperience,
      requiredSkills,
      userSkills = [],
      freelancerSubtypes = [],
      tags = [],
      addTags,
      removeTag,
      availableTags,
      animated,
      children,
      icon,
      highlightedSkillIds = [],
      alwaysOpen,
      ...others
    } = this.props
    const { hasHiddenItems, showHiddenItems, loading } = this.state
    const count = tags.length + freelancerSubtypes.length + userSkills.length
    const highlightedSkillIdsSet = new Set(highlightedSkillIds)

    const requiredSkillGroups = getGroupsByIndex((userSkills as IJobSkill[]).filter(s => s.required)).map(group => ({
      ...group,
      // sort skills by required experience, descending (i.e. most years first)
      skills: group.items.sort((a, b) => (b.required_years || 0) - (a.required_years || 0)),
    }))

    // sort other skills by experience, descending (i.e. most years first)
    const otherSkills = userSkills
      .filter(s => !(s as IJobSkill).required)
      .sort((a, b) => b.experience - a.experience)

    const subtypeGroups = getGroupsByIndex(freelancerSubtypes)

    return (
      <div className={styles['user-skills-collection']} data-cy="user-skills-collection" {...others}>
        <div
          className={styles.wrapper}
          ref={div => this.outerDiv = div}
          style={showHiddenItems ? { maxHeight: 1000, transition: 'max-height 1.5s linear' } : undefined}
        >
          <div ref={div => this.innerDiv = div}>
            {addTags && (
              <AddTag
                disabled={loading}
                onAddTag={this.addTags}
                compact={tags.length > 0}
                tags={tags}
                availableTags={availableTags}
              />
            )}

            {tags.map(tag => (
              <Tooltip key={tag.id} title={`${tag.name} (custom tag)`}>
                <div style={{ display: 'inline-block', margin: '0 5px 5px 0' }}>
                  <Chip
                    data-cy={`freelancer-chip-tag-${tag.name}`}
                    style={{ background: '#017EFF' }}
                    label={(
                      <span style={{ color: 'white' }}>
                        {tag.name}
                      </span>
                    )}
                    onDelete={removeTag && !loading ? this.removeTag(tag.id) : undefined}
                  />
                </div>
              </Tooltip>
            ))}

            {subtypeGroups?.map((group) => {
              const showSeparator = subtypeGroups.length > 1 && group.index !== subtypeGroups.length - 1
              return (
                <React.Fragment key={group.index}>
                  {group.items.map(s => (
                    <Tooltip key={s.id} title={`${s.name} (specialization)`}>
                      <div style={{ display: 'inline-block', margin: '0 5px 5px 0' }}>
                        <Chip
                          data-cy={`freelancer-chip-subtype-${s.name}`}
                          style={{ background: '#017EFF' }}
                          label={(
                            <span style={{ color: 'white' }}>
                              {s.name}
                            </span>
                        )}
                        />
                      </div>
                    </Tooltip>
                  ))}
                  {showSeparator && (
                    <SkillChip flat animated={animated} skill_experience={{ name: 'Or' }} />
                  )}
                </React.Fragment>
              )
            })}

            {requiredSkillGroups?.map((group) => {
              const showSeparator = requiredSkillGroups.length > 1 && group.index !== requiredSkillGroups.length - 1
              return (
                <React.Fragment key={group.index}>
                  {group.skills.map(s => (
                    <SkillChip
                      icon={icon}
                      key={s.id}
                      skill_experience={s}
                      hideExperience={hideExperience}
                      animated={animated}
                      required
                      focused={highlightedSkillIdsSet.size > 0 && highlightedSkillIdsSet.has(s.id)}
                    />
                  ))}
                  {showSeparator && (
                    <SkillChip flat animated={animated} skill_experience={{ name: 'Or' }} />
                  )}
                </React.Fragment>
              )
            })}

            {requiredSkillGroups.length > 0 && otherSkills.length > 0 && (
              <SkillChip flat animated={animated} skill_experience={{ name: 'Nice to have:' }} />
            )}

            {otherSkills?.map(s => (
              <SkillChip
                icon={icon}
                key={s.id}
                skill_experience={s}
                hideExperience={hideExperience}
                animated={animated}
                focused={highlightedSkillIdsSet.size > 0 && highlightedSkillIdsSet.has(s.id)}
              />
            ))}

            {children}
          </div>
        </div>

        {hasHiddenItems && (
          <div className={styles['show-more-button']} onClick={this.handleShowToggleClick} role="button">
            {showHiddenItems && 'Hide'}
            {!showHiddenItems && `Show all ${count} items`}
          </div>
        )}
      </div>
    )
  }

  toggleTagInput = () => {
    const { showTagInput } = this.state
    this.setState({ showTagInput: !showTagInput })
  }

  addTags = (newTags) => {
    const { addTags } = this.props

    this.setState({ loading: true }, async () => {
      await addTags(newTags)
      this.setState({ loading: false, showTagInput: false })
    })
  }

  removeTag = (id) => {
    const { removeTag } = this.props
    if (removeTag) return () => removeTag(id)
    return null
  }

  handleShowToggleClick = () => {
    this.setState(state => ({
      showHiddenItems: !state.showHiddenItems,
    }))
  }
}
