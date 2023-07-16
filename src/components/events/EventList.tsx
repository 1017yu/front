import IEvents from '@/types/IEvents';
import Container from '@/components/ui/Container';

function EventList() {
  const dummyEventsData: IEvents[] = [
    {
      id: 1,
      name: '팝업 스토어',
      location: '서울 강남구 서초동',
      thumbnail_url: 'https://storage.googleapis.com/1',
      status: '진행중',
      category: '레저/스포츠',
      bookmark: true,
    },
    {
      id: 2,
      name: '팝업 스토어',
      location: '서울 강남구 대치동',
      thumbnail_url: 'https://storage.googleapis.com/2',
      category: '레저/스포츠',
      status: '진행중',
      bookmark: true,
    },
    {
      id: 3,
      name: '팝업 스토어',
      location: '서울 강남구 신사동',
      thumbnail_url: 'https://storage.googleapis.com/3',
      category: '레저/스포츠',
      status: '진행중',
      bookmark: false,
    },
  ];
  return <Container>{dummyEventsData.map((event) => event.name)}</Container>;
}

export default EventList;
