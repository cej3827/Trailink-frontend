const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 공통 헤더 생성 함수
export function getHeaders() {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  // 쿠키에서 토큰 읽기
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1]
    
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }
  
  return headers
}

export { API_BASE_URL }
