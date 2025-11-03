import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage/LandingPage";
import { checkAuth } from "@/lib/cookies";

export default async function HomePage() {
  const hasToken = await checkAuth()

  // 쿠키에 토큰이 있으면 홈으로 리다이렉트
  if (hasToken) {
    redirect('/home')
  }

  return <LandingPage />
}