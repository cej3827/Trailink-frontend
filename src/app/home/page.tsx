import { redirect } from 'next/navigation'
import { checkAuth } from '@/lib/cookies'
import HomePageClient from './HomePageClient'

export default async function HomePage() {
  const hasToken = await checkAuth()

  // 로그인되지 않은 사용자는 랜딩 페이지로 리다이렉트
  if (!hasToken) {
    redirect('/')
  }

  return <HomePageClient />
}