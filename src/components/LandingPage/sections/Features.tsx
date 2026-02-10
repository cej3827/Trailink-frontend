'use client'

import { useReveal } from '@/hooks/useReveal'

const items = [
  { title: '카테고리', desc: '쌓인 링크를 규칙적으로 정리해요.' },
  { title: '초고속 검색', desc: '키워드로 바로 찾아서 다시 쓰기.' },
  { title: '공유 & 탐색', desc: '컬렉션을 공유하고 탐색.' },
  { title: '최근 업데이트', desc: '변경된 카테고리를 한눈에 확인.' },
  { title: '정렬', desc: '정렬 기능으로 더 쉽게 찾아요.' },
  { title: '반응형 UI', desc: '모바일/태블릿/PC 어디서나 편하게.' },
]

export default function Features() {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section id="features" className="py-14 sm:py-20 lg:py-24 border-t">
      <div
        ref={ref}
        className={[
          'max-w-6xl mx-auto px-4 transition-all duration-700',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary">필요한 기능만, 정확하게</h2>
          <p className="mt-3 text-secondary">정리 → 공유 → 탐색 흐름에 맞춘 핵심 기능으로 시간을 아껴요.</p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            //   className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-neutral-900">{it.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
