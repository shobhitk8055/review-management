import { useQuery } from 'react-query';

import { Feedback, Request, User } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export type CreateRequestDTO = {
  note: string;
  employee: string;
};

export const getReviewRequests = (): Promise<Feedback[]> => {
  return axios.get(`/feedback`);
};

export const createRequest = (data: CreateRequestDTO): Promise<void> => {
  return axios.post(`/request`, data);
};

export const updateRequest = (id: string, data: CreateRequestDTO): Promise<void> => {
  return axios.post(`/request/${id}`, data);
};

export const deleteRequest = (id: string): Promise<void> => {
  return axios.delete(`/request/${id}`);
};

type QueryFnType = typeof getReviewRequests;

type UseFeedbackOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useReviewRequests = ({ config }: UseFeedbackOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['review-requests'],
    queryFn: () => getReviewRequests(),
  });
};
