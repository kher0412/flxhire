import React from 'react'
import { Typography } from '@material-ui/core'
import { SimpleCheck } from 'components'
import { FormValueInput, FormValueMeta } from 'types'
import styles from './CompanyDisplayOptions.module.css'

interface ICompanyDisplayOptionsProps {
  input: FormValueInput<boolean>
  meta: FormValueMeta
  disabled?: boolean
}

const CompanyDisplayOptions = ({ input, meta, disabled }: ICompanyDisplayOptionsProps) => (
  <React.Fragment>
    <div>
      <SimpleCheck
        input={input}
        meta={meta}
        label="Use light background"
        disabled={disabled}
      />
    </div>

    <div className={styles.hint}>
      <Typography variant="body2">
        By default, your company logo is rendered on a dark header on all of your public facing pages.
        If this fails to work for your case, you can choose to render on a light header instead.
      </Typography>
    </div>
  </React.Fragment>
)

export default CompanyDisplayOptions
