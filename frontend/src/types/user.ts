import { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  phone: string;
} & BaseEntity;
