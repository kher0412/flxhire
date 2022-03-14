export const isNumber = (n: any) => typeof n === 'number' && !isNaN(n) && !isNaN(n % 1)
export const isInteger = (n: any) => isNumber(n) && n % 1 === 0
export const ensureInt = (n: any) => isNaN(n) ? null : parseInt(n, 10)
