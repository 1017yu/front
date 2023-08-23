import { apiInstance } from '@/api/axios';
import { SELLER_ACCESS_TOKEN } from '@/data/test';
import { TPostEventType } from '@/types/TPostEventType';

// * POST 셀러의 이벤트 등록
export const postEvent = async (postEventData: TPostEventType) => {
  const response = await apiInstance.post('/events', postEventData, {
    headers: {
      Authorization: `Bearer ${SELLER_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};
