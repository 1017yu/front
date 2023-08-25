import { apiInstance } from '@/api/axios';

// * DELETE 셀러의 이벤트 참여 취소
export const cancelEvent = async (eventId: string) => {
  const getUser = localStorage.getItem('user');
  const accessToken = JSON.parse(getUser as string).accessToken;
  const response = await apiInstance.delete(`/events/join/${eventId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
