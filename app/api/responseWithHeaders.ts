export interface IResponseWithHeaders<T> {
  body: T
  headers: {
    totalCount?: number
  }
}
