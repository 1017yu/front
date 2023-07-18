import { apiInstance } from '@/api/axios';
import IAdminSurveyRequest from '@/types/IAdminSurveyRequest';

export const insertAdminSurvey = async (survey: IAdminSurveyRequest) => {
  const response = await apiInstance.post('/admin/survey', survey);
  return response.data;
};

export const fetchAdminSurvey = async () => {
  const response = await apiInstance.get('/admin/survey');
  return response.data;
};
