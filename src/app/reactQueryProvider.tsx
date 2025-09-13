// // src/providers/QueryProvider.tsx
// 'use client'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { useState } from 'react'

// export function QueryProvider({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 60 * 1000, // 1분
//         retry: (failureCount, error: any) => {
//           // 인증 에러는 재시도하지 않음
//           if (error?.status === 401 || error?.status === 403) {
//             return false
//           }
//           return failureCount < 3
//         },
//       },
//     },
//   }))

//   return (
//     <QueryClientProvider client={queryClient}>
//       {children}
//       {process.env.NODE_ENV === 'development' && (
//         <ReactQueryDevtools initialIsOpen={false} />
//       )}
//     </QueryClientProvider>
//   )
// }


'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

