import { Router } from 'express';
import { TransportTypeService, transportTypeDto } from './transport-type.service';
import { authMiddleware } from '../../common/middleware/auth.middleware';

export const transportTypeRouter = Router();

transportTypeRouter.get('/', async (_req, res) => {
  const data = await TransportTypeService.list();
  return res.json(data);
});

transportTypeRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = transportTypeDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }
  const created = await TransportTypeService.create(parsed.data);
  return res.status(201).json(created);
});

