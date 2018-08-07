exports.setup = function(app) {
  app.get('/generator', (req, res) => {
    res.sendFile(__dirname + '/generator.html');
  });
} 