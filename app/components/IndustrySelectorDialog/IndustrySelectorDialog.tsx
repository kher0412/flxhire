import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { DialogTitle, DialogContent, DialogActions, Collapse } from '@material-ui/core'
import { getAPIClient } from 'api'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { LoadingPage, Picture } from 'components'
import { Button } from 'components/themed'
import { IFreelancerType, IFreelancerSubtype } from 'types'
import IndustryTile from './components/IndustryTile'
import styles from './IndustrySelectorDialog.module.css'
import FrontendIcon from './components/IndustryTile/components/FrontendIcon'

export interface IIndustrySelectorDialogProps {
  open?: boolean
  onClose?: () => void
  onSelect?: (freelancerType: IFreelancerType, freelancerSubtype: IFreelancerSubtype) => void
}

export interface IIndustrySelectorDialogState {
  freelancerTypes: IFreelancerType[]
  freelancerSubtypes: IFreelancerSubtype[]
  freelancerType: IFreelancerType
  freelancerSubtype: IFreelancerSubtype
  loading: boolean
}

export default class IndustrySelectorDialog extends React.Component<IIndustrySelectorDialogProps, IIndustrySelectorDialogState> {
  state = {
    freelancerTypes: [],
    freelancerSubtypes: [],
    freelancerType: undefined,
    freelancerSubtype: undefined,
    loading: true,
  } as IIndustrySelectorDialogState

  async componentDidMount() {
    const freelancerTypes = await getAPIClient().getFreelancerTypes()
    const freelancerSubtypes = await getAPIClient().getFreelancerSubtypes()

    freelancerTypes.sort((a, b) => a.name.localeCompare(b.name))
    freelancerSubtypes.sort((a, b) => a.name.localeCompare(b.name))

    this.setState({
      freelancerTypes: freelancerTypes,
      freelancerSubtypes: freelancerSubtypes,
      loading: false,

      // TODO: remove this line to unlock selecting freelancer types instead of having software-dev only
      freelancerType: freelancerTypes?.find(type => type.name.toLowerCase().includes('software')),
    })
  }

  render() {
    const { open, onClose } = this.props
    const { freelancerTypes, freelancerSubtypes, freelancerType, freelancerSubtype, loading } = this.state

    return (
      <ResponsiveDialog open={open || false} onClose={onClose} maxWidth="md" className={styles.dialog}>
        <div style={{ width: 9999 }} />

        <DialogTitle>
          <div className={styles.title}>
            {this.getTitle()}
          </div>
        </DialogTitle>

        <DialogContent style={{ maxWidth: 1080 }}>
          <Collapse in={loading}>
            <div style={{ padding: 48 }}>
              <LoadingPage />
            </div>
          </Collapse>

          <Collapse in={!loading}>
            <div className={styles.tiles}>
              {!freelancerType && (
                freelancerTypes.map((type, i) => (
                  <div key={type.id} style={{ animationDelay: `${i * 40}ms` }}>
                    <IndustryTile
                      name={type.name}
                      shortName={type.slug}
                      icon={type.icon_url ? <Picture src={type.icon_url} /> : <FrontendIcon />}
                      onClick={() => this.handleTypeClick(type)}
                    />
                  </div>
                ))
              )}

              {freelancerType && freelancerSubtypes.filter(subtype => subtype.freelancer_type_id === freelancerType.id).map((subtype, i) => (
                <div key={subtype.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <IndustryTile
                    name={subtype.name}
                    shortName={subtype.slug}
                    selected={freelancerSubtype === subtype}
                    icon={subtype.icon_url ? <Picture src={subtype.icon_url} /> : <FrontendIcon />}
                    onClick={() => this.handleSubtypeClick(subtype)}
                  />
                </div>
              ))}
            </div>
          </Collapse>
        </DialogContent>

        <DialogActions className={styles.actions}>
          <MediaQuery maxWidth={1000}>
            <Button onClick={onClose}>
              Close
            </Button>
          </MediaQuery>

          <Button color="primary" onClick={this.handleViewClick} className={styles.button} data-cy="view-sample-experts">
            <MediaQuery maxWidth={500}>
              View Experts
            </MediaQuery>

            <MediaQuery minWidth={501}>
              View Sample Flexhire Experts
            </MediaQuery>
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  getTitle() {
    const { freelancerTypes, freelancerType } = this.state

    if (freelancerType) {
      const freelancerTypeName = freelancerTypes.find(type => type.id === freelancerType.id).name

      return `What kind of ${freelancerTypeName} expert are you hiring?`
    }

    return 'What is your industry you are hiring for?'
  }

  handleTypeClick = (type: IFreelancerType) => {
    this.setState({
      freelancerType: type,
    })
  }

  handleSubtypeClick = (subtype: IFreelancerSubtype) => {
    this.setState({
      freelancerSubtype: subtype,
    })
  }

  handleViewClick = () => {
    const { onSelect, onClose } = this.props
    const { freelancerType, freelancerSubtype } = this.state

    if (onSelect) {
      onSelect(freelancerType, freelancerSubtype)
    }

    if (onClose) {
      onClose()
    }
  }
}
