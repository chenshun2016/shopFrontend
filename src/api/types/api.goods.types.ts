
export interface GoodsResData<T> {
  list: T[],
  total: number,
  page: number,
  limit: number
}

export interface GetGoodsApi{
  page: number,
  limit: number,
}