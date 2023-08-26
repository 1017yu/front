import { apiInstance } from '@/api/axios';
import { TEventForm } from '@/types/TEventForm';

// * PUT 셀러의 이벤트 수정
export const modifyEvent = async (eventValue: TEventForm) => {
  const getUser = localStorage.getItem('user');
  const accessToken = getUser ? JSON.parse(getUser).accessToken : null;

  if (accessToken) {
    const response = await apiInstance.put(
      `/events/${eventValue.id}`,
      eventValue,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }
};
