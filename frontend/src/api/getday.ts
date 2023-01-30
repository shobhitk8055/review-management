import { useQuery } from 'react-query';

import { Day } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

type TimeSlotDTO = {
  phone_number: string;
  time_from: string;
  time_to: string;
};

export const getDay = (id: string): Promise<Day> => {
  return axios.get(`/day/${id}`);
};

export const createTimeSlot = (id: string, payload: TimeSlotDTO): Promise<Day> => {
  return axios.post(`/day/${id}/time-slot`, payload);
};

export const updateTimeSlot = (
  id: string,
  timeSlotId: string,
  payload: TimeSlotDTO
): Promise<Day> => {
  return axios.post(`/day/${id}/time-slot/${timeSlotId}`, payload);
};

export const deleteTimeSlot = (id: string, timeSlotId: string): Promise<Day> => {
  return axios.delete(`/day/${id}/time-slot/${timeSlotId}`);
};

type QueryFnType = typeof getDay;

type UseDayOptions = {
  config?: QueryConfig<QueryFnType>;
  id: string;
};

export const useDay = ({ config, id }: UseDayOptions = { id: '1' }) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['day'],
    queryFn: () => getDay(id),
  });
};
