// 공통 유틸리티 함수등


/**
 * URL이 유효한지 검증하는 함수
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

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
