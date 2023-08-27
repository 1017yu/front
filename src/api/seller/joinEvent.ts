import { apiInstance } from '@/api/axios';

// * POST 셀러의 이벤트 참여
export const joinEvent = async (eventId: string, accessToken: string) => {
  const response = await apiInstance.post(`/events/join/${eventId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
