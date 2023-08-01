import { RecoilRoot } from 'recoil';
import EventList from '@/components/events/EventList';
import EventSearchBar from '@/components/events/EventSearchBar';

export default function Events() {
  return (
    <RecoilRoot>
      <EventSearchBar />
      <EventList />
    </RecoilRoot>
  );
}
