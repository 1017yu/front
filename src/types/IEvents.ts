// 모든 이벤트 조회 응답 데이터 타입
export interface IEventsResponse<T> {
  data: {
    content: T;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
  };
  statusCode: number;
}

// 조회된 이벤트 내용
export interface IEvents {
  id: number;
  name: string;
  city: string;
  district: string;
  thumbnailUrl?: string;
  status: string;
  category: string;
  bookmark: boolean;
}
