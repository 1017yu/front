import { apiInstance } from '@/api/axios';
import IResponse from '@/types/IResponse';
import { ISurveyRequest, ISurveyResponse } from '@/types/ISurvey';

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

// * 수요조사 결과 목록 조회
export const fetchSurveyResults = async () => {
  const response = await apiInstance.get('/survey/result');
  return response.data;
};

// * 수요조사 상세 조회
export const getSurveyResultDetail = async (surveyId: number) => {
  const response = await apiInstance.get(`/survey/result/${surveyId}`);
  return response.data;
};
