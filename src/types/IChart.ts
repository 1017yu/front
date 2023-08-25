import { ISurveyAnswer } from '@/types/ISurvey';

export interface IChart {
  name: string;
  value: number;
}

export interface IChartArea {
  name: string;
  [key: string]: number | string;
}

export interface IChartAge {
  id: number;
  age: string;
  answers: ISurveyAnswer[];
}
