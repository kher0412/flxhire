import { useState, useCallback } from 'react'
import { ITag } from 'types'
import AddTag from './components/AddTag'

// id is optional
export type IFreelancerCardTag = Omit<ITag, 'id'> & Partial<Pick<ITag, 'id'>>

export interface IFreelancerCardTagsProps {
  tags: IFreelancerCardTag[]
  availableTags: IFreelancerCardTag[]
  setTags?: (tags: IFreelancerCardTag[]) => void
}

const FreelancerCardTags = (props: IFreelancerCardTagsProps) => {
  const { tags = [], availableTags = [] } = props
  const [loading, setLoading] = useState(false)
  // TODO: load tags via graphql instead
  const setTags = useCallback(async (tagsToSet: IFreelancerCardTag[]) => {
    setLoading(true)
    await props.setTags(tagsToSet)
    setLoading(false)
  }, [])

  return (
    <AddTag
      disabled={loading}
      onSetTags={setTags}
      tags={tags}
      availableTags={availableTags}
    />
  )
}

export default FreelancerCardTags
