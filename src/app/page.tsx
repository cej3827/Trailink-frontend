import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage/LandingPage";
import { checkAuth } from "@/lib/cookies";

export default async function HomePage() {
  const isAuthenticated = await checkAuth()

  // 이미 로그인 된 경우 홈으로 리다이렉트
  if (isAuthenticated) {
    redirect('/home')
  }

  return <LandingPage />
}