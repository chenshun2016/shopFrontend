const config = {
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

const env = process.env.NODE_ENV || 'development';
export default config[env];