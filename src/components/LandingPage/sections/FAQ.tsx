'use client'

import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const faqs = [
  { q: '공유 범위는 어떻게 되나요?', a: '카테고리 단위로 공개/비공개를 설정할 수 있도록 확장 가능한 구조입니다.' },
  { q: '로그인 없이도 볼 수 있나요?', a: '공개 프로필/공개 카테고리는 로그인 없이 열람 가능하도록 구성할 수 있어요.' },
  { q: '북마크는 어떻게 추가하나요?', a: 'URL/제목/설명 입력 후 카테고리를 선택해 저장합니다.' },
  { q: '모바일에서도 사용 가능한가요?', a: '반응형 UI로 제작되어 모바일/태블릿에서도 동일한 경험을 제공합니다.' },
]

export default function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-24 border-t bg-neutral-50">
      <div
        ref={ref}
        className={[
          'max-w-4xl mx-auto px-4 transition-all duration-700',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary">자주 묻는 질문</h2>

        <div className="mt-8 space-y-3">
          {faqs.map((f, idx) => {
            const opened = openIdx === idx
            return (
              <div key={f.q} className="rounded-2xl border bg-neutral-50">
                <button
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
                  aria-expanded={opened}
                  onClick={() => setOpenIdx(opened ? null : idx)}
                >
                  <span className="font-medium text-sm sm:text-base">{f.q}</span>
                  <span className="text-neutral-400">{opened ? '−' : '+'}</span>
                </button>
                {opened && <div className="px-4 sm:px-5 pb-5 text-sm text-neutral-600 leading-relaxed">{f.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
