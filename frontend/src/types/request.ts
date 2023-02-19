import { BaseEntity, User } from '@/types';

export type Request = {
  note: string;
  status: string;
  employee: User;
} & BaseEntity;
