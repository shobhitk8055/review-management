import { useQuery } from 'react-query';

import { Phone } from '../types';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

type PhoneDTO = {
  phone_number: string;
};

export const getPhones = (): Promise<Phone[]> => {
  return axios.get(`/phone`);
};

export const createPhone = (phone: PhoneDTO): Promise<void> => {
  return axios.post(`/phone`, phone);
};

export const updatePhone = (id: string, phone: PhoneDTO): Promise<void> => {
  return axios.post(`/phone/${id}`, phone);
};

export const deletePhone = (id: string): Promise<void> => {
  return axios.delete(`/phone/${id}`);
};

type QueryFnType = typeof getPhones;

type UsePhoneOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePhones = ({ config }: UsePhoneOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['phones'],
    queryFn: () => getPhones(),
  });
};
