export function isPopupBlocked(win: Window): boolean {
  if (!win || win.closed || typeof win.closed === 'undefined') {
    return true
  }

  try {
    win.focus()
  } catch (err) {
    // assume popup block
    return true
  }

  return false
}

export async function ensureNotPopupBlocked(win: Window) {
  if (isPopupBlocked(win)) {
    throw new Error('Please allow popups for Flexhire and try again.')
  }
}
