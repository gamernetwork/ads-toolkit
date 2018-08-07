const express = require('express');

const app = express();
const generator = require('./generator/generator');
const uploader = require('./uploader/uploader');

uploader.setup(app);
generator.setup(app);

// Listen on 3000 for connections
app.listen(3000, () => {
  console.log('Listening On localhost:3000');
});