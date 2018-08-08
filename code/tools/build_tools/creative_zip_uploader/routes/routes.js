const path = require('path');

module.exports = app => {
  app.get('/uploader', (req, res) => {
    res.sendFile(path.join(__dirname, '/../components/uploader/uploader.html'));
  });
  app.get('/html5', (req, res) => {
    res.sendFile(path.join(__dirname, '/../components/generator_html5/generator.html'));
  });
}
