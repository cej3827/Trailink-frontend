import { Suspense } from 'react';
import UserProfile from '@/src/components/profile/UserProfile';
import LoadingSpinner from '@/src/components/common/LoadingSpinner';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserProfile id={params.id} />
    </Suspense>
  );
}
