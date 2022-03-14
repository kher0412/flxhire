import React from 'react'
import { IconButton } from '@material-ui/core'
import { MoreButtonCard } from 'components'
import { TextField } from 'components/themed'
import { ArrowForward } from '@material-ui/icons'
import styles from './PagePagination.module.css'
import RowsPerPageSetting from './components/RowsPerPageSetting'
import ItemsSummary from './components/ItemsSummary'

const MAX_PAGES = 8

export interface IPagePaginationProps {
  page: number
  rowsPerPage: number
  count: number
  onPageChange: (page: number) => void
  onChangeRowsPerPage?: (rowsPerPage: number) => void
  style?: React.CSSProperties
}

interface IPagePaginationState {
  activePage: number
  quickJumpTarget: number
}

export default class PagePagination extends React.PureComponent<IPagePaginationProps, IPagePaginationState> {
  state = {
    activePage: -1,
    quickJumpTarget: 0,
  }

  moreButtonCard: any

  componentWillReceiveProps(nextProps) {
    const { page } = this.props
    const { activePage } = this.state

    if (nextProps.page !== page && nextProps.page !== activePage) {
      this.setState({
        activePage: nextProps.page,
      })
    }
  }

  render() {
    const { count = 0, rowsPerPage, page, onChangeRowsPerPage, style } = this.props

    const numPages = this.getNumPages()
    const pages = []

    if (numPages < 2) {
      return false
    }

    if (numPages > MAX_PAGES) {
      let numIntermediaryPages = MAX_PAGES - 2

      if (page > 2) numIntermediaryPages -= 1
      if (page < numPages - 3) numIntermediaryPages -= 1

      // First page is always rendered.
      pages.push(this.renderNumberedPage(0))

      const centerPivot = Math.max(3, Math.min(numPages - 4, page))
      const pagesFrom = centerPivot - Math.floor(numIntermediaryPages / 2)
      let pagesTo = centerPivot + Math.ceil(numIntermediaryPages / 2)

      // Cumulative edge align (fixes issue when if there is only 1 page hidden in a gap, 1 less page item appears than necessary).
      if (page > 2 && pagesFrom <= 1) {
        pagesTo++
      } else if (page < numPages - 3 && pagesTo >= numPages - 2) {
        pagesTo++
      }

      if (page > 2 && pagesFrom > 1) {
        pages.push(this.renderGap(1, pagesFrom, -1))
      }

      for (let i = pagesFrom; i < pagesTo; i++) {
        pages.push(this.renderNumberedPage(i))
      }

      if (page < numPages - 3 && pagesTo < numPages - 2) {
        pages.push(this.renderGap(pagesTo, numPages - 2, -2))
      }

      // Last page is always rendered.
      pages.push(this.renderNumberedPage(numPages - 1))
    } else {
      // There is enough room for all pages, list them all.
      for (let i = 0; i < numPages; i++) {
        pages.push(this.renderNumberedPage(i))
      }
    }

    return (
      <React.Fragment>
        <div className={styles.pagination} style={style}>
          {pages}
          <ItemsSummary page={page} count={count} rowsPerPage={rowsPerPage} />
          {onChangeRowsPerPage && <RowsPerPageSetting value={rowsPerPage} onChange={onChangeRowsPerPage} />}
        </div>
      </React.Fragment>
    )
  }

  renderNumberedPage(pageIndex) {
    const { page } = this.props
    const { activePage } = this.state
    const isSelected = (pageIndex === page)

    const styleNameList = [styles.page]

    if (isSelected) {
      styleNameList.push(styles.selected)
    } else if (activePage === pageIndex) {
      styleNameList.push(styles.active)
    }

    return (
      <IconButton key={pageIndex} onClick={() => this.handlePageChange(pageIndex)} className={styleNameList.join(' ')}>
        {pageIndex + 1}
      </IconButton>
    )
  }

  renderGap(from, to, key) {
    const { quickJumpTarget } = this.state

    return (
      <MoreButtonCard
        key={key}
        ref={mbc => this.moreButtonCard = mbc}
        style={{ display: 'inline-block' }}
        onOpen={() => this.handleQuickJumpTargetChange(Math.round((to + from) / 2))}
      >
        <TextField
          type="number"
          label="Jump to page"
          value={quickJumpTarget as any}
          onChange={e => this.handleQuickJumpTargetChange(e.target.value)}
          onBlur={() => this.handlePageChange(quickJumpTarget - 1)}
        />

        <IconButton onClick={() => this.handlePageChange(quickJumpTarget - 1)}>
          <ArrowForward />
        </IconButton>
      </MoreButtonCard>
    )
  }

  handleQuickJumpTargetChange = (page) => {
    this.setState({
      quickJumpTarget: Math.max(1, Math.min(Math.round(page), this.getNumPages())),
    })
  }

  handlePageChange = (pageIndex) => {
    const { onPageChange } = this.props

    if (this.moreButtonCard) {
      this.moreButtonCard.close()
    }

    this.setState({
      activePage: pageIndex,
    })

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (onPageChange) {
          onPageChange(pageIndex)
        }
      })
    })
  }

  getNumPages() {
    const { count = 0, rowsPerPage } = this.props
    return Math.ceil(count / rowsPerPage)
  }
}
