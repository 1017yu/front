// 모든 이벤트 조회 응답 데이터 타입
export interface IEventResponse<T> {
  data: {
    content: T;
    totalElements: number;
    totalPages: number;
  };
  statusCode: number;
}

// 조회된 이벤트 내용
export interface IEvents {
  id: number;
  name: string;
  location: string;
  thumbnailUrl?: string;
  status: string;
  category?: string;
  bookmark: boolean;
}

//
export interface IEventsPagination {
  (event: React.ChangeEvent<unknown>, value: number): void;
}
