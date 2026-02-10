'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

type Props = {
  onLoginClick: () => void
}

export default function FinalCTA({ onLoginClick }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section className="py-14 sm:py-20 lg:py-24 border-t">
      <div
        ref={ref}
        className={[
          'max-w-6xl mx-auto px-4 transition-all duration-700',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <div className="rounded-3xl border bg-neutral-50 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">지금 바로 시작해 보세요</h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                이 모든 경험을 Trailink에서 만들어보세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={onLoginClick}
                className="w-full sm:w-auto rounded-md bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition"
              >
                로그인
              </button>
              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-md border border-secondary text-secondary px-6 py-3 font-semibold hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition text-center"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
