import { apiInstance } from '@/api/axios';

// * DELETE 셀러의 이벤트 참여 취소
export const cancelEvent = async (eventId: string, accessToken: string) => {
  const response = await apiInstance.delete(`/events/join/${eventId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
