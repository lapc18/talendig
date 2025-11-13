import { Router } from 'express';
import { SyndicateService, syndicateDto } from './syndicate.service';
import { authMiddleware } from '../../common/middleware/auth.middleware';

export const syndicateRouter = Router();

syndicateRouter.get('/', async (_req, res) => {
  const data = await SyndicateService.list();
  return res.json(data);
});

syndicateRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = syndicateDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }
  const created = await SyndicateService.create(parsed.data);
  return res.status(201).json(created);
});

