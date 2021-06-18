const { isProd } = require('./env');
const { STATIC_DIR } = require('./consts');

const filename = (ext) => (isProd
  ? `${STATIC_DIR}/${ext}/[name].[contenthash:8].${ext}`
  : `${STATIC_DIR}/${ext}/[name].bundle.${ext}`);

module.exports = { filename };
