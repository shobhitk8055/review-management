import { useQuery } from 'react-query';

import { Request } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export type CreateRequestDTO = {
  note: string;
  employee: string;
};

export const getRequests = (): Promise<Request[]> => {
  return axios.get(`/request`);
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

export const assignEmployees = (id: string, employeeIds: string[]): Promise<void> => {
  return axios.post(`/request/assign/${id}`, {employeeIds});
};

type QueryFnType = typeof getRequests;

type UseRequestOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useRequest = ({ config }: UseRequestOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['requests'],
    queryFn: () => getRequests(),
  });
};
