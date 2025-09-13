export interface User {
  id: string
//   email: string
  name: string
  avatar?: string
//   createdAt: string
//   updatedAt: string
}

export interface Category {
  id: string
  name: string
  description?: string
//   color?: string
//   isPublic: boolean
  userId: string
  // bookmarkCount?: number
  createdAt: string
  updatedAt: string
}

export interface Bookmark {
  id: string
  title: string
  url: string
  description?: string
//   notes?: string
  categoryId: string
  category?: Category // 관계형 데이터
  userId: string
//   previewImage?: string
//   favicon?: string
//   isPublic: boolean
  createdAt: string
  updatedAt: string
//   category?: Category // populate된 경우
}

// API 요청용 타입들
export interface CreateBookmarkData {
  bookmark_title: string
  bookmark_url: string
  bookmark_description?: string
  category_id: string
}

// export interface UpdateBookmarkData extends Partial<CreateBookmarkData> {}
export type UpdateBookmarkData = Partial<CreateBookmarkData>;

export interface CreateCategoryData {
  category_name: string
  category_description?: string
//   color?: string
//   isPublic: boolean
}

// export interface UpdateCategoryData extends Partial<CreateCategoryData> {}
export type UpdateCategoryData = Partial<CreateCategoryData>;

// 로그인 요청 시
export interface LoginCredentials {
  user_id: string
  user_password: string
}

// export interface RegisterData {
//   name: string
//   email: string
//   password: string
// }

// API 응답 타입들
export interface AuthResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  code?: string
  field?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}
