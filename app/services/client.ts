import { IFirmRole } from 'types'
import { startCase } from 'lodash'

export function getFirmRole(firmRole: IFirmRole) {
  if (!firmRole) return null
  if (firmRole === 'firm_member') return 'Manager'
  if (firmRole === 'firm_admin') return 'Admin'
  return startCase(firmRole)
}
