export interface FormValueInput<T> {
  value: T
  name: string
  onChange: (value: any) => void
  onBlur?: (event?: any) => void
  onFocus?: (event?: any) => void
}

export interface FormValueMeta {
  touched?: boolean
  error?: string
}

export interface FormValue<T> {
  input: FormValueInput<T>
  meta: FormValueMeta
}

// TODO: this should have handling of array fields and object fields
export type FormErrors<FormValues> = Partial<{
  [K in keyof FormValues]?: any // TODO: this should be string or an object
}>
