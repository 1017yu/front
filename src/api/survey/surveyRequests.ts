import { apiInstance } from '@/api/axios';
import IResponse from '@/types/IResponse';
import { ISurveyRequest, ISurveyResponse } from '@/types/ISurvey';

// TODO : 토큰 수정 필요
// * 진행중인 수요조사 조회
export const fetchActiveSurvey = async (): Promise<
  IResponse<ISurveyResponse>
> => {
  const response = await apiInstance.get(`/survey/active`);
  return response.data;
};

// * 수요조사 답변 제출
export const submitSurvey = async (params: ISurveyRequest) => {
  const response = await apiInstance.post('/survey', params);
  return response.data;
};
