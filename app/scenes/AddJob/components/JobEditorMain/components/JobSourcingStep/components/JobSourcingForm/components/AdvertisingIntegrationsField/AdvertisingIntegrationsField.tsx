import { Card, CardHeader, CardContent, Typography, Checkbox } from '@material-ui/core'
import React from 'react'
import { FormValueInput, FormValueMeta } from 'types'
import { InfoMessage } from 'components/themed'
import { getIntegrationPriceText } from 'services/job'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { AdvertisingIntegrationsField_Query } from '__generated__/AdvertisingIntegrationsField_Query.graphql'
import StackOverflowIcon from './components/StackOverflowIcon'
import styles from './AdvertisingIntegrationsField.module.css'
import { integrationDescriptions } from './integrationDescriptions'

export interface IAdvertisingIntegrationsFieldProps {
  input: FormValueInput<string[]>
  meta: FormValueMeta
}

function AdvertisingIntegrationsField(props: IAdvertisingIntegrationsFieldProps) {
  const { input } = props
  const enabledIntegrationsSet = new Set(input.value || [])

  // note: we could use a fragment here instead, but that would require composing fragments all the way down here
  const data = useLazyLoadQuery<AdvertisingIntegrationsField_Query>(graphql`
    query AdvertisingIntegrationsField_Query {
      jobIntegrationProviders {
        name
        activationFeeUsd
        dailyFeeUsd
      }
    }
  `, {})

  const integrations = data?.jobIntegrationProviders

  const handleSwitchToggle = (name: string, checked: boolean) => {
    const _enabledIntegrationsSet = new Set(input.value || [])

    if (checked) {
      _enabledIntegrationsSet.add(name)
    } else {
      _enabledIntegrationsSet.delete(name)
    }

    input.onChange(Array.from(_enabledIntegrationsSet))
  }

  return (
    <div>
      {!integrations?.length && (
        <InfoMessage>
          No integrations are available at the moment.
        </InfoMessage>
      )}

      {integrations?.map(integrationType => (
        <Card key={integrationType.name} className={styles.card} elevation={0}>
          <CardHeader
            avatar={(<StackOverflowIcon />)}
            title={integrationType.name}
            subheader={(
              <span className={styles.cardSubheader}>
                {getIntegrationPriceText(integrationType.activationFeeUsd, integrationType.dailyFeeUsd)}
              </span>
            )}
            action={(
              <Checkbox
                data-cy={`checkbox-job-integration-${integrationType.name}`}
                color="primary"
                checked={enabledIntegrationsSet.has(integrationType.name)}
                onChange={(e, checked) => handleSwitchToggle(integrationType.name, checked)}
              />
            )}
          />

          {integrationDescriptions[integrationType.name?.toLowerCase()] && (
            <CardContent className={styles.cardContent}>
              <Typography variant="body2">
                {integrationDescriptions[integrationType.name?.toLowerCase()]}
              </Typography>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default React.memo(AdvertisingIntegrationsField)
