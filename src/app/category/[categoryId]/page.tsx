// // 공개 카테고리 페이지

// import { API_BASE_URL } from "@/api";
// import { notFound } from "next/navigation";
// // import PublicCategoryClient from '@/components/PublicCategoryClient/PublicCategoryClient'

// async function getCategoryBookmarks(categoryId: number) {
//     try { 
//         const response = await fetch(`${API_BASE_URL}/bookmarks/category/${categoryId}`, {
//             cache: 'no-store'
//         })

//         if (!response.ok) return []
//         return response.json()
//     } catch {
//         return []
//     }
// }

// interface PageProps {
//   params: Promise<{
//     categoryId: string; // 주의: URL 파라미터는 항상 string입니다
//   }>;
// }

// export default async function PublicCategoryPage({ params }: PageProps) {
//     // const category = await getCategoryBookmarks(params.categoryId)

//     // if (!category) {
//     //     notFound()
//     // }

//     return (
//         // <PublicCategoryClient 
//         // initialBookmarks={bookmarks}
//         // />
//         <></>
//     )
// }

// // 메타데이터 생성
// export async function generateMetadata({ params }: PageProps) {
// //   const category = await getCategoryBookmarks(params.categoryId)
  
// //   if (!category) {
// //     return {
// //       title: '카테고리를 찾을 수 없습니다'
// //     }
// //   }
  
//   return {
//     // title: `${category.name} - 북마크 모음`,
//     // description: category.description || `${category.name} 카테고리의 북마크 모음입니다.`,
    
//   }
// }

export default function BookmarkDetailPage() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      color: '#666' 
    }}>
      🚧 This page is under construction 🚧
    </div>
  );
}