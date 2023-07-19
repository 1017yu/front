import { IEvents } from '@/types/IEvents';
import { Link } from 'react-router-dom';

function EventLayout({ ...props }: IEvents) {
  return (
    <Link to={`/events/${props.id}`} className="mb-8 w-auto">
      <div className="overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
        <img
          className=" h-48 w-full object-cover object-center md:ml-0 md:h-36 lg:h-48"
          src={props.thumbnail_url ? 'http://via.placeholder.com/640x400' : ''}
          alt="Thumbnail"
        />
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
