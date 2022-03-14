import fuzzysearch from 'fuzzysearch'

export function fuzzySearch<T>(search: string, list: T[], getFields: (item: T) => string[]) : T[] {
  if (!search) return []
  const adjustedSerach = search.trim().toLowerCase()
  return list.filter((value) => {
    const fieldValues = getFields(value)
    for (const fieldValue of fieldValues) {
      if (typeof fieldValue === 'string' && fieldValue.length > 0 && fuzzysearch(adjustedSerach, fieldValue.trim().toLowerCase())) {
        return true
      }
    }
    return false
  })
}
