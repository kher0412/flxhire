import { RecordSource } from 'relay-runtime'
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes'
import storage from 'services/localStorage'

const RECORD_SOURCE_VERSION = 3

export function saveRecords(recordSource: RecordSource) {
  const records = Array.from((recordSource as any)._records)
  try {
    storage.setItem('flexhire_relay_store', JSON.stringify({
      version: RECORD_SOURCE_VERSION,
      data: {
        records,
      },
    }))
    return true
  } catch (error) {
    console.log(error)
  }
  return false
}

export function clearSavedRecords() {
  try {
    storage.setItem('flexhire_relay_store', JSON.stringify({
      version: RECORD_SOURCE_VERSION,
      data: {
        records: [],
      },
    }))
    return true
  } catch (error) {
    console.log(error)
  }
  return false
}

export function loadSavedRecords() {
  try {
    const loadedData = JSON.parse(storage.getItem('flexhire_relay_store'))
    if (loadedData?.version === RECORD_SOURCE_VERSION && Array.isArray(loadedData?.data?.records)) {
      const value = {
        records: new Map(loadedData?.data?.records || []) as unknown as RecordMap,
      }
      return value
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export function startPeriodicSaving(recordSource: RecordSource) {
  const w = window as any

  if (w.relayEnvironmentSaveInterval) clearInterval(w.relayEnvironmentSaveInterval)

  w.relayEnvironmentSaveInterval = setInterval(() => {
    saveRecords(recordSource)
  }, 5000)

  return w.relayEnvironmentSaveInterval
}
