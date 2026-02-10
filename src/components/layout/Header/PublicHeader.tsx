import Link from 'next/link'

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-neutral-100/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <span className="text-2xl" aria-hidden="true">🔗</span>
              <span className="sr-only">Trailink 홈</span>
            </div>
            <span className="text-2xl font-semibold tracking-[-0.02em] text-primary">
              Trailink
            </span>
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-secondary px-3.5 py-2 text-xs font-semibold text-secondary hover:bg-white transition-colors"
            >
              로그인
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
  
