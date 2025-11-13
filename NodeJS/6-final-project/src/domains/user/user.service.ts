import { User } from './user.entity';
import { z } from 'zod';

export const userDto = z.object({
  email: z.string().email(),
  displayName: z.string().optional(),
});

export const UserService = {
  list: () => User.findAll(),
  create: (data: z.infer<typeof userDto>) => User.create(data),
};

