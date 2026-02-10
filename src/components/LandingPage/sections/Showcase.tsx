'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const shots = [
  {
    title: '카테고리로 한 번에 정리',
    desc: '분류 기준을 만들고 링크에 맥락을 남겨요.',
    src: '/images/landing/feature-bookmarks.png',
  },
  {
    title: '컬렉션을 정렬/공유',
    desc: '링크를 원하는대로 정렬하고 공유해요.',
    src: '/images/landing/feature-profile.png',
  },
]

export default function Showcase() {
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
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary">실제 화면으로 보는 흐름</h2>
        {/* <p className="mt-3 text-neutral-600">텍스트만이 아니라, 구현된 UI로 서비스의 구조를 보여줍니다.</p> */}

        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
          {shots.map((s) => (
            <div key={s.title} className="rounded-3xl border bg-neutral-50 shadow-sm overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.src}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
