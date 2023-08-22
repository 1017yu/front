import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvents } from '@/types/IEvents';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

function EventLayout({ ...props }: IEvents) {
  const [bookmarked, setBookmarked] = useState<boolean>(false); // 북마크 state

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBookmarked((prev) => !prev); // 추후 수정(API 연동 후, 클릭 시 Bookmark POST)
  };

  return (
    <Link to={`/events/${props.id}`} className="mb-8 w-auto">
      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 hover:shadow-lg">
        <img
          className=" h-48 w-full object-cover object-center md:ml-0 md:h-36 lg:h-48"
          src={
            props.thumbnailUrl
              ? 'http://via.placeholder.com/640x400'
              : 'http://via.placeholder.com/640x400'
          }
          alt="Thumbnail"
        />
        <button
          className="absolute right-3 top-3 text-2xl hover:scale-150 hover:transform hover:shadow-2xl"
          onClick={handleClick}
        >
          {bookmarked ? (
            <BsBookmarkFill color="rgb(0 201 167)" />
          ) : (
            <BsBookmark />
          )}
        </button>

        <div className="p-6">
          <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400">
            {props.category}
          </h2>
          <h1 className="title-font mb-3 text-lg font-medium text-gray-900">
            {props.name}
          </h1>
          <p className="mb-3 leading-relaxed">{props.location}</p>
        </div>
      </div>
    </Link>
  );
}

export default EventLayout;
