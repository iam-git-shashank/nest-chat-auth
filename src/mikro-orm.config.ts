import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
const config: Options = {
  // type:"postgres",
  driver: MySqlDriver,
  dbName: 'demo',
  user: 'root',
  password: 'admin',
  host: 'localhost',
  port: 3306,
  // entities: ['dist/entities'],
  // entitiesTs: ['src/entities'],

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  contextName: 'default',
  allowGlobalContext: true,
};

export default config;
