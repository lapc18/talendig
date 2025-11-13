import { Router } from 'express';
import { TimeService, timeDto } from './time.service';
import { authMiddleware } from '../../common/middleware/auth.middleware';

export const timeRouter = Router();

timeRouter.get('/', async (_req, res) => {
  const data = await TimeService.list();
  return res.json(data);
});

timeRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = timeDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }
  const created = await TimeService.create(parsed.data);
  return res.status(201).json(created);
});

