import React from 'react'
import { Card, Typography, Grid } from '@material-ui/core'
import { Condition, Video } from 'components'
import { conditionalClassList } from 'services/styles'
import { IFirm, IVideo } from 'types'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { Button } from 'components/themed'
import styles from './CompanyIntroduction.module.css'

export interface ICompanyIntroductionProps {
  firm: IFirm
  video?: IVideo
  hideText?: boolean
  hideVideo?: boolean
}

function CompanyIntroduction(props: ICompanyIntroductionProps) {
  const { firm, video, hideText, hideVideo } = props

  const isMobile = useMediaQuery('(max-width:899px)')
  const showText = !hideText
  const showVideo = !hideVideo && !!video
  const shouldCollapseText = (isMobile && showText && firm.description.length >= 192)
  const [showFullText, setShowFullText] = React.useState(!shouldCollapseText)

  if (!showText && !showVideo) {
    return null
  }

  return (
    <div
      className={conditionalClassList({
        [styles.container]: true,
        [styles.justified]: firm.description.length >= 192,
        [styles.centered]: firm.description.length < 192 && !showVideo,
      })}
    >
      <Typography variant="body1">
        {showVideo && (
          <div className={conditionalClassList({ [styles.videoContainer]: true, [styles.videoOnly]: !showText })}>
            <Card raised className={styles.card}>
              <Video video={video} />
            </Card>
          </div>
        )}

        <Condition condition={showText}>
          <Condition condition={!showFullText}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {firm.description.substring(0, 190)}...
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth onClick={() => setShowFullText(true)}>
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Condition>

          <Condition condition={showFullText}>
            {firm.description}
          </Condition>
        </Condition>
      </Typography>
    </div>
  )
}

export default React.memo(CompanyIntroduction)
