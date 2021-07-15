const { isProd, isDev } = require('./env');
const { filename } = require('./filename');
const { BUILD_DIR, SRC_DIR, STATIC_DIR, SERVER_DIR } = require('./consts');

module.exports = {
  isProd,
  isDev,
  filename,
  BUILD_DIR,
  SRC_DIR,
  STATIC_DIR,
  SERVER_DIR,
};
