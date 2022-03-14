import { MenuItem } from "@material-ui/core"
import { getAPIClient } from "api"
import { AutoCompleteTextField, SelectField } from "components/themed"
import { Fragment } from "react"
import { HireMembersFilters } from "scenes/ClientHire/Hire"
import { formatAsTitleCase } from "services/formatting"

interface IEducationFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (name: keyof HireMembersFilters, value: any) => void
}

const getUniversitySuggestions = name => getAPIClient()
  .getInstitutes({ name })
  .then(institutes => institutes.slice(0, 20).map(i => formatAsTitleCase(i.name)))

const EducationFields = ({ filterParams = {}, setFilterParam }: IEducationFieldsProps) => {
  return (
    <Fragment>
      <SelectField
        fullWidth
        label="Global university ranking"
        value={filterParams.maxUniversityRank || 0}
        onChange={e => setFilterParam('maxUniversityRank', e.target.value)}
        data-cy="select-show_candidates_by_university_rank"
      >
        <MenuItem value={100} data-cy="top-100">
          Top 100
        </MenuItem>

        <MenuItem value={500} data-cy="top-500">
          Top 500
        </MenuItem>

        <MenuItem value={1000} data-cy="top-1000">
          Top 1000
        </MenuItem>

        <MenuItem value={0} data-cy="any">
          Any
        </MenuItem>
      </SelectField>

      <div style={{ marginTop: 12 }}>
        <AutoCompleteTextField
          meta={{}}
          input={{ value: filterParams.university, onChange: value => setFilterParam('university', value), name: 'filter-university' }}
          getSuggestions={getUniversitySuggestions}
          label="Specific universities"
        />
      </div>
    </Fragment>
  )
}

export default EducationFields
