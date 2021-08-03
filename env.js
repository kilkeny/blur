const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const BUILD_DIR = 'build';
const SRC_DIR = 'client';

const STATIC_DIR = 'static';
const SERVER_DIR = 'server';

module.exports = { isDev, isProd, BUILD_DIR, SRC_DIR, STATIC_DIR, SERVER_DIR };
