export function valOrDefault(checkVal, defaultVal, options = {}) {
  const { returnVal } = options as any

  if (checkVal instanceof Array) {
    return (checkVal.length > 0 ? returnVal || checkVal : defaultVal)
  }
  return returnVal || checkVal || defaultVal
}
