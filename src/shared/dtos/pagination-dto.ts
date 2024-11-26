export type PaginationDto<T, F> = {
  skip?: number,
  limit?: number,
  filter?: F,
  data?: T[],
  total?: number
}