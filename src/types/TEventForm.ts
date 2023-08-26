export type TEventForm = {
  id: string;
  name: string;
  description: string;
  city: string;
  district: string;
  category: string;
  thumbnailUrl: string;
  startDate: string | null | Date;
  endDate: string | null | Date;
};
