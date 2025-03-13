'use client';

import LoginForm from "@/src/components/LoginForm";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/src/components/common/LoadingSpinner';

export default function LoginPage() {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  if (loading) return <LoadingSpinner />;

  return <LoginForm />;
}
