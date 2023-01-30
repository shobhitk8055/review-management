import { TimeSlot } from './timeSlot';

import { BaseEntity } from '@/types';

export type Day = {
  days: string[];
  default_number: string;
  timeSlots: TimeSlot[];
} & BaseEntity;
