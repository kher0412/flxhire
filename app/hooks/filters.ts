import { useState, useCallback, useEffect, useMemo } from 'react'
import { ICurrentUser } from 'types'
import storage from 'services/localStorage'

export interface IUseFiltersOptions<T> {
  onChange: (filters: T) => T
}

export interface IUseFiltersController<T> {
  filters: Partial<T>
  replaceFilters: (filters: T) => void
  setFilters: (values: Partial<T>) => void
  setFilter: (name: keyof T, value: T[typeof name]) => void
  clearFilters: () => void
  resetDefaults: () => void
  isEmpty: boolean
}

export function useFilters<T>(initialValues: Partial<T> = {}, options: Partial<IUseFiltersOptions<Partial<T>>> = {}) {
  // state setup
  const [filters, replaceFilters] = useState<Partial<T>>(initialValues)
  // functions to handle updating filters
  const setFilters = useCallback((values: Partial<T>) => {
    replaceFilters({ ...filters, ...values })
  }, [filters, replaceFilters])
  const setFilter = useCallback((name: keyof T, value: T[typeof name]) => {
    setFilters({ [name]: value } as Partial<T>)
  }, [filters, setFilters])
  // other functions
  const clearFilters = useCallback(() => replaceFilters({}), [])
  const resetDefaults = useCallback(() => replaceFilters({ ...initialValues }), [initialValues])
  // calculated values
  const isEmpty = useMemo(() => !Object.values(filters).some(v => Boolean(v)), [filters])
  // effects
  useEffect(() => {
    if (typeof options?.onChange === 'function') options.onChange(filters)
  }, [filters])

  // TODO: add effect that updates filters when defaults change? Make it configurable?

  return {
    filters,
    replaceFilters,
    setFilters,
    setFilter,
    clearFilters,
    resetDefaults,
    isEmpty,
  } as IUseFiltersController<T>
}

export interface IAdditionalParameters {
  [key: string]: string | number
}

export interface IFiltersOptions {
  user: Pick<ICurrentUser, 'email'>
  additionalParameters?: IAdditionalParameters
  version: number
  storageName: string
}

export function useSaveFilters<Filters>(filters: Filters, options: IFiltersOptions) {
  useEffect(() => {
    try {
      if (options.user?.email) {
        const email = options.user?.email
        storage.setItem(options.storageName, JSON.stringify({
          formatVersion: options.version,
          value: filters,
          email,
          additionalParameters: options.additionalParameters,
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }, [filters, options])
}

function areSavedFiltersPresent(options: IFiltersOptions) {
  try {
    if (!options.user?.email) return false
    const toParse = storage.getItem(options.storageName)
    if (!toParse) return false
    const filterParams = JSON.parse(toParse)
    let additionalParametersFlag = true
    if (options.additionalParameters) {
      Object.keys(options.additionalParameters).forEach((paramKey) => {
        if (options.additionalParameters[paramKey]) {
          additionalParametersFlag = additionalParametersFlag && filterParams?.additionalParameters[paramKey] === options.additionalParameters[paramKey]
        }
      })
    }
    return additionalParametersFlag && filterParams?.formatVersion === options.version && filterParams.email === options.user?.email
  } catch (error) {
    console.log(error)
    return false
  }
}

export function loadFilters(options: IFiltersOptions) {
  if (areSavedFiltersPresent(options)) {
    try {
      const email = options.user?.email
      if (email) {
        const toParse = storage.getItem(options.storageName)
        if (toParse) {
          const filterParams = JSON.parse(toParse)
          if (filterParams?.formatVersion === options.version && filterParams.email === email) {
            return filterParams.value
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return null
}
