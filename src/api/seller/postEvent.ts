import { apiInstance } from '@/api/axios';
import { TEventForm } from '@/types/TEventForm';

// * POST 셀러의 이벤트 등록
export const postEvent = async (postEventData: TEventForm) => {
  const getUser = localStorage.getItem('user');
  const accessToken = getUser ? JSON.parse(getUser).accessToken : null;

  if (accessToken) {
    const response = await apiInstance.post('/events', postEventData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
};
