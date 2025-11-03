'use client'

import Header from './Header'
import Footer from './Footer'
import LoginForm from '../auth/LoginForm/LoginForm'
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore'

export default function LandingPage() {
  const { showLoginForm, setShowLoginForm } = useUIStore();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        <div 
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            showLoginForm ? '-translate-x-full' : 'translate-x-0'
          }`}>
          <div className="h-full flex items-center justify-center sm:overflow-hidden overflow-y-auto">
            <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4 py-8 sm:py-6 lg:py-0">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-2 sm:mb-3 lg:mb-4 leading-tight p-4 sm:p-6 md:p-8 lg:p-10">
                <span className="block font-medium">쌓아두지 말고</span>
                <span className="block mt-2 sm:mt-3 lg:mt-4 text-accent text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                  정리하고 • 공유하고 • 탐색하세요
                </span>
              </h1>
              <p className="text-xl text-secondary mb-8">
                지금 바로 시작해 보세요.
              </p>
              
              <div className="flex flex-col space-y-4 items-center">
                <div className="space-y-4 w-full max-w-xs">
                  <button
                    onClick={() => setShowLoginForm(true)}
                    className="w-full bg-primary text-white py-3 px-6 font-semibold hover:bg-primary-hover transition-colors duration-200"
                  >
                    로그인
                  </button>
                  
                  <button 
                    onClick={() => router.push('/signup')}
                    className="w-full bg-white text-secondary py-3 px-6 font-semibold hover:bg-neutral-50 transition-colors duration-200 border-2 border-secondary"
                  >
                    회원가입
                  </button>
                </div>
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
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
