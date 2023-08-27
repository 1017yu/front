import { apiInstance } from '@/api/axios';
import { TEventForm } from '@/types/TEventForm';

// * PUT 셀러의 이벤트 수정
export const modifyEvent = async (
  eventValue: TEventForm,
  accessToken: string,
) => {
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
};
