'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import * as authAPI from '@/api/authAPI'
import { setAuthCookie, removeAuthCookie } from '@/lib/cookies'

// 현재 로그인한 유저 정보를 가져오는 훅
export function useCurrentUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await authAPI.getCurrentUser()
      return result
    },
    retry: false, // 인증 에러 시 재시도 하지 않음
    staleTime: 30 * 60 * 1000, // 30분 동안 fresh 상태 유지
    gcTime: 24 * 60 * 60 * 1000, // 24시간 동안 캐시 유지
  })
}

// 로그인 뮤테이션 훅
export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: async (data) => {
      try {
        await setAuthCookie(data.token)
        
        // 유저 정보를 쿼리 캐시에 저장
        queryClient.setQueryData(['user'], data.user)
        // 이제 useQuery(['user'])를 사용하는 모든 컴포넌트가
        // 서버 요청 없이 바로 사용자 정보를 볼 수 있음!
        
        // 홈페이지로 리다이렉션
        router.push('/')
        router.refresh() // 서버 컴포넌트 새로고침
      } catch (error) {
        console.error('쿠키 설정 실패:', error)
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error)
    },
  })
}

// /**
//  * 회원가입 뮤테이션 훅
//  */
// export function useRegister() {
//   const queryClient = useQueryClient()
//   const router = useRouter()

//   return useMutation({
//     mutationFn: (data: RegisterData) => apiClient.register(data),
//     onSuccess: (data) => {
//       // 로그인과 동일한 처리
//       apiClient.setToken(data.token)
//       document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`
//       queryClient.setQueryData(QUERY_KEYS.USER, data.user)
//       router.push('/')
//       router.refresh()
//     },
//   })
// }

// 로그아웃 
export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      // 쿠키 삭제
      await removeAuthCookie()
    },
    onSuccess: () => {
      // 모든 쿼리 캐시 삭제
      queryClient.clear()
      
      // 로그인 페이지로 리디렉션
      router.push('/')
      router.refresh()
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error)
      // 에러가 발생해도 클라이언트 캐시는 삭제
      queryClient.clear()
      router.push('/')
    }
  })
}