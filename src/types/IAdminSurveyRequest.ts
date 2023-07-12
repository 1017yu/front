export default interface IAdminSurveyRequest {
  title: string;
  startDate: string;
  endDate: string;
  options: ISurveyOption[];
}

export interface ISurveyOption {
  content: string;
}
