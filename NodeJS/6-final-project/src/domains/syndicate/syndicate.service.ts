import { Syndicate } from './syndicate.entity';
import { z } from 'zod';

export const syndicateDto = z.object({
  name: z.string().min(2),
});

export const SyndicateService = {
  list: () => Syndicate.findAll(),
  create: (data: z.infer<typeof syndicateDto>) => Syndicate.create(data),
};

