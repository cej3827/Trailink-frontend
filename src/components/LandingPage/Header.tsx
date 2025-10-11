export default function Header() {
  return (
    <header className="bg-white border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="group cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                <span className="text-white font-bold text-2xl">🔗</span>
              </div>
              <h1 className="text-3xl font-semibold text-slate-800 group-hover:tracking-wider transition-all duration-300">
                Trailink
              </h1>
            </div>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              소개
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              문의
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
