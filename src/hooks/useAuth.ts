'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import * as authAPI from '@/api/authAPI'
import { setAuthCookie, removeAuthCookie } from '@/lib/cookies'

// 현재 로그인한 유저 정보를 가져오는 훅
export function useCurrentUser() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  // 카테고리 페이지인지 확인
  const isCategoryPage = pathname?.startsWith('/category/')

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const result = await authAPI.getCurrentUser()
        return result
      } catch (error) {
        // 에러를 throw하지 않고 null 반환
        console.error('getCurrentUser error:', error)
        return null
      }
    },
    retry: false,
    staleTime: 30 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    throwOnError: false,
  })

  // 인증 에러 시 자동 처리
  useEffect(() => {
    // 공개 카테고리 페이지에서는 에러 처리하지 않음
    if (isCategoryPage) {
      return
    }

    if (query.error) {
      const handleAuthError = async () => {
        try {
          await removeAuthCookie()
          queryClient.clear()
          router.push('/')
          router.refresh()
        } catch (error) {
          console.error('인증 에러 처리 실패:', error)
        }
      }
      handleAuthError()
    }

  }, [query.error, isCategoryPage, queryClient, router])

  return query
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