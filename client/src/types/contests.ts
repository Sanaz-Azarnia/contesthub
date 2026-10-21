export interface Question {
  id: number
  category: string
  difficulty: string
  type: string
  questionText: string
  options: string[]
}

export interface PagedResult<T = Question> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}