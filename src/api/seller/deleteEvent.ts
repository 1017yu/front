import { apiInstance } from '@/api/axios';

// * DELETE 셀러의 등록된 이벤트 삭제
export const deleteEvent = async (eventId: string) => {
  const getUser = localStorage.getItem('user');
  const accessToken = JSON.parse(getUser as string).accessToken;
  const response = await apiInstance.delete(`/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
