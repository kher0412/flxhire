import React from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import Link from 'components/Link'
import styles from '../../PageTopHeader.module.css'

interface IBreadcrumb {
  id: number,
  name: string,
  href: string,
  as?: string,
}

interface IBreadcrumbs extends Array<IBreadcrumb>{}

interface IPageHeaderBreadcrumbsProps {
  breadcrumbs: IBreadcrumbs
}

const PageHeaderBreadcrumbs: React.FunctionComponent<IPageHeaderBreadcrumbsProps> = (props: IPageHeaderBreadcrumbsProps) => {
  const { breadcrumbs } = props

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '9px 0 0 0' }}>
        {breadcrumbs.map((breadcrumb, index) => {
          const last = index === breadcrumbs.length - 1

          return last ? (
            <Typography color="textPrimary" key={breadcrumb.id} style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 'normal' }}>
              {breadcrumb.name}
            </Typography>
          ) : (
            <Link href={breadcrumb.href} as={breadcrumb.as && breadcrumb.as} className={styles.breadcrumbLink}>
              {breadcrumb.name}
            </Link>
          )
        })}
      </Breadcrumbs>
    </React.Fragment>
  )
}

export default React.memo(PageHeaderBreadcrumbs)
