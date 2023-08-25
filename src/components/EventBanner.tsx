import event_bg from '@/assets/event_bg.jpg';

export default function EventBanner() {
  return (
    <div className="bg-black">
      <img
        src={event_bg}
        alt="event_banner"
        className="mx-auto h-96 object-cover md:w-full"
      />
    </div>
  );
}
