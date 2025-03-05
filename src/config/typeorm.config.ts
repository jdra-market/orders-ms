import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { envs } from './envs';
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: envs.ordersDatabaseUrl,
  ssl: true,
  entities: ['**/*.entity.ts'],
  // migrations: ['src/database/migrations/*-migration.ts'],
  // migrationsRun: false,
  // logging: true,
});

export default AppDataSource;
