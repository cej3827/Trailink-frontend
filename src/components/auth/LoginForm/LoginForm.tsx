'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/useAuth'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button/Button'

export default function LoginForm() {
  const { setShowLoginForm } = useUIStore()
  const loginMutation = useLogin()

  const [user_id, setUserId] = useState('')
  const [user_password, setUserPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { user_id, user_password },
      { onSuccess: () => setShowLoginForm(false) }
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        {/* 타이틀 */}
        <div>
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            환영합니다.
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Trailink에서 링크를 정리하고 공유해 보세요.
          </p>
        </div>

        {/* 에러 */}
        {loginMutation.error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          >
            {(loginMutation.error as Error).message}
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              아이디
            </label>
            <div className="mt-2">
              <input
                id="id"
                type="text"
                autoFocus
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                required
                placeholder="아이디를 입력하세요"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 sm:text-sm
                           shadow-sm outline-none transition
                           focus:border-primary focus:ring-4 focus:ring-primary/15
                           dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-500
                           dark:focus:ring-primary/25"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              비밀번호
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={user_password}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 sm:text-sm
                           shadow-sm outline-none transition
                           focus:border-primary focus:ring-4 focus:ring-primary/15
                           dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:placeholder:text-neutral-500
                           dark:focus:ring-primary/25"
              />
            </div>
          </div>

          {/* 옵션 */}
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-700 dark:bg-neutral-950"
              />
              로그인 상태 유지
            </label>

            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4
                         focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1 py-1
                         dark:text-neutral-300 dark:hover:text-neutral-50"
            >
              비밀번호 찾기
            </Link>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loginMutation.isPending}
              className="w-full rounded-xl"
            >
              로그인
            </Button>
          </div>
        </form>

        {/* 하단 링크 */}
        <div className="pt-2 border-t dark:border-neutral-800">
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
            아직 계정이 없나요?{' '}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:opacity-90 underline underline-offset-4
                         focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1 py-1"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
