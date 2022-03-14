export interface IPagination {
  page: number
  rowsPerPage: number
  count: number
}

export interface ISortablePagination extends IPagination {
  orderBy: string
  order: 'asc' | 'desc'
}
