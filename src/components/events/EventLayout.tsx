import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvents } from '@/types/IEvents';
import { BsBookmarkFill } from 'react-icons/bs';
import { IBookmark } from '@/types/IBookmark';
import default_thumbnail from '@/assets/default_thumbnail.jpg';

function EventLayout({ ...props }: IEvents) {
  // 북마크 state
  const [bookmark, setBookmark] = useState<boolean>(props.bookmark);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBookmark((prev) => !prev); // 추후 수정(API 연동 후, 클릭 시 Bookmark POST)

    // LocalStorage에서 bookmark 목록 get
    const getBookmark = localStorage.getItem('bookmark');
    let bookmarkEvents: IBookmark[] = [];

    // 로컬 북마크 데이터 선언
    const localBookmarkData = {
      id: props.id,
      bookmark: !bookmark,
    };

    // 기존 찜 목록을 배열로 담음
    if (getBookmark) {
      bookmarkEvents = JSON.parse(getBookmark);
    }

    // 이미 찜한 상품인 경우, 삭제(filter)
    if (bookmark) {
      const updatedLikes = bookmarkEvents.filter(
        (value) => value.id !== props.id,
      );
      localStorage.setItem(`bookmark`, JSON.stringify(updatedLikes));

      // 찜하지 않은 상품인 경우, 추가(push)
    } else {
      bookmarkEvents.push(localBookmarkData);
      localStorage.setItem(`bookmark`, JSON.stringify(bookmarkEvents));
    }
  };

  return (
    <Link to={`/events/${props.id}`}>
      <div className="h-[348px] relative mb-8 sm:mb-16 overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 drop-shadow-md transition hover:shadow-lg">
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
          className="absolute right-3 top-3 text-2xl transition hover:scale-125 hover:transform hover:shadow-2xl"
          onClick={handleClick}
        >
          {bookmark ? (
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
