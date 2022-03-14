import React from 'react'
import Link from 'components/Link'
import { LoadingPage } from 'components'
import { getAPIClient } from 'api'
import styles from './SampleQuestions.module.css'

export default class SampleQuestions extends React.Component {
  state = { categories: null }

  async componentDidMount() {
    const categories = await getAPIClient().getFeaturedQuestionCategories()
    this.setState({ categories })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.divider} />

        <div className={styles.icon}>
          <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 0C29.6821 0 22.5285 2.17001 16.4439 6.23562C10.3593 10.3012 5.61692 16.0798 2.81647 22.8407C0.0160319 29.6016 -0.716692 37.041 0.710961 44.2183C2.13861 51.3956 5.66252 57.9884 10.8371 63.1629C16.0116 68.3375 22.6044 71.8614 29.7817 73.289C36.959 74.7167 44.3984 73.984 51.1593 71.1835C57.9202 68.3831 63.6988 63.6407 67.7644 57.5561C71.83 51.4715 74 44.3179 74 37C73.9889 27.1904 70.0871 17.7857 63.1507 10.8493C56.2143 3.91287 46.8096 0.0110987 37 0ZM34.5333 60.4333C33.8016 60.4333 33.0862 60.2163 32.4777 59.8098C31.8693 59.4032 31.395 58.8253 31.115 58.1493C30.8349 57.4732 30.7617 56.7292 30.9044 56.0115C31.0472 55.2938 31.3996 54.6345 31.917 54.117C32.4345 53.5996 33.0938 53.2472 33.8115 53.1044C34.5292 52.9617 35.2732 53.0349 35.9493 53.315C36.6254 53.595 37.2032 54.0693 37.6098 54.6777C38.0163 55.2862 38.2333 56.0015 38.2333 56.7333C38.2333 57.7146 37.8435 58.6557 37.1496 59.3496C36.4558 60.0435 35.5146 60.4333 34.5333 60.4333ZM46.99 31.952C45.4332 33.7393 43.7312 35.3947 41.9013 36.9013C40.2931 38.1517 38.8946 39.6505 37.7585 41.3413C36.9356 43.0839 36.5875 45.013 36.7496 46.9333H32.7487C32.5427 44.3807 32.9249 41.815 33.8661 39.4334C34.9008 37.5179 36.3155 35.8337 38.0237 34.484C42.8065 30.4399 44.4469 28.6602 44.4469 24.7715C44.4469 20.186 41.2069 18.1621 36.5659 18.1621C33.0237 18.1849 29.5447 19.103 26.4525 20.831L24.6223 16.6377C28.3932 14.6239 32.6018 13.5692 36.8767 13.5667C40.8233 13.5667 43.8952 14.5389 46.0921 16.4835C47.2107 17.5283 48.0854 18.8068 48.6539 20.2279C49.2224 21.6491 49.4708 23.1781 49.3814 24.7061C49.4633 27.3278 48.6163 29.8941 46.99 31.952Z" fill="#2ECB80" />
          </svg>
        </div>

        <div className={styles.heading}>
          Sample Interview Questions on FlexHire
        </div>

        <div className={styles.subheading}>
          Asking all candidates the same questions during an interview is an approach known as Structured Interview Questions.
          According to research from Standford University based on 65 years of interview data, using Structured Interview Questions correlates strongly to successful hiring.
          Flexhire makes it simple for you to ask Structured Interview Questions for open roles and see video responses from candidates, ensuring science based successful hiring.
        </div>

        {this.renderContent()}
      </div>
    )
  }

  renderContent() {
    const { categories } = this.state

    if (!categories) {
      return (
        <LoadingPage />
      )
    }

    if (categories.length === 0) {
      return null
    }

    return (
      <div className={styles.items}>
        {categories.sort((a, b) => a.name.localeCompare(b.name)).map(category => (
          <Link
            key={category.slug}
            href="/interview_questions/[category]"
            as={`/interview_questions/${category.slug}`}
            className={styles.itemLink}
          >
            <div className={styles.item}>
              Top {category.name} Questions
            </div>
          </Link>
        ))}
      </div>
    )
  }
}
