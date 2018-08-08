const express = require('express');
const app = module.exports = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.static('static/'));

// Listen on 3000 for connections
app.listen(3000, () => {
  console.log('Listening On localhost:3000');
});