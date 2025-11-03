export interface User {
  user_id: string
  user_name: string
  user_profile_img?: string
}

export interface Category {
  category_id: string
  category_name: string
  category_description?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Bookmark {
  bookmark_id: string
  bookmark_title: string
  bookmark_url: string
  bookmark_description?: string
  category_id: string
  category?: Category 
  user_id: string
  created_at: string
  updated_at: string
}

// export interface Bookmarks {

// }

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