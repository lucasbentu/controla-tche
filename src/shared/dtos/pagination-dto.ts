export type PaginationDto<T, F> = {
  limit?: number,
  skip?: number,
  total?: number
  filter?: F,
  data?: T[],
}