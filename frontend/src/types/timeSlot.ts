import { BaseEntity } from '@/types';

export type TimeSlot = {
  phone_number: string;
  time_from: string;
  time_to: string;
} & BaseEntity;
