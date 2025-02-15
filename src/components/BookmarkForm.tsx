import { useForm, Controller } from 'react-hook-form';
import { useCategoryStore } from '../store/useCategoryStore'
import { addBookmark } from '../api/bookmarkAPI'

interface BookmarkFormData {
    category_id: number;
    bookmark_title: string;
    bookmark_url: string;
    bookmark_description: string;
}

function BookmarkForm() {
    const { categories } = useCategoryStore();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<BookmarkFormData>();

    const onSubmit = async (data: BookmarkFormData) => {
        try {
          const result = await addBookmark(data);
          alert('북마크가 성공적으로 추가되었습니다!');
          console.log(result);
          reset(); // 폼 초기화
        } catch (error) {
          alert('북마크 추가에 실패했습니다.');
        }
    };

return (
    <form onSubmit={handleSubmit(onSubmit)} className="bookmark-form">
        <div>
            <Controller
                name="bookmark_title"
                control={control}
                rules={{ required: "제목은 필수입니다." }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="text"
                        placeholder="Title"
                    />
                )}
            />
            {errors.bookmark_title && <p>{errors.bookmark_title.message}</p>}
        </div>
        <div>
            <Controller
                name="bookmark_url"
                control={control}
                rules={{ required: "URL은 필수입니다." }}
                render={({ field }) => (
                    <input 
                        {...field}
                        type="url"
                        placeholder="URL"
                    />
                )}
            />
            {errors.bookmark_url && <p>{errors.bookmark_url.message}</p>}
        </div>
        <div>
            <Controller
                name="bookmark_description"
                control={control}
                render={({ field }) => (
                    <textarea 
                        {...field}
                        placeholder="Description"
                    />
                )}
            />
        </div>
        <div>
            <Controller
                name="category_id"
                control={control}
                rules={{ required: "카테고리 선택은 필수입니다." }}
                render={({ field }) => (
                    <select {...field}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                        ))}
                    </select>
                )}
            />
            {errors.category_id && <p>{errors.category_id.message}</p>}
        </div>
        <button type="submit">Add Bookmark</button>
    </form>
    )
}

export default BookmarkForm;