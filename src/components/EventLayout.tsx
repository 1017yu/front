import IEvents from '@/types/IEvents';
import { Link } from 'react-router-dom';

function EventLayout({ ...props }: IEvents) {
  return (
    <Link to={`/events/${props.id}`}>
      <div className="w-3/8 mb-8 flex flex-col justify-center">
        <img
          src={props.thumbnail_url ? 'http://via.placeholder.com/360x240' : ''}
          alt="thumbnail"
        />
        <div className="w-3/8 flex h-60 flex-col gap-2 border border-solid border-black p-4">
          <div className="text-subTextAndBorder">{props.category}</div>
          <div className="text-4xl">{props.name}</div>
          <div className="text-2xl">{props.location}</div>
        </div>
      </div>
    </Link>
  );
}

export default EventLayout;
