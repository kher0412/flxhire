import { Slider, Typography } from '@material-ui/core'
import styles from './Slider.module.css'

const MySlider = ({ onChange, value, name }) => (
  <div data-cy={`slider-${name}`}>
    <Slider min={0} max={3} step={1} value={parseInt(value)} onChange={(_, value) => onChange(value)} />
    <div className={styles.content}>
      <Typography>0-2</Typography>
      <Typography>3-5</Typography>
      <Typography>6-10</Typography>
      <Typography>+11</Typography>
    </div>
  </div>
)

export default MySlider
