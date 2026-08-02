// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      // @ 指向 src 目录
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
