import { TimeSlot } from './timeSlot';

import { BaseEntity, Request, User } from '@/types';

export type Feedback = {
  employee: User;
  reviewer: User;
  status: string;
  request: Request;
  note: string;
} & BaseEntity;
