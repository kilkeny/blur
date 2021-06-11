const { LoadersSrc } = require('./loaders.src');
const { LoadersStyle } = require('./loaders.style');
const { LoadersFile } = require('./loaders.file');

module.exports = {
    Loaders: [...LoadersStyle, ...LoadersSrc, ...LoadersFile],
};
