
export function mailto(email: string) {
  return window.open(`mailto:${email}`, '_blank')
}
