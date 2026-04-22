export interface ApiResponse<T> {
  data: T
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface Brand {
  code: string
  name: string
}
