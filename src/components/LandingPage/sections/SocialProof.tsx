'use client'

import { useReveal } from '@/hooks/useReveal'

const stats = [
  { k: '카테고리 정리', v: '1분' },
  { k: '링크 추가', v: '10초' },
  { k: '탐색 동선', v: '2단계' },
]

const quotes = [
  { name: '스터디 팀원', text: '공유된 카테고리만 봐도 자료 정리가 훨씬 빨라졌어요.' },
  { name: '개발자 친구', text: '링크를 다시 찾는 시간이 줄어서 생산성이 올라갔습니다.' },
  { name: '학교 동기', text: '어떤 링크인지 한눈에 보여서 좋아요.' },
]

export default function SocialProof() {
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
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">정리된 링크는 공유될수록 더 좋아져요</h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              “내가 모은 링크”는 지적 자산이 될 수 있습니다. <br />
              Trailink는 공유와 탐색을 자연스럽게 연결합니다.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              {stats.map((s) => (
                <div key={s.k} className="rounded-2xl border bg-neutral-50 p-4">
                  <p className="text-xs text-neutral-500">{s.k}</p>
                  <p className="mt-1 text-lg font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {quotes.map((q) => (
              <figure key={q.name} className="rounded-3xl border bg-neutral-50 p-5 sm:p-6 shadow-sm">
                <blockquote className="text-sm text-neutral-700 leading-relaxed">“{q.text}”</blockquote>
                <figcaption className="mt-3 text-xs text-neutral-500">— {q.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
