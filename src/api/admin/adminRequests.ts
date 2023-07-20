import { apiInstance } from '@/api/axios';
import IAdminSurveyRequest from '@/types/IAdminSurveyRequest';
import IResponse from '@/types/IResponse';
import IAdminSurvey from '@/types/IAdminSurvey';

export const insertAdminSurvey = async (survey: IAdminSurveyRequest) => {
  const response = await apiInstance.post('/admin/survey', survey);
  return response.data;
};

export const fetchAdminSurvey = async (): Promise<
  IResponse<IAdminSurvey[]>
> => {
  const response = await apiInstance.get('/admin/survey');
  return response.data as IResponse<IAdminSurvey[]>;
};
