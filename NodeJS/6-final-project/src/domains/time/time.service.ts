import { Time } from './time.entity';
import { z } from 'zod';

export const timeDto = z.object({
  stopStationId: z.number().int().positive(),
  weekday: z.number().int().min(0).max(6),
  hour: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
});

export const TimeService = {
  list: () => Time.findAll(),
  create: (data: z.infer<typeof timeDto>) => Time.create(data),
};

