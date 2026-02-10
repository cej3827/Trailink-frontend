export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
          <div className="text-secondary text-sm">
            © 2025 Choi. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a href="#" className="text-secondary hover:text-accent transition-colors">
              개인정보처리방침
            </a>
            <span className="text-secondary hidden sm:inline">|</span>
            <a href="#" className="text-secondary hover:text-accent transition-colors">
              이용약관
            </a>
            <span className="text-secondary hidden sm:inline">|</span>
            <a href="#" className="text-secondary hover:text-accent transition-colors">
              설정
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
