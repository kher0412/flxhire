import React from 'react'
import { Slider } from '@material-ui/core'
import styles from './RequiredExperienceSlider.module.css'

interface IRequiredExperienceSliderProps {
  skill: { requiredYears: number, name: string, id: number }
  onChange: (value: number) => void
}

const RequiredExperienceSlider = ({ skill, onChange }: IRequiredExperienceSliderProps) => {
  const [transientValue, setTransientValue] = React.useState(skill?.requiredYears)

  if (!skill) return null

  return (
    <div data-cy={`experience-slider-${skill.name}`} className={styles.container}>
      <div className={styles.label}>
        {!skill.requiredYears && <React.Fragment>Any years of <strong>{skill.name}</strong> experience</React.Fragment>}
        {skill.requiredYears === 1 && <React.Fragment><strong>1+</strong> year of <strong>{skill.name}</strong> experience</React.Fragment>}
        {skill.requiredYears > 1 && <React.Fragment><strong>{skill.requiredYears}+</strong> years of <strong>{skill.name}</strong> experience</React.Fragment>}
      </div>

      <div className={styles.slider}>
        <Slider
          min={0}
          max={10}
          step={0.01}
          value={transientValue}
          // valueLabelDisplay="auto"
          // valueLabelFormat={value => Math.round(value)}
          onChange={(_e, v) => setTransientValue(v as number)}
          onChangeCommitted={() => {
            const newValue = Math.round(transientValue)
            setTransientValue(newValue)
            onChange(newValue)
          }}
        />
      </div>
    </div>
  )
}

export default RequiredExperienceSlider
