import React, { useState } from 'react'
import { DialogTitle, DialogContent, List, ListItem, ListItemIcon, ListItemText, DialogActions } from '@material-ui/core'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { Button } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { FreelancerCardContact_Contract$key } from '__generated__/FreelancerCardContact_Contract.graphql'
import { Block, Call, ContactMail, Mail } from '@material-ui/icons'
import FreelancerCardInfoItem from '../FreelancerCardInfoItem'

export interface IFreelancerCardContactProps {
  contract: FreelancerCardContact_Contract$key
}

const FreelancerCardContact = ({ contract: contractProp }: IFreelancerCardContactProps) => {
  const [open, setOpen] = useState(false)
  const contract = useFragment(graphql`
    fragment FreelancerCardContact_Contract on Contract {
      freelancerPhone
      freelancerContactEmail
      freelancerFirstName
    }
  `, contractProp)

  if (!contract || (!contract.freelancerPhone && !contract.freelancerContactEmail)) {
    return null
  }

  return (
    <React.Fragment>
      <FreelancerCardInfoItem
        button
        onClick={() => setOpen(true)}
        icon={<ContactMail />}
        primary="Click to view"
        secondary="Contact info"
        data-cy="contact"
      />

      <ResponsiveDialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <div style={{ width: 600 }} />

        <DialogTitle>
          Contact Details for {contract.freelancerFirstName}
        </DialogTitle>

        <DialogContent>
          <List>
            {(!contract.freelancerPhone && !contract.freelancerContactEmail) && (
              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <ListItemText secondary="No contacts available" />
              </ListItem>
            )}

            {contract.freelancerPhone && (
              <ListItem>
                <ListItemIcon>
                  <Call />
                </ListItemIcon>

                <ListItemText
                  primary={(
                    <span data-cy="phone">
                      {contract.freelancerPhone}
                    </span>
                  )}
                  secondary="Phone"
                />
              </ListItem>
            )}

            {contract.freelancerContactEmail && (
              <ListItem button onClick={() => window.open(`mailto:${contract.freelancerContactEmail}`)}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>

                <ListItemText
                  primary={(
                    <span data-cy="email">
                      {contract.freelancerContactEmail}
                    </span>
                  )}
                  secondary="E-Mail"
                />
              </ListItem>
            )}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} data-cy="contact-close">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </React.Fragment>
  )
}

export default FreelancerCardContact
