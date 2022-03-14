import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { classList } from 'services/styles'
import ReactMarkdown from 'react-markdown'
import styles from './TextAnswerItem.module.css'

export interface ITextAnswerItemProps {
  title: string
  text: string
  onClick?: () => void
}

function TextAnswerItem(props: ITextAnswerItemProps) {
  const { title, onClick } = props
  const text = props.text.length > 120 ? `${props.text.substring(0, 118)}...` : props.text
  return (
    <div
      className={classList(styles.container, onClick ? styles.clickable : undefined)}
      onClick={onClick}
      role="button"
    >
      <Card raised className={styles.card}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={styles.title} gutterBottom>
                {title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                <ReactMarkdown
                  source={text}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default React.memo(TextAnswerItem)
