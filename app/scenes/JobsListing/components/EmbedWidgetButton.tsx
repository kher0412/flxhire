import CopyToClipboard from 'react-copy-to-clipboard'
import { Button, InfoMessage, TextArea } from 'components/themed'
import { useCurrentUser, useSnackbar } from 'hooks'
import React, { useCallback, useMemo, useState, CSSProperties } from 'react'
import { getEmbedCodeForJobsListing } from 'services/iframe'
import { GridExpandable, Link, PagePlaceholder, ResponsiveDialog } from 'components'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
} from '@material-ui/core'
import { IVideo } from 'types'
import { Code, Done, FileCopy, Settings } from '@material-ui/icons'

const EmbedWidgetButton = ({ firmSlug, firmVideo, style }: { firmSlug: string, firmVideo?: IVideo, style: CSSProperties }) => {
  const [user] = useCurrentUser()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [embedShowVideo, setEmbedShowVideo] = useState(false)
  const [embedShowText, setEmbedShowText] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const showSnackbarMessage = useSnackbar()
  const handleCodeCopied = useCallback(() => showSnackbarMessage('HTML Code copied to Clipboard'), [])
  const enabled = user?.firm?.legacy_billing || user?.firm?.billing_plan?.allow_career_page_integration

  const embedCode = useMemo(() => {
    return getEmbedCodeForJobsListing(firmSlug, { showVideo: embedShowVideo, showText: embedShowText })
  }, [firmSlug, embedShowVideo, embedShowText])

  if (!firmSlug) return null

  return (
    <React.Fragment>
      <Button color="primary" onClick={() => setDialogOpen(true)} style={style}>
        <Code /> Embed widget
      </Button>

      <ResponsiveDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Embed Widget
        </DialogTitle>

        {enabled && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText style={{ margin: 0 }}>
                  Embed your jobs listing on your website using the embed widget.
                  In the body section of your website, paste the following HTML code where you want the widget to appear:
                </DialogContentText>
              </Grid>

              <Grid item xs={12}>
                <TextArea value={embedCode} />
              </Grid>

              <Grid item xs={12}>
                <CopyToClipboard
                  text={embedCode}
                  onCopy={handleCodeCopied}
                >
                  <Button style={style} color="secondary">
                    <FileCopy /> Copy Code
                  </Button>
                </CopyToClipboard>

                <Button color="default" onClick={() => setSettingsOpen(!settingsOpen)}>
                  <Settings /> Customize
                </Button>
              </Grid>

              <GridExpandable item xs={12} expand={settingsOpen}>
                <Divider style={{ margin: '12px -24px 24px -24px' }} />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <List>
                      <ListSubheader>
                        Customize Your Embed
                      </ListSubheader>

                      <ListItem>
                        <ListItemIcon>
                          <Checkbox checked={embedShowText} onChange={(e, checked) => setEmbedShowText(checked)} />
                        </ListItemIcon>

                        <ListItemText primary="Show Company Introduction Text" />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <Checkbox checked={embedShowVideo} onChange={(e, checked) => setEmbedShowVideo(checked)} disabled={!firmVideo} />
                        </ListItemIcon>

                        <ListItemText primary="Show Company Introduction Video" />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12}>
                    <Button color="default" onClick={() => setSettingsOpen(!settingsOpen)}>
                      <Done /> Done
                    </Button>
                  </Grid>
                </Grid>

                <Divider style={{ margin: '24px -24px 12px -24px' }} />
              </GridExpandable>

              <Grid item xs={12}>
                <InfoMessage>
                  The widget will appear exactly where the script tag is placed, and take up the full width of its parent element.
                </InfoMessage>
              </Grid>
            </Grid>
          </DialogContent>
        )}

        {!enabled && (
          <DialogContent>
            <PagePlaceholder
              flat
              title="Unsupported Feature"
              subtitle="Career page integration is not available on your current billing plan. Use the button below to view upgrade options."
              action={(
                <Button color="primary" muiComponent={Link} href="/account/plans">
                  Upgrade Plan
                </Button>
              )}
              style={{ width: '100%' }}
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </React.Fragment>
  )
}

export default EmbedWidgetButton
