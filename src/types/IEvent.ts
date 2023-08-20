export interface IEvent {
  id?: number;
  thumbnailUrl?: string;
  name?: string;
  hostName?: string;
  location?: string;
  description?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string; // 진행중/마감
}

export const dummyEventData: IEvent = {
  id: 1,
  thumbnailUrl: 'https://storage.googleapis.com/2',
  name: '팝업 스토어',
  hostName: '유희태', // 개인판매자 이름
  location: '서울 강남구 서초동',
  description: '가나다라마바사',
  category: '레저/스포츠',
  startDate: '2021-10-29T07:20:02.749Z',
  endDate: '2021-10-29T07:20:02.749Z',
  createdAt: '2021-10-29T07:20:02.749Z',
  updatedAt: '2021-10-29T07:20:02.749Z',
  status: '진행중', // 진행중/마감
};
