// 상수 정의

// // API 관련 상수
// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: '/auth/login',
//     REGISTER: '/auth/register',
//     ME: '/auth/me',
//     LOGOUT: '/auth/logout',
//   },
//   BOOKMARKS: {
//     LIST: '/bookmarks',
//     RECENT: '/bookmarks/recent',
//     PUBLIC: '/bookmarks/public',
//   },
//   CATEGORIES: {
//     LIST: '/categories',
//     PUBLIC: '/categories/public',
//   },
//   PREVIEW: '/preview',
// } as const

// // UI 관련 상수
// export const PAGINATION = {
//   DEFAULT_LIMIT: 20,
//   MAX_LIMIT: 100,
// } as const

// export const DEBOUNCE_DELAY = 300 // 검색어 입력 디바운스 시간

export const QUERY_KEYS = {
  USER: ['user'] as const,
  BOOKMARKS: ['bookmarks'] as const,
  CATEGORIES: ['categories'] as const,
//   PREVIEW: ['preview'] as const,
} as const

// // 카테고리 색상 옵션
// export const CATEGORY_COLORS = [
//   '#3B82F6', // Blue
//   '#EF4444', // Red
//   '#10B981', // Green
//   '#F59E0B', // Yellow
//   '#8B5CF6', // Purple
//   '#EC4899', // Pink
//   '#06B6D4', // Cyan
//   '#84CC16', // Lime
// ] as const

// // 파일 업로드 제한
// export const FILE_LIMITS = {
//   MAX_SIZE: 5 * 1024 * 1024, // 5MB
//   ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
// } as const
