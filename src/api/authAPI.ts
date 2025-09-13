import { API_BASE_URL } from './index'
import { LoginCredentials } from '@/types'

// 로그인
export async function login(credentials: LoginCredentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  
  if (!response.ok) {
    throw new Error('로그인 실패')
  }
  
  return response.json()
}

// // 회원가입
// export async function register(data: RegisterData) {
//   const response = await fetch(`${API_BASE_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
  
//   if (!response.ok) {
//     throw new Error('회원가입 실패')
//   }
  
//   return response.json()
// }

// 현재 유저 정보
export async function getCurrentUser() {
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
  
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers,
  })
  
  if (!response.ok) {
    throw new Error('유저 정보 조회 실패')
  }
  
  return response.json()
}
