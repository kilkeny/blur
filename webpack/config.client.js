import path from 'path';
import { isDev, SRC_DIR } from './utils';

const config = {
  entry: ([
    isDev && 'react-hot-loader/patch',
    isDev && 'webpack-hot-middleware/client',
    isDev && 'css-hot-loader/hotModuleReplacement',
    path.join(__dirname, SRC_DIR, 'client'),
  ]),
};

export default config;
