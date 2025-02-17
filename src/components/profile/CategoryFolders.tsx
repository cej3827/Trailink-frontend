import { ReactElement, useEffect} from 'react';
import Link from 'next/link';
import { useCategoryStore } from '@/src/store/useCategoryStore';

interface CategoryFoldersProps {
  userId: string;
}

function CategoryFolders({ userId }: CategoryFoldersProps): ReactElement {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories(userId);
  }, [userId, fetchCategories]);

//   // 현재 유저의 카테고리를 필터링
//   const userCategories = categories.filter(
//     (category) => 
//       category.userId === userId
//   );

  return (
    <div className="category-folders">
      <h2>Bookmarks</h2>
      <div className="folder-grid">
        {categories.map((category) => (
          <Link
            href={`/category/${category.category_id}?userId=${userId}`}
            key={category.category_id}
            className="folder-item"
          >
            <div className="folder-icon">📁</div>
            <div className="folder-name">{category.category_name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryFolders;
