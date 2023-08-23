import { IEventsResponse } from '@/types/IEvents';
import { apiInstance } from '@/api/axios';
import { IEvents } from '@/types/IEvents';

// * GET 등록된 모든 이벤트 목록 조회
export const fetchEvents = async (): Promise<IEventsResponse<IEvents[]>> => {
  const response = await apiInstance.get('/events');
  return response.data as IEventsResponse<IEvents[]>;
};
