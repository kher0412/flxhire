import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { WholeTeamSwitch, MoreButtonCard } from 'components'
import InfoIcon from '@material-ui/icons/InfoOutlined'


class ClientPageTitle extends React.PureComponent {
  static defaultProps = {
    isSwitchShown: true,
  }

  componentDidMount() {
    this.props.getTeamManagerCount()
  }

  render() {
    const { title, hint, action, disableHeightAdjust } = this.props

    return (
      <React.Fragment>
        <MediaQuery maxWidth={1000}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                paddingTop: 0,
                paddingRight: 12,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 48px)',
                boxSizing: 'border-box',
              }}
            >
              {title || 'Untitled Section'}
            </span>

            {this.renderAction(action, true)}
            {this.renderHint(hint, true)}
            {this.renderSwitch(true)}
          </div>
        </MediaQuery>

        <MediaQuery minWidth={1001}>
          <div style={{ display: 'flex', marginBottom: disableHeightAdjust ? 0 : -12, marginTop: disableHeightAdjust ? -19 : 0 }}>
            <span style={{ paddingTop: 19, paddingRight: 12 }}>
              {title || 'Untitled Section'}
            </span>

            {this.renderAction(action, false)}
            {this.renderHint(hint)}
            {this.renderSwitch()}
          </div>
        </MediaQuery>
      </React.Fragment>
    )
  }

  renderAction(action, mobile) {
    if (action) {
      return (
        <div style={{ display: 'inline-block', marginTop: mobile ? -1 : 10 }}>
          {action}
        </div>
      )
    }
    return null
  }

  renderHint(hint, mobile) {
    if (hint) {
      return (
        <MoreButtonCard icon={<InfoIcon />} style={{ marginTop: mobile ? 1 : 10 }} popoverStyle={{ maxWidth: 400 }}>
          {hint}
        </MoreButtonCard>
      )
    }
    return null
  }

  renderSwitch(tiny) {
    const { white, wholeTeam = true, wholeLabel, meLabel, toggleWholeTeam, isSwitchShown } = this.props

    if (!isSwitchShown) return null

    return (
      <WholeTeamSwitch
        white={white}
        wholeLabel={wholeLabel}
        meLabel={meLabel}
        wholeTeam={wholeTeam}
        toggleWholeTeam={toggleWholeTeam}
        tiny={tiny}
      />
    )
  }
}

export default ClientPageTitle
