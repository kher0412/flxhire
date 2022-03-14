import { MoreButtonMenu } from 'components'
import { MenuItem, ListSubheader, Badge, Switch } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FilterListIcon from '@material-ui/icons/FilterList'

const WhiteSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
    '&$checked + $track': {
      backgroundColor: '#fff',
    },
  },
  checked: {
    '&$track': {
      backgroundColor: '#fff',
    },
  },
  track: {
    backgroundColor: '#fff',
  },
})(Switch)

function WholeTeamSwitch({ wholeTeam, toggleWholeTeam, wholeLabel = 'Whole team', meLabel = 'Reporting to me', white = false, disableHeightAdjust = false, tiny = false, style = {} }) {
  if (tiny) {
    const style = white ? { color: 'white' } : undefined
    let icon = <FilterListIcon style={style} />

    if (wholeTeam) {
      icon = (
        <Badge color="primary" badgeContent={<span style={{ fontSize: '12px' }}>All</span>}>
          <FilterListIcon style={style} />
        </Badge>
      )
    }
    return (
      <MoreButtonMenu icon={icon} style={{ marginTop: 1, marginLeft: 'auto' }}>
        <ListSubheader style={{ paddingLeft: 15 }}>
          Show data for
        </ListSubheader>

        <MenuItem
          value
          selected={wholeTeam}
          onClick={() => !wholeTeam ? toggleWholeTeam(true) : null}
        >
          {wholeLabel}
        </MenuItem>

        <MenuItem
          value={false}
          selected={!wholeTeam}
          onClick={() => wholeTeam ? toggleWholeTeam(false) : null}
        >
          {meLabel}
        </MenuItem>
      </MoreButtonMenu>
    )
  }

  return (
    <div
      style={{
        marginLeft: 'auto',
        fontSize: '14px',
        paddingTop: disableHeightAdjust ? 14 : 10,
        transform: disableHeightAdjust ? 'translateY(9px)' : undefined,
        paddingRight: 24,
        overflow: 'visible',
        ...style,
      }}
    >
      <span style={wholeTeam ? { opacity: 0.4, transition: 'opacity 0.4s ease' } : { transition: 'opacity 0.4s ease' }}>
        {meLabel}
      </span>

      {white && (
        <WhiteSwitch checked={wholeTeam} color="default" onClick={() => toggleWholeTeam(!wholeTeam)} />
      )}

      {!white && (
        <Switch checked={wholeTeam} color="primary" onClick={() => toggleWholeTeam(!wholeTeam)} />
      )}

      <span style={wholeTeam ? { transition: 'opacity 0.4s ease' } : { opacity: 0.4, transition: 'opacity 0.4s ease' }}>
        {wholeLabel}
      </span>
    </div>
  )
}

export default WholeTeamSwitch
