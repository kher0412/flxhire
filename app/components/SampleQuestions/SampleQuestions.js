import React from 'react'
import Link from 'components/Link'
import styles from './SampleQuestions.module.css'
import { Grid } from '@material-ui/core'
import { LoadingPage } from 'components'
import { find } from 'lodash'
import { getAPIClient } from 'api'

const defaultTitle = 'Sample Interview Questions on Flexhire'

const defaultSubtitle = `
  Asking all candidates the same questions during an interview is an approach known as Structured Interview Questions.
  According to research from Standford University based on 65 years of interview data, using Structured Interview Questions correlates strongly to successful hiring.
  Flexhire makes it simple for our customers to ask Structured Interview Questions for open roles and see video responses from candidates, ensuring science based successful hiring.
`

class SampleQuestions extends React.Component {

  render() {
    const { parentName, title = defaultTitle, subtitle = defaultSubtitle, categories } = this.props

    if (!categories) {
      return (
        <div className={styles['sample-questions']}>
          <LoadingPage />
        </div>
      )
    }

    let filteredCategories = categories
    if (parentName) {
      // Find children categories
      filteredCategories = categories.filter(c => c.freelancer_type_slug === parentName || find(c.freelancer_types_slugs || [], x => x === parentName))
    } else {
      // Keep only top level categories
      // not working so commenting out - ask Enrico
      filteredCategories = categories.filter(c => c.level === 0)
    }

    if (filteredCategories.length === 0) {
      return null
    }

    return (
      <div className={styles['sample-questions']}>
        <div className={styles.category}>
          {title && (
          <div className={styles['category-title']}>
            {title}
          </div>
          )}
          {subtitle && (
          <div className={styles.subtitle}>{subtitle}</div>
          )}

          <Grid container spacing={24}>
            {filteredCategories.sort((a, b) => a.name.localeCompare(b.name)).map(category => (
              <Grid key={category.slug} item xs={12} sm={6} md={4} lg={3} className={styles.item}>
                <Link href="/interview_questions/[category]" as={`/interview_questions/${category.slug}`}>
                  Top {category.name} Questions
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  }
}

export default SampleQuestions
