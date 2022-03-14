
export const getShortName = (name: string) : string => {
  if (!name) return name
  const parts = name.split('.')
  return parts[parts.length - 1]
}
