import { Transport, TransportTypeEnum } from './transport-type.entity';
import { z } from 'zod';

export const transportTypeDto = z.object({
  name: z.string().min(2),
  type: z.nativeEnum(TransportTypeEnum),
  syndicateId: z.number().int().positive().optional(),
});

export const TransportTypeService = {
  list: () => Transport.findAll(),
  create: (data: z.infer<typeof transportTypeDto>) => Transport.create(data),
};

