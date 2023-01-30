import { useQuery } from 'react-query';

import { Day } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

type DayDTO = {
  days: string[];
  default_number: string;
};

export const getDays = (): Promise<Day[]> => {
  return axios.get(`/day`);
};

export const updateDay = (id: string, day: Partial<DayDTO>): Promise<void> => {
  return axios.post(`/day/${id}`, day);
};

export const deleteTime = (id: string, day: Partial<DayDTO>): Promise<void> => {
  return axios.post(`/day/${id}`, day);
};

type QueryFnType = typeof getDays;

type UseDaysOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDays = ({ config }: UseDaysOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['days'],
    queryFn: () => getDays(),
  });
};
