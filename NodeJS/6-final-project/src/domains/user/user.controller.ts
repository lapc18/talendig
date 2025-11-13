import { Router } from 'express';
import { UserService, userDto } from './user.service';
import { authMiddleware } from '../../common/middleware/auth.middleware';

export const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  const data = await UserService.list();
  return res.json(data);
});

userRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = userDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }
  const created = await UserService.create(parsed.data);
  return res.status(201).json(created);
});

