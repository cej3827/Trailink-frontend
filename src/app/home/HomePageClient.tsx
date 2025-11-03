// 로그인된 사용자 홈
'use client'

import RecentBookmarks from '@/components/bookmark/RecentBookmarks/RecentBookmarks'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout/AuthenticatedLayout'

export default function HomePageClient() {
  return (
    <AuthenticatedLayout>
      <div>
        <RecentBookmarks />
      </div>
    </AuthenticatedLayout>
  )
}

