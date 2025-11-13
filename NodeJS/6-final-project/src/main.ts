import { app, initializeRoutes } from './app';
import { connectDB } from './config/db';
import { config } from './config/env';

(async () => {
  await connectDB();
  await initializeRoutes();
  app.listen(config.port, () =>
    console.log(`Mi Parada API running at http://localhost:${config.port}`)
  );
})();

