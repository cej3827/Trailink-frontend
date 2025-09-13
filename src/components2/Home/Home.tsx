'use client'

import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { QUERY_KEYS } from "@/lib/constants"
import AuthenticatedLayout from "../layout/AuthenticatedLayout/AuthenticatedLayout"
// import RecentBookmarks from '@/components/bookmark/RecentBookmarks/RecentBookmarks'
import { User } from '@/types'

interface HomeProps {
    initialUser: User
}

export default function HomeClient({ initialUser }: HomeProps) {
    const queryClient = useQueryClient()
 
    useEffect(() => {
        queryClient.setQueryData(QUERY_KEYS.USER, initialUser)
    }, [initialUser, queryClient])

    return (
        <AuthenticatedLayout>
            <div className="container">
                {/* <RecentBookmarks /> */}
            </div>
        </AuthenticatedLayout>
    )
}