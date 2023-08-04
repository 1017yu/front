import { IEventResponse } from '@/types/IEvents';
import { apiInstance } from '@/api/axios';
import { IEvents } from '@/types/IEvents';

// * 등록된 모든 이벤트 목록 조회
export const fetchEvents = async (): Promise<IEventResponse<IEvents[]>> => {
  const response = await apiInstance.get('/events');
  return response.data as IEventResponse<IEvents[]>;
};
