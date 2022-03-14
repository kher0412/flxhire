export interface ISkill {
  id: number
  name: string
  slug: string
  freelancer_type_ids: number[]
  custom
  firmId
}

export interface IJobSkill {
  id: number
  name: string
  required: boolean
  required_years: number
  group_index: number
}
