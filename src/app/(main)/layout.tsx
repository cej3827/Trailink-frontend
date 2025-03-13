'use client';

import Header from '@/src/components/Header';
import Sidebar from '@/src/components/Sidebar';
import { useUserStore } from '@/src/store/useUserStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/src/components/common/LoadingSpinner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
