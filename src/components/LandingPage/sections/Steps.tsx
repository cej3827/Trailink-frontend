'use client'

import { useReveal } from '@/hooks/useReveal'

const steps = [
  { n: '01', title: '링크 저장', desc: 'URL과 제목/설명을 입력해 북마크를 추가해요.' },
  { n: '02', title: '카테고리로 정리', desc: '분류 기준을 정하고, 필요한 맥락을 함께 저장해요.' },
  { n: '03', title: '공유하고 탐색', desc: '필요한 대상에게 공유하고 필요한 링크를 찾아봐요.' },
]

export default function Steps() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section id="how" className="py-14 sm:py-20 lg:py-24 border-t dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
      <div
        ref={ref}
        className={[
          'max-w-6xl mx-auto px-4 transition-all duration-700',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">3단계로 끝</h2>
          <p className="mt-3 text-neutral-600">복잡한 설정 없이, 저장하고 정리하고 공유하면 됩니다.</p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border bg-neutral-50 p-6 sm:p-7 shadow-sm">
              <p className="text-sm font-semibold text-neutral-500">{s.n}</p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <div className="mt-6 h-1 w-12 rounded-full bg-neutral-200" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
