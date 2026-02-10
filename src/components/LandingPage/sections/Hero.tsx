'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import Image from 'next/image'

type Props = {
  onLoginClick: () => void
  onSignupClick: () => void
}

export default function Hero({ onLoginClick }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2)

  return (
    <section className="relative overflow-hidden">
      {/* 배경 장식 */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-neutral-50 blur-3xl" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-neutral-50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative">
        <div
          ref={ref}
          className={[
            'grid gap-10 lg:gap-12 lg:grid-cols-2 items-center transition-all duration-700',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <div>
            <p className="inline-flex items-center rounded-full border bg-neutral-50 px-3 py-1 text-xs sm:text-sm text-neutral-600">
              링크를 가장 쉽게 관리하는 방법
            </p>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-tight">
              <span className="block font-medium">쌓아두지 말고</span>
              <span className="block mt-2 text-accent text-3xl sm:text-4xl lg:text-4xl py-2">
                정리하고 · 공유하고 · 탐색하세요
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-xl text-secondary leading-relaxed">
              메모장에 쌓아만 두던 링크를 ‘사용 가능한 지식’으로 바꾸세요. <br/>
              카테고리별로 정리하고, 사람들과 공유할 수 있어요.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
              <button
                onClick={onLoginClick}
                className="w-full sm:w-auto rounded-md bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition"
              >
                로그인하고 시작하기
              </button>

              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-md border border-secondary text-secondary px-6 py-3 font-semibold hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition text-center"
              >
                회원가입
              </Link>

              <a
                href="#features"
                className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-2 w-fit"
              >
                기능 먼저 보기 →
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div className="rounded-2xl border bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">정리</p>
                <p className="mt-1 font-semibold">카테고리/태그</p>
              </div>
              <div className="rounded-2xl border bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">공유</p>
                <p className="mt-1 font-semibold">공개 카테고리</p>
              </div>
              <div className="rounded-2xl border bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">탐색</p>
                <p className="mt-1 font-semibold">최신 북마크</p>
              </div>
            </div>
          </div>

          {/* 우측 목업(이미지 대신 CSS로) */}
          {/* <div className="lg:justify-self-end">
            <div className="rounded-3xl border bg-neutral-50 shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-neutral-200" />
                <span className="h-3 w-3 rounded-full bg-neutral-200" />
                <span className="h-3 w-3 rounded-full bg-neutral-200" />
                <div className="ml-3 h-8 flex-1 rounded-xl bg-neutral-100" />
              </div>
              <div className="p-6 space-y-4">
                <div className="h-10 rounded-2xl bg-neutral-100" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-2xl bg-neutral-100" />
                  <div className="h-28 rounded-2xl bg-neutral-100" />
                </div>
                <div className="h-28 rounded-2xl bg-neutral-100" />
                <div className="flex gap-2">
                  <div className="h-10 w-24 rounded-xl bg-neutral-100" />
                  <div className="h-10 w-28 rounded-xl bg-neutral-100" />
                </div>
              </div>
            </div> */}

            {/* 우측 목업 이미지 (next/image 최적화) */}
            <div className="lg:justify-self-end">
              <div className="rounded-3xl border bg-neutral-50 shadow-sm overflow-hidden">
                <div className="relative aspect-[16/10] w-full max-w-[640px]">
                  <Image
                    src="/images/landing/landing-hero.png"
                    alt="Trailink 서비스 화면 미리보기"
                    fill
                    priority
                    sizes="(min-width: 1024px) 640px, (min-width: 640px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

            <p className="mt-3 text-xs text-neutral-500">
              * 포트폴리오에서는 실제 구현 화면 캡처를 사용했습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
