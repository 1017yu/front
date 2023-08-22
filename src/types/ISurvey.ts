import { ISurveyOption } from '@/types/IAdminSurveyRequest';

export interface ISurveyResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  isDone: boolean;
  options: ISurveyOption[];
}

export interface ISurveyRequest {
  surveyId: number;
  surveyOptionId: number;
  age: number;
}

export interface ISurveyResultResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ISurveyResultDetail {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  options: ISurveyOption[];
  answers: ISurveyAnswer[];
}

export interface ISurveyAnswer {
  answerId: number;
  userId: number;
  optionId: number;
  age: number;
  area: string;
}
