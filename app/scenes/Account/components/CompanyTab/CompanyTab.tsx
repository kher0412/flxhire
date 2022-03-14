import { useCallback } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { useSnackbar, useQuickCommit } from 'hooks'
import { CompanyTab_Query } from '__generated__/CompanyTab_Query.graphql'
import { CompanyTab_SubmitMutation } from '__generated__/CompanyTab_SubmitMutation.graphql'
import CompanyForm, { FormValues } from './components/CompanyForm'

export const CompanyTabQuery = graphql`
  query CompanyTab_Query {
    currentUser {
      ...CompanyForm_User
      firm {
        logoUrl
        name
        website
        description
        backgroundTheme
      }
    }
  }
`

function CompanyTab({ preloadedQuery }: { preloadedQuery: PreloadedQuery<CompanyTab_Query>}) {
  const showSnackbarMessage = useSnackbar()
  const data = usePreloadedQuery(CompanyTabQuery, preloadedQuery)

  const { execute: submit } = useQuickCommit<CompanyTab_SubmitMutation>(
    graphql`
      mutation CompanyTab_SubmitMutation($input: UpdateFirmInput!) {
        updateFirm(input: $input) {
          firm {
            logoUrl
            name
            website
            description
            backgroundTheme
          }
        }
      }
    `,
  )
  const submitForm = useCallback(async (values: FormValues) => {
    const result = await submit({
      input: {
        logoUrl: values.logo_url,
        name: values.name,
        website: values.website,
        description: values.description,
        backgroundTheme: values.alternative_background ? 'light' : 'default',
      },
    })

    if (result) showSnackbarMessage('Company data updated')
  }, [submit])

  const firm = data?.currentUser?.firm

  return (
    <CompanyForm
      initialValues={{
        alternative_background: firm?.backgroundTheme === 'light',
        logo_url: firm?.logoUrl,
        name: firm?.name,
        website: firm?.website,
        description: firm?.description,
      }}
      onSubmit={submitForm}
      user={data?.currentUser}
    />
  )
}

export default CompanyTab
