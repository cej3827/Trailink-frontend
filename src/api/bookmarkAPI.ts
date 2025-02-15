const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AddBookmarkPayload {
    category_id: number | null;
    bookmark_title: string;
    bookmark_url: string;
    bookmark_description: string | null;
}

export const addBookmark = async (payload: AddBookmarkPayload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`failed to add bookmark: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('add bookmark error:', error);
        throw error;
    }
};