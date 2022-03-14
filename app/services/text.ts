import { startCase } from 'lodash'

export function stripEmojis(text: string) {
  // from https://stackoverflow.com/a/41543705

  // Keep in sync with the backend method
  // Make sure it does not crash by checking the function
  if (typeof text?.replaceAll !== 'function') return text

  return text.replaceAll(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
}

export function cleanName(name: string) {
  // Make sure it does not crash by checking the function
  if (typeof name?.trim !== 'function') return name

  return stripEmojis(name.trim().split("'").map(s => startCase(s)).join("'"))
}
