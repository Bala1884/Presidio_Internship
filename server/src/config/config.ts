import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

type Env = 'development' | 'test' | 'production';

interface DBConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  port: number;
  dialect: Dialect;
  logging: boolean;
  use_env_variable?: string;
}

const config: Record<Env, DBConfig> = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
    
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
};

export default config;
