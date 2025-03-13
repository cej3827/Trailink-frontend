import { Suspense } from 'react';
import UserProfile from '@/src/components/profile/UserProfile';
import LoadingSpinner from '@/src/components/common/LoadingSpinner';

// params 객체를 Promise 타입으로 처리
export default async function ProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Promise를 기다려 실제 값을 받음
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserProfile id={resolvedParams.id} />
    </Suspense>
  );
}
