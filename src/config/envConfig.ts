// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config().parsed;

interface ENV {
  HOST: string | undefined;
  USER: string | undefined;
  PASSWORD: string | undefined;
  DB_NAME: string | undefined;
}

interface Config {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB_NAME: string;
}

export const getConfig = (): ENV => {
  return {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB_NAME: process.env.DB_NAME,
  };
};

const getSanitezedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;
