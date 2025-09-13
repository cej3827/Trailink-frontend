// react-query + 인증 커스텀훅

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import * as authAPI from '@/api/authAPI'
import { QUERY_KEYS } from '@/lib/constants'
import { LoginCredentials } from '@/types'

// 현재 로그인한 유저 정보를 가져오는 훅
export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: authAPI.getCurrentUser,
    retry: false, // 인증 에러 시 재시도 하지 않음
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
}

// 로그인 뮤테이션 훅
export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // 쿠키에 토큰 저장 (서버액션 호출)
      document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`
      
      // 유저 정보를 쿼리 캐시에 저장
      queryClient.setQueryData(QUERY_KEYS.USER, data.user)
      
      // 홈페이지로 리디렉션
      router.push('/')
      router.refresh() // 서버 컴포넌트 새로고침
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

  return {
    logout: () => {
      // 쿠키 삭제
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      
      // 모든 쿼리 캐시 삭제
      queryClient.clear()
      
      // 로그인 페이지로 리디렉션
      router.push('/login')
      router.refresh()
    },
    isLoading: false,
    isPending: false
  }
}



// // hooks/useAuth.ts
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// interface User {
//   id: string;
//   email: string;
//   name?: string;
// }

// const checkAuthStatus = async (): Promise<{ user: User | null; isAuthenticated: boolean }> => {
//   try {
//     const res = await fetch("/api/auth/me", { credentials: "include" });
//     if (!res.ok) return { user: null, isAuthenticated: false };
//     const user = await res.json();
//     return { user, isAuthenticated: true };
//   } catch {
//     return { user: null, isAuthenticated: false };
//   }
// };

// const loginUser = async (credentials: { email: string; password: string }) => {
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials),
//   });
//   if (!res.ok) {
//     let msg = "로그인에 실패했습니다";
//     try {
//       const err = await res.json();
//       msg = err?.message || msg;
//     } catch {}
//     throw new Error(msg);
//   }
//   return res.json();
// };

// const logoutUser = async () => {
//   const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
//   if (!res.ok) throw new Error("로그아웃 실패");
//   return res.json();
// };

// export const useAuth = () =>
//   useQuery({
//     queryKey: ["auth"],
//     queryFn: checkAuthStatus,
//     staleTime: 5 * 60 * 1000,
//     retry: false,
//     refetchOnWindowFocus: true,
//   });

// export const useLogin = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       qc.setQueryData(["auth"], { user: data.user as User, isAuthenticated: true });
//       window.location.href = "/home";
//     },
//   });
// };

// export const useLogout = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: logoutUser,
//     onSuccess: () => {
//       qc.clear();
//       window.location.href = "/";
//     },
//   });
// };
