import { TextField, TextFieldProps } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const StyledMUITextField = withStyles(theme => ({
  root: {
    margin: 0,
    '& label': {
      color: '#758699',
    },
    '& input::placeholder, & textarea::placeholder': {
      color: '#96ADC6',
      opacity: 1,
    },
  },
}))(TextField)

const inputStyles = theme => ({
  root: {
    maxWidth: '100%',
    '& $notchedOutline': {
      borderWidth: 2,
      borderRadius: 6,
      borderColor: '#E0E9F2',
      transition: 'all 0.2s ease',
    },
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: '#B5BCC3',
    },
  },
  disabled: {},
  focused: {},
  error: {},
  notchedOutline: {},
})

export const ThemedMUITextField = withStyles(inputStyles)((props: TextFieldProps) => {
  const { InputProps, classes, ...restProps } = props

  return (
    <StyledMUITextField
      {...restProps}
      InputProps={{
        ...(InputProps || {}),
        classes: classes,
      }}
    />
  )
})
