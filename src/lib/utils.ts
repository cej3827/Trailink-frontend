// // // 공통 유틸리티 함수들 (자주 쓰는 도구들)

import { clsx, type ClassValue } from 'clsx'

/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 * Tailwind CSS와 SCSS 클래스를 함께 사용할 때 유용
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// /**
//  * URL이 유효한지 검증하는 함수
//  */
// export function isValidUrl(string: string): boolean {
//   try {
//     new URL(string)
//     return true
//   } catch {
//     return false
//   }
// }

// /**
//  * 텍스트를 지정된 길이로 자르고 '...' 추가
//  */
// export function truncateText(text: string, maxLength: number): string {
//   if (text.length <= maxLength) return text
//   return text.slice(0, maxLength) + '...'
// }

// /**
//  * 날짜를 상대적인 시간으로 변환 (예: "2시간 전")
//  */
// export function formatRelativeTime(date: string | Date): string {
//   const now = new Date()
//   const target = new Date(date)
//   const diffMs = now.getTime() - target.getTime()
//   const diffMinutes = Math.floor(diffMs / (1000 * 60))
//   const diffHours = Math.floor(diffMinutes / 60)
//   const diffDays = Math.floor(diffHours / 24)

//   if (diffMinutes < 1) return '방금 전'
//   if (diffMinutes < 60) return `${diffMinutes}분 전`
//   if (diffHours < 24) return `${diffHours}시간 전`
//   if (diffDays < 7) return `${diffDays}일 전`
  
//   return target.toLocaleDateString('ko-KR')
// }

// /**
//  * 도메인에서 파비콘 URL 생성
//  */
// export function getFaviconUrl(url: string): string {
//   try {
//     const domain = new URL(url).hostname
//     return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
//   } catch {
//     return '/icons/default-favicon.png'
//   }
// }

// /**
//  * 에러 객체에서 사용자에게 보여줄 메시지 추출
//  */
// export function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) {
//     return error.message
//   }
//   if (typeof error === 'string') {
//     return error
//   }
//   return '알 수 없는 오류가 발생했습니다.'
// }

// /**
//  * 디바운스 함수 - 검색어 입력 시 사용
//  */
// export function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), wait)
//   }
// }
