import IPostListItem from '@/types/IPostListItem';
import { apiInstance } from '@/api/axios';

interface IBoardResponse<T> {
  statusCode: number;
  totalPosts: number;
  data: T;
}

export const getBoardPage = async (
  page: number,
): Promise<IBoardResponse<IPostListItem[]>> => {
  const response = await apiInstance.get(`/board?page=${page - 1}`);
  return response.data;
};
