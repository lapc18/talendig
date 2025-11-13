import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { config } from './env';

const options: Options = {
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  logging: false,
};

export const sequelize = new Sequelize(options);

let modelsLoaded = false;

async function loadModels() {
  if (modelsLoaded) return;
  
  const { User } = await import('../domains/user/user.entity');
  const { Syndicate } = await import('../domains/syndicate/syndicate.entity');
  const { StopStation } = await import('../domains/stop-station/stop-station.entity');
  const { Time } = await import('../domains/time/time.entity');
  const { Transport } = await import('../domains/transport-type/transport-type.entity');
  
  sequelize.addModels([User, Syndicate, StopStation, Time, Transport]);
  modelsLoaded = true;
}

export async function connectDB() {
  await loadModels();
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('Database connected and synced');
}

