const express = require('express');
const path = require('path');
const { BUILD_DIR } = require('../webpack/utils');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, `../${BUILD_DIR}`)));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, `../${BUILD_DIR}/index.html`));
});

app.listen(PORT, () => {
  console.log(`Start in ${PORT}!`);
});
