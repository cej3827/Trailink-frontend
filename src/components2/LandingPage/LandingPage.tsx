'use client'

import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import LoginForm from '../auth/LoginForm/LoginForm'

export default function LandingPage() {
  const [showLoginForm, setShowLoginForm] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        {/* 메인 콘텐츠 */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            showLoginForm ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center space-y-8 px-4">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                환영합니다! 👋
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                **시작해보세요**
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setShowLoginForm(true)}
                  className="w-full max-w-sm bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                >
                  로그인
                </button>
                
                <button 
                  onClick={() => window.location.href = '/signup'}
                  className="w-full max-w-sm bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 border-2 border-blue-600 shadow-lg"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 로그인 폼 */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            showLoginForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <LoginForm onClose={() => setShowLoginForm(false)} />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
