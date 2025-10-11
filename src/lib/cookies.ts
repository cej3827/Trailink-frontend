'use server'

import { cookies } from 'next/headers'

// HttpOnly 쿠키 설정
export async function setAuthCookie(token: string): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production'
  
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,           // JavaScript 접근 차단
    secure: isProduction,     // HTTPS에서만 전송 (프로덕션)
    sameSite: 'strict',       // CSRF 보호
    maxAge: 7 * 24 * 60 * 60, // 7일
    path: '/'
  })
}

// HttpOnly 쿠키 삭제
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

// 쿠키 확인
export async function checkAuth() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('auth-token')?.value
  return !!token
}
