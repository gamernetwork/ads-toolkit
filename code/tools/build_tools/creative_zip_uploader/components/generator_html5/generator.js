const fs = require('fs-extra');
const path = require('path');

module.exports = app => {
  app.post('/generateHTML5', (req, res) => {
    const PAGE_TITLE = req.body.campaign;
    const CREATIVE_URLS = req.body.creative;
    const PREVIEW_PAGE_DIR = path.join(__dirname, `/../../static/pages/${PAGE_TITLE}/`);

    if(PAGE_TITLE.length > 1) {
      makePageDir(PREVIEW_PAGE_DIR, CREATIVE_URLS, PAGE_TITLE);
    } else {
      console.log('No Title Specified');
    }
  });

  function makePageDir(dir, creatives, title) {
    if(fs.existsSync(dir)) {
      console.log('Preview Page Title Already Exists');
    } else {
      fs.mkdirSync(dir, err => {
        if(err) {
          console.log(err);
        }
      });
      copyCreativeDirs(dir, creatives, title);
    }
  }

  function copyCreativeDirs(dir, creatives, title) {
    fs.mkdirSync(dir + '/creatives', err => {
      if(err) {
        console.log(err);
      }
    })
    creatives.forEach(url => {
      console.log(url.split('unzipped/')[1])
      try {
        fs.copySync(__dirname +  '/../../static/' + url + '/', './static/pages/' + title + '/creatives/' + url.split('unzipped/')[1]);
      } catch(err) {
        console.log(err)
      }
    });
  }
} 