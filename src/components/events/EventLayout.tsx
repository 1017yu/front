import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvents } from '@/types/IEvents';
import { BsBookmarkFill } from 'react-icons/bs';
import { IBookmarked } from '@/types/IBookmarked';
import default_thumbnail from '@/assets/default_thumbnail.jpg';

function EventLayout({ ...props }: IEvents) {
  // 북마크 state
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBookmarked((prev) => !prev); // 추후 수정(API 연동 후, 클릭 시 Bookmark POST)
    // bookmarkApi(props.id, !bookmarked);

    // LocalStorage에서 bookmarked 목록 get
    const getBookmarked = localStorage.getItem('bookmarked');
    let bookmarkedEvents: IBookmarked[] = [];

    // 로컬 북마크 데이터 선언
    const localBookmarkData = {
      id: props.id,
      bookmarked: !bookmarked,
    };

    // 기존 찜 목록을 배열로 담음
    if (getBookmarked) {
      bookmarkedEvents = JSON.parse(getBookmarked);
    }

    // 이미 찜한 상품인 경우, 삭제(filter)
    if (bookmarked) {
      const updatedLikes = bookmarkedEvents.filter(
        (value) => value.id !== props.id,
      );
      localStorage.setItem(`bookmarked`, JSON.stringify(updatedLikes));

      // 찜하지 않은 상품인 경우, 추가(push)
    } else {
      bookmarkedEvents.push(localBookmarkData);
      localStorage.setItem(`bookmarked`, JSON.stringify(bookmarkedEvents));
    }
  };

  return (
    <Link to={`/events/${props.id}`} className="mb-8 w-auto">
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 hover:shadow-lg">
        <img
          className="h-48 w-[300px] object-cover object-center md:ml-0 md:h-36 lg:h-48"
          src={
            props.thumbnailUrl === ''
              ? default_thumbnail
              : `${props.thumbnailUrl}`
          }
          alt="Thumbnail"
        />
        <button
          className="absolute right-3 top-3 text-2xl transition-all hover:scale-125 hover:transform hover:shadow-2xl"
          onClick={handleClick}
        >
          {bookmarked ? (
            <BsBookmarkFill color="rgb(0 201 167)" />
          ) : (
            <BsBookmarkFill color="white" />
          )}
        </button>

        <div className="p-6">
          <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400">
            {props.category}
          </h2>
          <h1 className="title-font mb-3 text-lg font-medium text-gray-900">
            {props.name}
          </h1>
          <p className="mb-3 leading-relaxed">
            {props.city} {props.district}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default EventLayout;
