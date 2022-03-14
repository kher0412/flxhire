export interface IProject {
  id: number
  title: string
  description: string
  status: 'private' | 'public'
  screening: boolean
  submission?: IProjectSubmission
  custom?: boolean
}

export interface IProjectSubmission {
  id: number
  title: string
  description: string
  url: string
  screenshot_url?: string
  project_id: number
  public: boolean
  status: 'private' | 'public'
}
