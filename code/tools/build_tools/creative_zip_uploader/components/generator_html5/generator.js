const fs = require('fs');
const path = require('path');

module.exports = app => {
  app.post('/generateHTML5', (req, res) => {
    const PAGE_TITLE = req.body.campaign;
    const CREATIVE_URLS = req.body.creative;
    const PREVIEW_PAGE_DIR = path.join(__dirname, `/../../static/pages/${PAGE_TITLE}/`);

    makePageDir(PREVIEW_PAGE_DIR);
  });

  function makePageDir(dir) {
    if(fs.existsSync(dir)) {
      console.log('exists')
    } else {
      console.log('dosent exist')
    }
  }

  function copyCreativeDirs() {

  }
} 