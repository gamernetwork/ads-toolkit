const path = require('path');

module.exports = app => {
  app.get('/uploader', (req, res) => {
    res.sendFile(path.join(__dirname, '/../components/uploader/uploader.html'));
  });
  app.get('/generator', (req, res) => {
    res.sendFile(path.join(__dirname, '/../components/generator/generator.html'));
  });
}
