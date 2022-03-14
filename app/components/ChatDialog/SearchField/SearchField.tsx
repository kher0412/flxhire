import { forwardRef, ComponentProps } from 'react'
import { Paper, InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import styles from './SearchField.module.css'

interface ISearchFieldProps extends Omit<ComponentProps<typeof Paper>, 'onChange'> {
  value: string
  onChange: (e: any) => void
  onBlur?: () => void
}

const SearchField = forwardRef(({ value, onChange, onBlur, ...props }: ISearchFieldProps, ref) => (
  <Paper className={styles.paper} ref={ref} {...props}>
    <Search className={styles.icon} />
    <InputBase
      className={styles.input}
      fullWidth
      placeholder="Search"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus
    />
  </Paper>
))

export default SearchField
