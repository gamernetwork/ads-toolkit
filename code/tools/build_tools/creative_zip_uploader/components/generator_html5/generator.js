const fs = require('fs-extra');
const path = require('path');

module.exports = app => {
  app.post('/generateHTML5', (req, res) => {
    const PAGE_TITLE = req.body.campaign;
    const CREATIVE_URLS = req.body.creative;
    const PREVIEW_PAGE_DIR = path.join(__dirname, `/../../static/pages/${PAGE_TITLE}/`);

    if(PAGE_TITLE.length > 1) {
      makePageDir(PREVIEW_PAGE_DIR);
    } else {
      console.log('No Title Specified');
    }
  });

  function makePageDir(dir) {
    if(fs.existsSync(dir)) {
      console.log('Preview Page Title Already Exists');
    } else {
      fs.mkdirSync(dir, err => {
        if(err) {
          console.log(err);
        } else {
          copyCreativeDirs();
        }
      })
    }
  }

  function copyCreativeDirs() {
    console.log('yo')
    CREATIVE_URLS.forEach(url => {
      console.log(url)
      fs.copySync(url, PREVIEW_PAGE_DIR + '/creatives');
    });
  }
} 