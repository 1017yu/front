import { ISurveyAnswer } from '@/types/ISurvey';

export interface IChart {
  id: number;
  title: string;
  totalNum: number;
}

export interface IChartArea {
  id: number;
  city: string;
  answers: ISurveyAnswer[];
}
