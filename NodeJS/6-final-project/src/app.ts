import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loggerMiddleware } from './common/middleware/logger.middleware';

export const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

let routersLoaded = false;

async function loadRouters() {
  if (routersLoaded) return;
  
  const { stopStationRouter } = await import('./domains/stop-station/stop-station.controller');
  const { userRouter } = await import('./domains/user/user.controller');
  const { syndicateRouter } = await import('./domains/syndicate/syndicate.controller');
  const { timeRouter } = await import('./domains/time/time.controller');
  const { transportTypeRouter } = await import('./domains/transport-type/transport-type.controller');
  
  app.use('/api/stop-stations', stopStationRouter);
  app.use('/api/users', userRouter);
  app.use('/api/syndicates', syndicateRouter);
  app.use('/api/times', timeRouter);
  app.use('/api/transport-types', transportTypeRouter);
  
  routersLoaded = true;
}

export async function initializeRoutes() {
  await loadRouters();
}

