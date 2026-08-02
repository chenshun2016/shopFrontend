type Environment = 'development' | 'production' | 'test';

// 定义配置类型
interface Config {
  BASE_URL: string;
  TIMEOUT: number;
}

type ConfigMap = Record<Environment, Config>;

const config: ConfigMap = {
  development: {
    BASE_URL: 'http://localhost:3001/api',
    TIMEOUT: 5000,
  },
  production: {
    BASE_URL: 'https://api.example.com/api',
    TIMEOUT: 10000,
  },
  test: {
    BASE_URL: 'http://localhost:3001/api',
    TIMEOUT: 5000,
  },
};

const env = (process.env.NODE_ENV as Environment) || 'development';
export default config[env];