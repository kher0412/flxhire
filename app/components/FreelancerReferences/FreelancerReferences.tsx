import React, { useState } from 'react'
import { capitalize } from 'lodash'
import { mailto } from 'services/email'
import { FreelancerCardInfoItem } from 'components'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { DialogTitle, ListItemText, ListItemIcon, List, DialogContent, ListItem } from '@material-ui/core'
import { graphql, useFragment } from 'react-relay'
import { FreelancerReferences_Freelancer$key } from '__generated__/FreelancerReferences_Freelancer.graphql'
import { Contacts, Info } from '@material-ui/icons'

interface IFreelancerReferencesProps {
  freelancer: FreelancerReferences_Freelancer$key
}

const FreelancerReferences = (props: IFreelancerReferencesProps) => {
  const { freelancer: freelancerProp } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const freelancer = useFragment(graphql`
    fragment FreelancerReferences_Freelancer on User {
      firstName
      lastName
      references {
        name
        email
        status
        relation
        otherRelation
        comments
      }
    }
  `, freelancerProp)
  const totalCount = freelancer?.references?.length || 0

  if (!totalCount) return null

  const completedCount = freelancer.references.filter(x => x.status === 'completed').length
  return (
    <React.Fragment>
      <FreelancerCardInfoItem
        icon={<Contacts />}
        primary={`${completedCount}/${totalCount} Completed`}
        secondary="References"
        button
        onClick={() => setDialogOpen(true)}
      />
      {dialogOpen && (
      <ResponsiveDialog open onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          References for {freelancer.firstName} {freelancer.lastName}
        </DialogTitle>
        <DialogContent>
          <List>
            {freelancer.references.length === 0 && (
            <ListItem>
              <ListItemIcon><Info /></ListItemIcon>
              <ListItemText primary="No references yet" />
            </ListItem>
            )}
            {freelancer.references.map(reference => (
              <ListItem button onClick={() => mailto(reference.email)}>
                <ListItemText
                  primary={reference.name}
                  secondary={(
                    <ul>
                      <li>Email: {reference.email}</li>
                      <li>Status: {capitalize(reference.status)}</li>
                      <li>Relation: {reference.relation ? capitalize(reference.relation) : 'N/A'} {reference.otherRelation}</li>
                      <li>Comments: {reference.comments || 'N/A'}</li>
                    </ul>
                  )}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </ResponsiveDialog>
      )}
    </React.Fragment>
  )
}

export default FreelancerReferences
