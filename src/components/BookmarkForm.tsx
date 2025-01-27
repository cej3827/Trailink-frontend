import { useState } from 'react'
import { useCategoryStore } from '../store/useCategoryStore'
import { addBookmark } from '../api/bookmarkAPI'

function BookmarkForm() {
    const [form, setForm] = useState({
        category_id: null,
        bookmark_title: '',
        bookmark_url: '',
        bookmark_description: null,
    })

    const { categories } = useCategoryStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await addBookmark(form);
            alert('Bookmark added successfully!');
            console.log(result);
        } catch (error) {
            alert('falied to add bookmark.')
        }
    };

    return (
    <form onSubmit={handleSubmit} className="bookmark-form">
        <div>
            <input
                type="text"
                name="bookmark_title"
                placeholder="Title"
                value={form.bookmark_title}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <input 
                type="url"
                name="bookmark_url"
                placeholder="URL"
                value={form.bookmark_url}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <textarea 
                name="bookmark_description"
                placeholder="Description"
                value={form.bookmark_description ?? ''}
                onChange={handleChange}
            />
        </div>
        <div>
            <select 
                name="category_id"
                value={form.category_id ?? ''}
                onChange={handleChange}
                required
            >
                <option value="">Select Category</option>
                {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                </option>
                ))}
            </select>
        </div>
        <button type="submit">Add Bookmark</button>
    </form>
    )
}

export default BookmarkForm;