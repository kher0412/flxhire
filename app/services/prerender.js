export function isPrerendering() {
  try {
    return typeof window === 'undefined'
  } catch (error) {
    // If it throws then we are server side rendering
    return true
  }
}
