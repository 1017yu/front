import { apiInstance } from '@/api/axios';
import IAdminSurveyRequest from '@/types/IAdminSurveyRequest';
import IResponse from '@/types/IResponse';
import IAdminSurvey from '@/types/IAdminSurvey';

// * 수요조사 등록
export const insertAdminSurvey = async (survey: IAdminSurveyRequest) => {
  const response = await apiInstance.post('/admin/survey', survey);
  return response.data;
};

// * 수요조사 목록 조회
export const fetchAdminSurvey = async (): Promise<
  IResponse<IAdminSurvey[]>
> => {
  const response = await apiInstance.get('/admin/survey');
  return response.data as IResponse<IAdminSurvey[]>;
};

// * 수요조사 삭제
export const deleteAdminSurvey = async (surveyId: number) => {
  const response = await apiInstance.delete(`/admin/survey/${surveyId}`);
  return response.data;
};
