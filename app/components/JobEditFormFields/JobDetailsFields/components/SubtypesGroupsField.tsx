import { Grid } from '@material-ui/core'
import SubtypesInput from 'components/SubtypesInput'
import { ISubtypesInputProps } from 'components/SubtypesInput/SubtypesInput'
import { InputGroup, InputGroupHelpButton } from 'components/themed'
import { useMemo } from 'react'
import { getGroupsByIndex, normalizeGroupIndexes } from 'services/job'
import { FormValueInput } from 'types'

interface ISubtypesGroupFieldProps extends ISubtypesInputProps {
  input: FormValueInput<{ id: number, group_index?: number }[]>
}

const SubtypesGroupField = ({ input, ...props }: ISubtypesGroupFieldProps) => {
  const groups = useMemo(() => {
    let list = getGroupsByIndex(input?.value)
    if (list.length <= 1 || list[list.length - 1]?.items?.length > 0) {
      list.push({ index: Math.max(...list.map(g => g.index || 0)) + 1, items: [] })
    }

    return list
  }, [input?.value])
  return (
    <Grid container spacing={2}>
      {groups.map((group) => {
        let label = props.label || 'Specializations'
        let hintText = props.hintText

        if (group.index > 0) {
          label = `${label} (Alt. set #${group.index})`
          hintText = `Alternative set #${group.index} of must-have specializations`
          if (group.items.length === 0) {
            if (group.index === 1) {
              hintText = 'Optionally add an alternative set of must-have specializations'
            } else {
              hintText = 'Optionally add another alternative set of must-have specializations'
            }
          }
        }
        return (
          <Grid item xs={12} key={group.index}>
            <InputGroup>
              <SubtypesInput
                {...props}
                label={label}
                hintText={hintText}
                input={{
                  ...input,
                  value: group.items,
                  onChange: (val) => {
                    const others = (input?.value || []).filter(v => (v.group_index || 0) !== group.index)
                    const newVal = normalizeGroupIndexes(others.concat(val.map(v => ({ ...v, group_index: group.index }))))
                    input.onChange(newVal)
                  },
                }}
              />
              <InputGroupHelpButton title="Required specializations sets">
                You can add up to 3 required specializations in each set. However, you can also add more than one set
                of required specializations.
                <br /><br />
                Applicants will be considered a match if they fully cover <em>at least one</em> of your required specializations sets.
                Specializations <em>within</em> a required specialization set are LOGICALLY AND grouped - ie, you need to have all of them to apply.
                Specializations <em>between</em> required specialization sets are LOGICALLY OR grouped - ie, if you match all specializations in ANY specialization group you can apply.
                <br /><br />
                This allows you to be flexible with required specializations for your job. Thus, for example, if you have a role that requires Frontend AND Backend you can put them in one specialization set.
                However if you have a role that requires Frontend OR Backend you should put each one in their own required specialization sets.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SubtypesGroupField
