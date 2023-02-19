import { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  privileges: string[];
} & BaseEntity;
