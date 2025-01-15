// Bookmark 인터페이스
interface Bookmark {
  bookmark_id: number;
  bookmark_title: string;
  bookmark_url: string;
  bookmark_description: string;
}

// BookmarkList 컴포넌트에 전달될 props의 타입을 정의
interface BookmarkListProps {
  bookmarks: Bookmark[]; //여러 개의 북마크를 받을 것
}

// BookmarkList 컴포넌트
// 전달된 북마크 목록을 화면에 렌더링하는 컴포넌트
const BookmarkList = ({ bookmarks }: BookmarkListProps) => {
  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.bookmark_id} className="bookmark-item">
          <h3>{bookmark.bookmark_title}</h3>
          <p>{bookmark.bookmark_description}</p>
          <a href={bookmark.bookmark_url} target="_blank" rel="noopener noreferrer">
            Visit
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;
