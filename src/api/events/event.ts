import { IEvent } from '@/types/IEvent';
import { apiInstance } from '@/api/axios';
import { IEventResponse } from '@/types/IEvent';

// * GET 등록된 상세 이벤트 조회
export const fetchEvent = async (
  eventId: string,
): Promise<IEventResponse<IEvent>> => {
  const response = await apiInstance.get(`/events/${eventId}`);
  return response.data as IEventResponse<IEvent>;
};
