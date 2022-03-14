import { MoreButtonCard } from 'components'
import { useAPIWrite } from 'hooks'
import { getAPIClient } from 'api'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setHeaderVariant } from 'components/Layout/LayoutDucks'
import { IFirm } from 'types'
import { Settings } from '@material-ui/icons'
import CompanyDisplayOptions from '../CompanyDisplayOptions'

const AlternativeBackgroundButton = ({ firm, ...props }) => {
  const dispatch = useDispatch()
  const onSubmit = useCallback((savedFirm: IFirm) => (
    dispatch(setHeaderVariant({ variant: savedFirm.background_theme === 'light' ? 'default' : 'primary' }))
  ), [])
  const { error, submit, submitting, savedValue } = useAPIWrite<IFirm>(
    (firmData: Pick<IFirm, 'background_theme'>) => getAPIClient().updateFirm({ background_theme: firmData.background_theme }),
    {
      initialValue: firm,
      onSubmit,
    },
  )
  const toggleValue = useCallback(() => {
    submit({ background_theme: savedValue?.background_theme === 'light' ? 'default' : 'light' })
  }, [savedValue?.background_theme])
  return (
    <MoreButtonCard
      tooltip="Display options"
      icon={<Settings />}
      {...props}
    >
      <CompanyDisplayOptions
        input={{
          name: 'background_theme',
          value: savedValue?.background_theme === 'light',
          onChange: toggleValue,
        }}
        meta={{
          touched: true,
          error,
        }}
        disabled={submitting}
      />
    </MoreButtonCard>
  )
}

export default AlternativeBackgroundButton
