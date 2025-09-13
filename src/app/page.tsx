import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LandingPage from "@/components2/LandingPage/LandingPage";

async function checkAuth() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('auth-token')?.value
  return !!token
}

export default async function HomePage() {
  const isAuthenticated = await checkAuth()

  // 이미 로그인 된 경우 홈으로 리다이렉트
  if (isAuthenticated) {
    redirect('/home')
  }

  return <LandingPage />
}