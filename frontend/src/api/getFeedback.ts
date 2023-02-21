import { useQuery } from 'react-query';

import { Feedback, Request, User } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export type CreateRequestDTO = {
  note: string;
};

type FeedbackResponse = {
  feedbacks: Feedback[];
  employee: User;
};

export const getFeedback = (id: string): Promise<FeedbackResponse> => {
  return axios.get(`/feedback/${id}`);
};

export const createFeedback = (id: string, data: CreateRequestDTO): Promise<void> => {
  return axios.post(`/feedback/${id}`, data);
};

type QueryFnType = typeof getFeedback;

type UseFeedbackOptions = {
  config?: QueryConfig<QueryFnType>;
  id: string;
};

export const useFeedback = ({ config, id }: UseFeedbackOptions = { id: '' }) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['feedback'],
    queryFn: () => getFeedback(id),
  });
};
