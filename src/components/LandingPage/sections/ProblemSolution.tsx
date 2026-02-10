'use client'

import { useReveal } from '@/hooks/useReveal'

export default function ProblemSolution() {
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
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border bg-neutral-50 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">문제</h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              “나중에 봐야지” 하고 저장한 링크가 이곳 저곳 쌓이기만 하고, 정작 필요할 때는 찾지 못하고 계시진 않나요?
              그렇게 쌓인 링크들은 사용되지 못하고 결국 잊혀지기 마련입니다.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2"><span aria-hidden>•</span><span>북마크가 쌓이기만 하고 재사용이 어려움</span></li>
              <li className="flex gap-2"><span aria-hidden>•</span><span>링크 주소만으로는 무슨 링크인지 바로 알기가 쉽지 않음</span></li>
              <li className="flex gap-2"><span aria-hidden>•</span><span>좋은 자료를 공유 받을 동선이 없음</span></li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-neutral-50 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">해결</h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              Trailink는 저장한 링크를 카테고리로 정리하고, 정리된 북마크를 탐색할 수 있게 해요.
              “저장 → 정리 → 공유/탐색” 흐름을 만들어 보세요.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-neutral-100/70 p-5">
                <p className="font-semibold">정리</p>
                <p className="mt-1 text-sm text-neutral-600">카테고리/설명으로 맥락을 남겨요</p>
              </div>
              <div className="rounded-2xl bg-neutral-100/70 p-5">
                <p className="font-semibold">검색</p>
                <p className="mt-1 text-sm text-neutral-600">키워드로 빠르게 찾아요</p>
              </div>
              <div className="rounded-2xl bg-neutral-100/70 p-5">
                <p className="font-semibold">공유</p>
                <p className="mt-1 text-sm text-neutral-600">필요한 사람에게 공유해요</p>
              </div>
              <div className="rounded-2xl bg-neutral-100/70 p-5">
                <p className="font-semibold">탐색</p>
                <p className="mt-1 text-sm text-neutral-600">최근 업데이트를 한눈에 봐요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
