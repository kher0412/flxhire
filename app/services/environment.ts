
export function getFlexhireEnvironment() {
  return process.env.FLEXHIRE_ENV || 'development'
}

export function isProduction() {
  return getFlexhireEnvironment() === 'production'
}

export function isStaging() {
  return getFlexhireEnvironment() === 'staging'
}

export function isDevelopment() {
  return getFlexhireEnvironment() === 'development'
}

export function envFlag(value: string | boolean) {
  const result = value === 'true' || value === true
  // console.log('Checking env flag: value:', value, 'result:', result)
  return result
}
