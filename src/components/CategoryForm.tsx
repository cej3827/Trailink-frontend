import { useForm, Controller } from 'react-hook-form';
import { useCategoryStore } from '../store/useCategoryStore'
// import { addCategory } from '../api/categoryAPI';

interface CategoryFormData {
    category_id: number;
    category_name: string;
    category_description: string;
}
function CategoryForm() {
    const { addCategory } = useCategoryStore();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>();

    const onSubmit = async (data: CategoryFormData) => {
        try {
            const result = await addCategory(data);
            alert('카테고리가 성공적으로 추가되었습니다!');
            console.log(result);
            reset(); // 폼 초기화
        } catch (error) {
            alert('카테고리 추가에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bookmark-form">
            <div>
                <Controller
                    name="category_name"
                    control={control}
                    rules={{ required: "카테고리 이름을 입력해 주세요."}}
                    render={({ field }) => (
                        <input
                            {...field}
                            type='text'
                            placeholder='Category Name'
                        />
                    )}
                />
                {errors.category_name && <p>{errors.category_name.message}</p>}
            </div>
            <div>
                <Controller
                    name="category_description"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            placeholder='Description'
                        />
                    )}
                />
            </div>
            <button type="submit">Add Category</button>
        </form>
    )
}

export default CategoryForm;