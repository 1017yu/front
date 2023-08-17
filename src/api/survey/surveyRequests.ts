import { apiInstance } from '@/api/axios';
import IResponse from '@/types/IResponse';
import ISurveyResponse from '@/types/ISurveyResponse';

// * 진행중인 수요조사 조회
export const fetchActiveSurvey = async (): Promise<
  IResponse<ISurveyResponse>
> => {
  const response = await apiInstance.get(`/survey/active`, {
    headers: {
      Authorization: null,
    },
  });
  return response.data;
};
