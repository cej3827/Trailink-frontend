export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            © 2025 Choi. All rights reserved.
          </div>
          
          <div className="flex space-x-3">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              개인정보처리방침
            </a>
            <a className="text-gray-600">|</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              이용약관
            </a>
            <a className="text-gray-600">|</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              설정
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
