'use client'

import Link from 'next/link'

type Props = {
  scrolled?: boolean
  onLoginClick?: () => void
}

export default function Header({ scrolled = false, onLoginClick }: Props) {
  return (
    <header
      className={[
        'sticky top-0 z-50 border-b border-neutral-200',
        scrolled
          ? 'bg-neutral-100/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/80 shadow-sm'
          : 'bg-neutral-100',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={[
            'flex justify-between items-center transition-all duration-300',
            scrolled ? 'h-16' : 'h-20',
          ].join(' ')}
        >
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
          >
            <div className="w-8 h-8 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
              <span className="text-2xl" aria-hidden="true">
                🔗
              </span>
              <span className="sr-only">Trailink 홈</span>
            </div>
            <span className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-primary">Trailink</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#features"
              className="text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
            >
              기능
            </a>
            <a
              href="#how"
              className="text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
            >
              사용 방법
            </a>
            <a
              href="#faq"
              className="text-primary hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onLoginClick}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition"
            >
              로그인
            </button>
            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold border border-secondary text-secondary hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.99] transition"
            >
              회원가입
            </Link>
          </div>
        </div>

        <nav className="sm:hidden pb-3">
          <div className="flex gap-2 overflow-x-auto">
            <a
              href="#features"
              className="whitespace-nowrap rounded-full border bg-neutral-50 px-3 py-1 text-xs text-primary"
            >
              기능
            </a>
            <a
              href="#how"
              className="whitespace-nowrap rounded-full border bg-neutral-50 px-3 py-1 text-xs text-primary"
            >
              사용 방법
            </a>
            <a
              href="#faq"
              className="whitespace-nowrap rounded-full border bg-neutral-50 px-3 py-1 text-xs text-primary"
            >
              FAQ
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
