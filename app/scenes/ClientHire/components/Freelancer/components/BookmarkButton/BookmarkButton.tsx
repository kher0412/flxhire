import { useCallback } from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import { graphql, useFragment } from 'react-relay'
import { BookmarkButton_Contract$key } from '__generated__/BookmarkButton_Contract.graphql'
import { BookmarkBorder, Bookmarks } from '@material-ui/icons'
import { useQuickCommit } from 'hooks'

interface IBookmarkButtonProps {
  contract: BookmarkButton_Contract$key
}

const BookmarkButton = ({ contract: contractProp }: IBookmarkButtonProps) => {
  const contract = useFragment(graphql`
    fragment BookmarkButton_Contract on Contract {
      id
      bookmarked
    }
  `, contractProp)

  const { execute: toggle, loading: isInFlight } = useQuickCommit(graphql`
    mutation BookmarkButton_ToggleMutation($input: ToggleBookmarkFreelancerInput!) {
      toggleBookmarkFreelancer(input: $input) {
        contract {
          bookmarked
        }
      }
    }
  `)

  const bookmarked = contract?.bookmarked
  const optimisticUpdater = (store) => {
    const record = store.get(contract.id)
    record.setValue(!record.getValue('bookmarked'), 'bookmarked')
  }
  const commit = useCallback(async () => {
    await toggle({
      input: {
        contractId: contract?.id,
      },
      optimisticUpdater,
    })
  }, [bookmarked])

  // TODO: fix bookmarking on candidates
  if (!contract) return null

  return (
    <Tooltip title={bookmarked ? 'Remove Bookmark' : 'Bookmark This'}>
      <Fab
        size="small"
        onClick={commit}
        disabled={isInFlight}
        color={bookmarked ? 'primary' : undefined}
        data-cy="toggle-bookmark"
        style={{
          zIndex: 1,
          position: 'absolute',
          left: -12,
          top: -12,
        }}
      >
        {bookmarked ? <Bookmarks /> : <BookmarkBorder />}
      </Fab>
    </Tooltip>
  )
}

export default BookmarkButton
