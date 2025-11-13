import { Router } from 'express';
import { StopStationService, stopStationDto } from './stop-station.service';
import { authMiddleware } from '../../common/middleware/auth.middleware';

export const stopStationRouter = Router();

stopStationRouter.get('/', async (_req, res) => {
  const data = await StopStationService.list();
  res.json(data);
});

stopStationRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = stopStationDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }
  const created = await StopStationService.create(parsed.data);
  return res.status(201).json(created);
});

