// 상세 이벤트 조회 Response interface
export interface IEventResponse<T> {
  data: T;
}

export interface IEvent {
  id?: string;
  thumbnailUrl?: string;
  name?: string;
  nickname?: string;
  city?: string;
  district?: string;
  description?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string; // 진행중/마감
  isOwner?: boolean;
  isParticipant?: boolean;
  participants?: IParticipants[];
}

export interface IEventJoinProps {
  isOwner?: boolean;
  isParticipant?: boolean;
}

export interface IParticipants {
  nickname: string;
  profileImgUrl: string;
  sellerId: string;
}

export interface IEventTitle {
  title: string;
  center?: boolean;
}
