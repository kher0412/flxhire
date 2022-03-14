import React from 'react'
import { Slider } from '@material-ui/core'
import { FormValueInput, FormValueMeta, IUserSkill } from 'types'
import styles from './ExperienceSlider.module.css'

export interface IExperienceSliderProps {
  input: FormValueInput<IUserSkill>
  meta: FormValueMeta
}

export interface IExperienceSliderState {
  transientValue: number
}

export default class ExperienceSlider extends React.PureComponent<IExperienceSliderProps, IExperienceSliderState> {
  static defaultProps = {
    skill: {},
    onChange: () => { },
  }

  constructor(props: IExperienceSliderProps) {
    super(props)

    this.state = {
      transientValue: props.input?.value?.experience || 0,
    }
  }

  render() {
    const { input, meta } = this.props
    const { transientValue } = this.state

    const name = input?.value?.name || 'unnamed'

    return (
      <div className={styles.container}>
        <div className={styles.label}>
          {this.renderLabel()}
        </div>

        <div className={styles.slider} data-cy={`experience-slider-${name}`}>
          <Slider
            min={0}
            max={10}
            step={0.01}
            value={transientValue}
            onChange={this.handleChange}
            onChangeCommitted={this.handleBlur}
          />
        </div>
        {typeof meta?.error === 'string' && meta?.error && (
          <div className={styles.error} data-cy={`experience-slider-${name}-error`}>
            {meta.error}
          </div>
        )}
      </div>
    )
  }

  renderLabel() {
    const { input } = this.props
    const { transientValue } = this.state
    const experience = Math.round(transientValue)

    return (
      <React.Fragment>
        {experience > 0 ? <strong>{experience}+</strong> : 'Any'}
        {' '}
        year{experience === 1 ? '' : 's'} of
        {' '}
        <strong>{input?.value?.name || 'Unnamed'}</strong> experience
      </React.Fragment>
    )
  }

  handleChange = (e: React.ChangeEvent<any>, value: number) => {
    this.setState({
      transientValue: value,
    })
  }

  handleBlur = () => {
    const { input } = this.props
    const { transientValue } = this.state
    const newValue = Math.round(transientValue)

    this.setState({
      transientValue: newValue,
    })

    input.onChange({ ...input.value, experience: newValue })
  }
}
