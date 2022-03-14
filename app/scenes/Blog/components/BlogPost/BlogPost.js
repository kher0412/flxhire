import React from 'react'
import { Helmet } from 'react-helmet'
import { DiscussionEmbed } from 'disqus-react'
import { Card } from '@material-ui/core'
import { PageBundlePlaceholder, Page, PageBody, PageContent, PagePlaceholder, PageHeader, PageHeaderTitle } from 'components'
import { getCurrentLocationFull } from 'services/router'
import MarkdownRenderer from '../MarkdownRenderer'
import Header from './components/Header'
import MetaInfo from './components/MetaInfo'
import ProfileHireBox from './components/ProfileHireBox'
import styles from './BlogPost.module.css'

export default class BlogPost extends React.PureComponent {
  componentDidMount() {
    const { getBlogPost, router } = this.props

    getBlogPost(router.query.post)
  }

  render() {
    const { router, blogPost = {}, blogPostReceived = false, error } = this.props

    if (!blogPostReceived) {
      return (
        <PageBundlePlaceholder />
      )
    }

    if (error) {
      return (
        <Page>
          <PageHeader>
            <PageHeaderTitle>
              Not Found
            </PageHeaderTitle>
          </PageHeader>

          <PageBody>
            <PageContent maxWidth="lg">
              <PagePlaceholder title={error.message} />
            </PageContent>
          </PageBody>
        </Page>
      )
    }

    return (
      <Page>
        <Helmet>
          <title>{`${blogPost.title} - Blog on ${blogPost.blog_category_name}`}</title>
          <meta name="description" content={(blogPost.content || '').substring(0, 150)} />
          <meta property="og:title" content={`${blogPost.title} - Blog on ${blogPost.blog_category_name} - Flexhire`} />
          <meta property="og:description" content={(blogPost.content || '').substring(0, 150)} />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'BlogPosting',
              headline: (blogPost.title || '').substring(0, 110),
              description: blogPost.excerpt,
              articleBody: blogPost.content,
              author: {
                name: blogPost.author_name,
                ...(blogPost.author_avatar_url && { image: blogPost.author_avatar_url }),
              },
              datePublished: blogPost.post_date,
              publisher: {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Flexhire',
                url: 'https://flexhire.com',
                logo: require('assets/images/logos/flexhire-logo-white.png'),
                slogan: 'Connecting Talent & Opportunity',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '7809 Prospector Drive, Cottonwood Heights',
                  addressLocality: 'Salt Lake City',
                  addressRegion: 'UT',
                  postalCode: '84121',
                  country: 'USA',
                },
                email: 'info@flexhire.com',
              },
              genre: blogPost.blog_category_name,
            })}
          </script>
        </Helmet>

        <Header blogPost={blogPost} />

        <PageBody>
          <PageContent maxWidth="lg">
            <Card raised className={styles.container}>
              <MetaInfo blogPost={blogPost} />

              <div className={styles['content-wrapper']}>
                <MarkdownRenderer text={blogPost.content} />
              </div>

              <ProfileHireBox blogPost={blogPost} />
            </Card>

            <div className={styles['comments-wrapper']}>
              <DiscussionEmbed
                config={{ url: getCurrentLocationFull(router), identifier: blogPost.id, title: blogPost.title }}
                shortname={process.env.DISQUS_SHORTNAME || undefined}
              />
            </div>
          </PageContent>
        </PageBody>
      </Page>
    )
  }
}
