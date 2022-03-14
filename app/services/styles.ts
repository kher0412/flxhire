export type StandardWidth = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/**
 * Given a list of CSS classes, creates a single className to be used with a `className` prop.
 * Undefined and empty CSS classes are ignored.
 */
export function classList(...classNames: string[]) {
  return classNames.filter(className => className && typeof className === 'string').join(' ')
}

/**
 * Given an object of conditional classNames, where each key is a className and each value is the conditional whether the className should be used or not,
 * creates a single className to be used with a `className` prop. Undefined and empty CSS classes are ignored.
 * This function is syntactical sugar over a conditionally constructed list passed to the 'classList' function.
 *
 * @param classNames An object in which each key is a className and each value is a boolean (indicating whether the className is to be used or not).
 */
export function conditionalClassList(classNames: { [key: string]: boolean }): string {
  return Object.keys(classNames).filter(className => className && classNames[className] === true).join(' ')
}

export function getStandardWidth(width: StandardWidth): number {
  switch (width) {
    case 'xxl':
      return 1200

    case 'xl':
      return 1200

    case 'lg':
      return 992

    case 'md':
      return 768

    case 'sm':
      return 576

    default:
      return 0
  }
}
