'use client'; // 클라이언트 사이드에서 렌더링됨

import React, { useEffect, useState } from 'react'; //리엑트 훅 가져오기
import { useParams, useRouter } from 'next/navigation'; // 라우팅 관련 훅
import { useCategoryStore } from '../../../../store/useCategoryStore'; //zustand를 사용하는 카테고리 스토어
import BookmarkList from '../../../../components/BookmarkList'; //북마크 목록을 렌더링하는 컴포넌트
import LoadingSpinner from '../../../../components/common/LoadingSpinner';

export default function CategoryPage() {
  const { id } = useParams(); // URL 파라미터에서 id를 추출
  const categoryId = Number(id); // 문자열 id를 숫자로 변환
  const router = useRouter(); //라우터 객체
  const { fetchCategoryBookmark, categoryBookmarks} = useCategoryStore();//스토어에서 액션과 상태를 가져옴
  const [loading, setLoading] = useState(true); //로딩 관리 state

  //현재 카테고리를 상태에서 검색
  const category = categoryBookmarks.find((c) => c.category_id === categoryId); 

  //컴포넌트가 렌더링되거나 categoryID가 변경될 때 호출
  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        setLoading(true);
        const result = await fetchCategoryBookmark(categoryId); //해당 카테고리의 북마크 데이터를 가져옴
        if (!result) {
          console.error("No category data found");
        }
        setLoading(false); 
      }
    };
    fetchData(); //데이터를 비동기로 가져오는 함수 실행
  }, [categoryId, fetchCategoryBookmark]);

  //뒤로가기 버튼 클릭시 호출되는 함수
  const handleGoBack = () => {
    router.back(); //이전 페이지로 이동
  };

  //로딩 중일 경우
  if (loading) {
    return <LoadingSpinner />;
  }

  //카테고리가 존재하지 않을 경우
  if (!category) {
    return <div>Category not found.</div>;
  }

  //카테고리가 존재하면 해당 정보 렌더링
  return (
    <div className="category-page">
      <button onClick={handleGoBack} className="back-button">← Back</button>
      <h1>{category.category_name || 'Category'}</h1>
      <div className="bookmark-list-section">
        <BookmarkList bookmarks={category.bookmarks} />
      </div>
    </div>
  );
}
