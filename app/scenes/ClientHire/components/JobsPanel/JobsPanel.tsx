import { MenuItem, Divider } from '@material-ui/core'
import { Link, ResponsiveButton } from 'components'
import { SelectField } from 'components/themed'
import { useState } from 'react'
import { useCurrentUser, IUseFiltersController } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { JobsPanel_Firm$key } from '__generated__/JobsPanel_Firm.graphql'
import { HireJobsFilters } from 'scenes/ClientHire/Hire'
import { AddCircle, CloudDownload, Visibility } from '@material-ui/icons'
import ImportJob from '../ImportJob'

interface IJobsPanelProps {
  jobsFilters: IUseFiltersController<HireJobsFilters>
  firm: JobsPanel_Firm$key
}

const JobsPanel = ({ jobsFilters, firm: firmProp }: IJobsPanelProps) => {
  const [user] = useCurrentUser()
  const [importJobDialogOpen, setImportJobDialogOpen] = useState(false)
  const firm = useFragment(graphql`
    fragment JobsPanel_Firm on Firm {
      users {
        id
        name
        self
      }
    }
  `, firmProp)
  const managers = firm?.users || []
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ minWidth: 200, paddingTop: 1, marginRight: 12}}>
          <SelectField
            value={jobsFilters.filters.userId || ''}
            onChange={e => jobsFilters.setFilter('userId', e.target.value)}
            label="Jobs Created by"
            fullWidth
          >
            <MenuItem value={null}>
              Whole team
            </MenuItem>

            <Divider />

            {managers.map(manager => (
              <MenuItem key={manager.id} value={manager.id}>
                {manager.name} {manager.self ? '(me)' : ''}
              </MenuItem>
            ))}
          </SelectField>
        </div>

        <ResponsiveButton
          breakpoint={740}
          component={Link}
          href="/client/job/add_job/job"
          iconSide="left"
          style={{ marginRight: 12, height: 42 }}
          icon={<AddCircle />}
          label="New job posting"
          mobileLabel="New"
          data-cy="new-job"
        />

        <ResponsiveButton
          breakpoint={740}
          icon={<Visibility />}
          iconSide="left"
          label="View company jobs page"
          mobileLabel="jobs"
          component={Link}
          href="/[...slugs]"
          as={`/${user.firm?.slug}`}
          style={{ textDecoration: 'none', marginRight: 12, height: 42 }}
          data-cy="preview-jobs-listing"
        />

        <ResponsiveButton
          breakpoint={740}
          iconSide="left"
          icon={<CloudDownload />}
          onClick={() => setImportJobDialogOpen(true)}
          label="Import job"
          mobileLabel="New"
          data-cy="import-job"
          style={{ height: 42 }}
        />
      </div>

      {importJobDialogOpen && <ImportJob onClose={() => setImportJobDialogOpen(false)} />}
    </div>
  )
}

export default JobsPanel
