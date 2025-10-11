'use client'

import RecentBookmarks from '@/components/bookmark/RecentBookmarks/RecentBookmarks'
import AuthenticatedLayout from '../layout/AuthenticatedLayout/AuthenticatedLayout'

export default function HomeClient() {
    return (
        <AuthenticatedLayout>
            <div>
                <RecentBookmarks />
            </div>
        </AuthenticatedLayout>
    )
}