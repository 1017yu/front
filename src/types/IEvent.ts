// 상세 이벤트 조회 Response interface
export interface IEventResponse<T> {
  data: T;
}

export interface IEvent {
  id?: string;
  thumbnailUrl?: string;
  name?: string;
  hostName?: string;
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
}

export interface IEventJoinProps {
  isOwner?: boolean;
  isParticipant?: boolean;
}
