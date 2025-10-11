// 로그인된 사용자 홈

import HomeClient from "@/components/Home/Home";
import { checkAuth } from "@/lib/cookies";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isAuthenticated = await checkAuth()
  
  // 인증된 사용자인지 확인
  if (isAuthenticated) {
    return <HomeClient />;
  }

  if (!isAuthenticated) {
    redirect('/')
  }
}