import React, { useState } from 'react'
import { useSnackbar, useQuickCommit } from 'hooks'
import { Hidden, Card, Typography, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { ConfirmButton, Video, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { isUnsentJobApplication } from 'services/contract'
import { IContractForClient } from 'types'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import { FreelancerCardSlider_Freelancer$key } from '__generated__/FreelancerCardSlider_Freelancer.graphql'
import { FreelancerCardSlider_Contract$key } from '__generated__/FreelancerCardSlider_Contract.graphql'
import { FreelancerCardSlider_AnswersQuery } from '__generated__/FreelancerCardSlider_AnswersQuery.graphql'
import { FreelancerCardSlider_RequestVideoIntroductionMutation } from '__generated__/FreelancerCardSlider_RequestVideoIntroductionMutation.graphql'
import ReactMarkdown from 'react-markdown'
import { Videocam, VideocamOff } from '@material-ui/icons'
import styles from './FreelancerCardSlider.module.css'
import TextAnswerItem from './components/TextAnswerItem'
import VideoAnswerItem from './components/VideoAnswerItem'
import SlickSlider from './components/SlickSlider'

type VideoAnswerType = FreelancerCardSlider_AnswersQuery['response']['contract']['answers'][number]
type VideoType = Omit<VideoAnswerType, 'question'> & { question?: VideoAnswerType['question'] }
type TextualAnswerType = FreelancerCardSlider_AnswersQuery['response']['contract']['textualAnswers'][number]

interface IFreelancerCardSliderProps {
  freelancer: FreelancerCardSlider_Freelancer$key
  contract?: FreelancerCardSlider_Contract$key
  hideIntroduction?: boolean
  allowRequestVideoIntroduction?: boolean
  connectionId?: string
}

const FreelancerCardSlider = (props: IFreelancerCardSliderProps) => {
  const { freelancer: freelancerProp, contract: contractProp, hideIntroduction, allowRequestVideoIntroduction, connectionId } = props

  const showSnackbarMessage = useSnackbar()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)

  const showTextAnswerInDialog = (index: number) => {
    setCurrentDialogIndex(index)
    setDialogOpen(true)
  }

  const freelancer = useFragment(graphql`
    fragment FreelancerCardSlider_Freelancer on User {
      rawId
      firstName
      video {
        url
        posterUrl
      }
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment FreelancerCardSlider_Contract on Contract {
      id
      rawId
      status
      contractRequests {
        status
        requestType
      }
    }
  `, contractProp)

  const answerData = useLazyLoadQuery<FreelancerCardSlider_AnswersQuery>(graphql`
    query FreelancerCardSlider_AnswersQuery($contractId: Int, $freelancerId: Int, $withContract: Boolean!, $withFreelancer: Boolean!) {
      contract(rawId: $contractId) @include(if: $withContract) {
        id
        answers {
          question {
            title
          }
          url
          posterUrl
        }
        textualAnswers {
          question {
            title
          }
          textualAnswer
        }
      }

      freelancer: user(rawId: $freelancerId) @include(if: $withFreelancer) {
        answers {
          question {
            title
          }
          url
          posterUrl
        }
      }
    }
  `, {
    freelancerId: freelancer?.rawId,
    contractId: contract?.rawId,
    withFreelancer: Boolean(freelancer?.rawId),
    withContract: Boolean(contract?.rawId),
  }, {
    fetchPolicy: 'store-and-network',
  })

  const { execute: commit } = useQuickCommit<FreelancerCardSlider_RequestVideoIntroductionMutation>(
    graphql`
      mutation FreelancerCardSlider_RequestVideoIntroductionMutation($input: SendContractRequestsInput!, $connections: [ID!]!) {
        sendContractRequests(input: $input) {
          contract {
            id @deleteEdge(connections: $connections)
            status
            requestsStatus
            lastInteractionAt
            ...RequestMoreInfoDialog_Contract
          }
        }
      }
    `,
  )

  const handleRequestVideoIntroduction = async () => {
    const result = await commit({
      input: {
        contractId: contract.id,
        videoIntroduction: true,
      },
      connections: connectionId ? [connectionId] : [],
    })
    if (result) showSnackbarMessage('Request sent')
  }

  let videos: VideoType[] = (answerData?.contract?.answers || answerData?.freelancer?.answers || []).filter(x => Boolean(x))
  let answers: TextualAnswerType[] = (answerData?.contract?.textualAnswers || []).filter(x => Boolean(x))

  if (!hideIntroduction && freelancer?.video) {
    videos = [freelancer.video].concat(videos)
  }

  let allAnswers = [...videos, ...answers]

  if (allAnswers.length > 1) {
    return (
      <React.Fragment>
        {dialogOpen && (
          <ResponsiveDialog open onClose={() => setDialogOpen(false)}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ padding: '24px 6px' }}>
                <SlickSlider initialStep={currentDialogIndex} onChange={setCurrentIndex}>
                  {answers.map((answer, i) => (
                    // no significantly better option for keying vs using an index, the order of answers will not frequently change
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i}>
                      <div style={{ padding: '0 48px' }}>
                        <DialogTitle style={{ paddingTop: 6 }}>
                          <Typography variant="subtitle1" style={{ marginBottom: 6, textAlign: 'right' }}>
                            Text Answer {i + 1}/{answers.length}
                          </Typography>

                          {answer.question?.title || 'Question'}
                        </DialogTitle>

                        <DialogContent>
                          <Typography variant="body1">
                            <ReactMarkdown
                              source={answer.textualAnswer}
                            />

                          </Typography>

                          <Typography variant="subtitle1" style={{ marginTop: 6, paddingLeft: 3 }}>
                            - {freelancer.firstName}
                          </Typography>
                        </DialogContent>
                      </div>
                    </div>
                  ))}
                </SlickSlider>
              </div>
            </div>

            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </ResponsiveDialog>
        )}

        <div className={styles.container}>
          <SlickSlider onChange={setCurrentIndex}>
            {videos.map((video, i) => (
              <VideoAnswerItem
                key={video.url}
                title={`${i + 1}/${allAnswers.length}: ${(video.question && video.question.title) || 'Introduction Video'}`}
                video={video}
                videoPreload={i === currentIndex}
              />
            ))}

            {answers.map((answer, i) => (
              <TextAnswerItem
                key={answer.question.title}
                title={`${(videos.length) + (i + 1)}/${allAnswers.length}: ${answer.question && answer.question.title}`}
                text={answer.textualAnswer}
                onClick={() => showTextAnswerInDialog(i)}
              />
            ))}
          </SlickSlider>
        </div>
      </React.Fragment>
    )
  }

  if (videos.length > 0) {
    return (
      <div className={styles.container}>
        <Card raised className={styles.wrapper}>
          <Video
            compact
            video={{
              url: videos[0].url,
              poster_url: videos[0].posterUrl,
            }}
            className={styles.video}
            title="Introduction Video"
          />
        </Card>
      </div>
    )
  }

  const pendingVideoIntroduction = Boolean(contract?.contractRequests?.find(x => x.requestType === 'video_introduction' && x.status !== 'completed'))
  const partialContract = { status: contract?.status as IContractForClient['status'] }
  const canRequestVideoIntroduction = contract && !isUnsentJobApplication(partialContract) && freelancer && !contract?.contractRequests?.find(x => x.requestType === 'video_introduction') && !freelancer?.video
  const showButton = allowRequestVideoIntroduction && contract && freelancer

  return (
    <Hidden smDown>
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <div>
            <VideocamOff style={{ width: 48, height: 48, opacity: 0.5 }} />
          </div>

          {showButton && (
            <div className={styles.button}>
              <ConfirmButton
                component={Button}
                responsive
                color="primary"
                dialogMessage={`${freelancer?.firstName} will receive a request to record their Introduction Video. You will be notified once the request has been completed.`}
                onClick={handleRequestVideoIntroduction}
                disabled={!canRequestVideoIntroduction}
                data-cy="request-video"
              >
                <Videocam />
                {pendingVideoIntroduction ? 'Video Introduction Requested' : 'Request Video Introduction'}
              </ConfirmButton>
            </div>
          )}
        </div>
      </div>
    </Hidden>
  )
}

export default FreelancerCardSlider
