'use server'

import { API_BASE_URL } from './index'
import { LoginCredentials } from '@/types'
import { cookies } from 'next/headers'

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
  // 쿠키에서 토큰 읽기
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    throw new Error('토큰이 없습니다')
  } 

  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json()
    console.log(errorData)

    if (errorData.error === 'TOKEN_EXPIRED') {
      // 쿠키 삭제
      cookieStore.delete('auth-token')
      throw new Error('TOKEN_EXPIRED')
    }

    throw new Error('유저 정보 조회 실패')
  }

  const data = await response.json();
  console.log('서버에서 받은 데이터:', data)
  return data.user
}
