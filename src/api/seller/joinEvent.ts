import { apiInstance } from '@/api/axios';
import { SELLER_ACCESS_TOKEN } from '@/data/test';

// * POST 셀러의 이벤트 참여
export const postEvent = async (eventId: string) => {
  const response = await apiInstance.post(`/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${SELLER_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};
