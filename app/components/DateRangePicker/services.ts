export const fromTheme = (theme, key, def) => {
  if (!theme || !theme.dateRangePicker) return def
  const value = theme.dateRangePicker[key]
  return typeof value !== 'undefined' ? value : def
}
