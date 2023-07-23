import { ISurveyOption } from '@/types/IAdminSurveyRequest';

export default interface IAdminSurvey {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  options?: ISurveyOption[];
}
