import { useCallback } from 'react'
import JobFormWrapper from './components/JobFormWrapper'
import JobPostingContent, { IJobPostingContentProps } from './components/JobPostingContent'

const JobPosting = (props: IJobPostingContentProps) => {
  const { job = {}, editable } = props

  const handleKeyEvent = useCallback((e) => {
    if (e.which === 13 && !e.shiftKey) {
      if (e.target?.tagName !== 'TEXTAREA') {
        const d = document as any
        d.activeElement?.blur()
        e.preventDefault()
      }

      e.stopPropagation()
    }
  }, [])

  const content = <JobPostingContent {...props} />

  if (editable) {
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyDown={handleKeyEvent} onKeyPress={handleKeyEvent}>
        {content}
      </div>
    )
  }

  if (job) {
    return (
      <JobFormWrapper job={job}>
        {content}
      </JobFormWrapper>
    )
  }

  // assume parent <form> will provide data context
  return content
}

export default JobPosting
