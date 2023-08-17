import { ISurveyOption } from '@/types/IAdminSurveyRequest';

export default interface ISurveyResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  isDone: boolean;
  options: ISurveyOption[];
}
