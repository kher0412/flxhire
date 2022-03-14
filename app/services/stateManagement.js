import { isPlainObject, omit, isEmpty } from 'lodash'

function checkThis(functionName) {
  if (!(this && typeof this.setState == 'function')) { 
    console.error(`this.setState is not a function! Are you sure you added \`.bind(this)\` after the ${functionName} call?`)
  }
}

export const loggerHandler = (field, value, callback) => (...args) => {
  typeof v === "function" && callback()
}

export const debuggerHandler = (field, value, callback) => (...args) => {
  args // For browser devtool inspection.
  debugger // Don't remove! This is a feature of this function.
  typeof v === "function" && callback()
}

export function setFieldToValue(...args) {
  const hasNewValueAsObject = isPlainObject(args[0])
  const newValues = hasNewValueAsObject ? args[0] : { [args[0]]: args[1] }
  const callback = hasNewValueAsObject ? args[1] : args[2]
  return function (e) {
    if (process.env.NODE_ENV !== 'production') {
      checkThis.bind(this)('setFieldToValue')
    }
    this.setState(newValues, callback)
  }
}

export function setFieldToArgument(field, index, callback) {
  return function (...args) {
    if (process.env.NODE_ENV !== 'production') {
      checkThis.bind(this)('setFieldToArgument')
    }
    this.setState({ [field]: args[index - 1] }, callback)
  }
}

export function setFieldToEventValue(field, callback) {
  return function (e) {
    if (process.env.NODE_ENV !== 'production') {
      checkThis.bind(this)('setFieldToEventValue')
    }
    this.setState({ [field]: e.target && e.target.value }, callback)
  }
}

export function handleIntegerFieldChange(field, callback) {
  return function (e) {
    if (process.env.NODE_ENV !== 'production') {
      checkThis.bind(this)('handleIntegerFieldChange')
    }
    let value = e.target && e.target.value
    for (let i = value.length - 1; i >= 0; --i) {
      if ('0123456789'.indexOf(value[i]) == -1 ) {
        return
      }
    }
    if (value.length == 2 && value[0] == 0) {
      value = value[1]
    } else if (value.length > 2 && value[0] == 0) {
      return
    }
    this.setState({ [field]: value }, callback)
  }
}

export function processErrors(nextErrors, field) {
  // This function makes individual field error updating possible.
  // If this mode is selected and the field is erronous, then only that field will updated, otherwise
  // the field will be removed from the state's errors, so it will be rendered as a valid field.
  if (field) {
    this.setState(state => {
      return {
        ...state,
        errors: nextErrors[field] ? {
          ...state.errors,
          [field]: nextErrors[field],
        } : omit(state.errors, field),
      }
    })
  } else {
    this.setState({ errors: nextErrors })
  }
  return isEmpty(nextErrors)
}

