import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { User } from '@/types';

export type CreateUserDTO = {
  name: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
};

export const getUsers = (): Promise<User[]> => {
  return axios.get(`/users`);
};

export const createUser = (data: CreateUserDTO): Promise<void> => {
  return axios.post(`/users`, data);
};

export const updateUser = (id: string, data: CreateUserDTO): Promise<void> => {
  return axios.patch(`/users/${id}`, data);
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
