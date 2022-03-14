import { useCallback, useEffect, useMemo, useState } from 'react'
import { trackError } from 'services/analytics'
import { errorToObject } from 'services/error'
import { IAPIError } from 'types'

export interface IUseAPIOptions {
  trackErrors?: boolean
}

export interface IUseAPIReadOptions extends IUseAPIOptions {
  preload?: boolean
  defaultValue?: any
}

export interface IUseAPIReadModel<T> {
  value: T
  refresh: () => Promise<T>
  error: IAPIError
  loading: boolean
}

const defaultAPIOptions: IUseAPIReadOptions = {
  trackErrors: true,
}

const defaultAPIReadOptions: IUseAPIReadOptions = {
  trackErrors: true,
  preload: true,
}

export function useAPIRead<T>(apiCall: () => Promise<T>, optionsOverride: Partial<IUseAPIReadOptions> = {}) {
  const options = useMemo(() => ({ ...defaultAPIReadOptions, ...optionsOverride }), [optionsOverride])
  const [init, setInit] = useState(false)
  const [error, setError] = useState(null as IAPIError)
  const [loading, setLoading] = useState(Boolean(options.preload))
  const [value, setValue] = useState(options?.defaultValue as T)
  const refresh = useCallback(() => {
    setLoading(true)
    let promise = apiCall().then((v) => {
      setValue(v)
      setError(null)
      setLoading(false)
      return v
    })
    if (options?.trackErrors) {
      promise = promise.catch((err) => {
        trackError(err)
        setError(errorToObject(err))
        setLoading(false)
        return null
      })
    }
    return promise
  }, [apiCall])
  useEffect(() => {
    if (!init && options?.preload) refresh()
    setInit(true)
  })
  const model: IUseAPIReadModel<T> = {
    value,
    refresh,
    error,
    loading,
  }
  return model
}

export interface IUseAPIWriteOptions<T> extends IUseAPIOptions {
  initialValue?: T
  onSubmit?: (value: T) => void
}

export interface IUseAPIWriteModel<T> {
  savedValue: T
  submit: (...args: any) => Promise<T>
  submitting: boolean,
  error: string
}

export function useAPIWrite<T>(apiCall: (...args: any) => Promise<T>, options: IUseAPIWriteOptions<T> = defaultAPIOptions) {
  const [error, setError] = useState(null as string)
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState(options?.initialValue as T)
  const submit = useCallback((...args) => {
    setSubmitting(true)
    let promise = apiCall(...args).then((v) => {
      setValue(v)
      setError(null)
      setSubmitting(false)
      if (typeof options?.onSubmit === 'function') options.onSubmit(v)
      return v
    })
    if (options?.trackErrors) {
      promise = promise.catch((err) => {
        trackError(err)
        setError(err.response || err.message)
        setSubmitting(false)
        return null
      })
    }
    return promise
  }, [apiCall])
  const model: IUseAPIWriteModel<T> = {
    submit,
    savedValue: value,
    submitting,
    error,
  }
  return model
}
