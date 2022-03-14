export function toMarkup(margin) {
  const num = parseFloat(margin || 0)
  if (num >= 100) return 0
  return ((num / (100 - num)) * 100)
}

export function toMargin(markup) {
  const num = parseFloat(markup || 0)
  return ((num / (100 + num)) * 100)
}
