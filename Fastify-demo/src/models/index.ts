import fs from 'fs/promises';
import path from 'path';
import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import configObj from '../config/config.js';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment
const env = process.env.NODE_ENV || 'development';
const config = configObj[env] as {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: any;
  use_env_variable?: string;
  logging?: boolean;
};

// Initialize Sequelize
let sequelize: Sequelize;

if (config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Container for all models
interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

const db: DB = {
  sequelize,
  Sequelize,
};

// Load all model files dynamically
const files = await fs.readdir(__dirname);

for (const file of files) {
  if (
    file.startsWith('.') ||
    file === path.basename(__filename) ||
    (!file.endsWith('.ts') && !file.endsWith('.js')) ||
    file.endsWith('.test.ts') ||
    file.endsWith('.test.js')
  ) continue;

  const modelPath = pathToFileURL(path.join(__dirname, file)).href;

  const modelImport = await import(modelPath) as {
    default: (sequelize: Sequelize, dataTypes: typeof DataTypes) => ModelStatic<Model>;
  };

  const model = modelImport.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Setup associations if any
Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if ('associate' in model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

export default db;
