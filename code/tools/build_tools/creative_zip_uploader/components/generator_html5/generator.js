const fs = require('fs-extra');
const path = require('path');

module.exports = app => {
  let iFrames = [];

  app.post('/generateHTML5', (req, res) => {
    const PAGE_TITLE = req.body.campaign;
    const CREATIVE_URLS = req.body.creative;
    const PREVIEW_PAGE_DIR = path.join(__dirname, `/../../static/pages/${PAGE_TITLE}/`);

    if (PAGE_TITLE.length > 1) {
      if(CREATIVE_URLS !== '') {
        makePageDir(PREVIEW_PAGE_DIR, CREATIVE_URLS, PAGE_TITLE);
      } else {
        return res.status(500).send('Please Add Some Creatives!');
      }
    } else {
      return res.status(500).send('Please Add A Page Title!');
    }
  });

  function makePageDir(dir, creatives, title) {
    if (fs.existsSync(dir)) {
      // Just copy the creative dirs, dont creative a new directory for the page title
      copyCreativeDirs(dir, creatives, title);
    } else {
      fs.mkdirSync(dir, err => {
        if (err) {
          return res.status(500).send('Error Creating Page Directory: ', err);
        }
      });
      copyCreativeDirs(dir, creatives, title);
    }
    generateIframes(creatives);
  }

  function copyCreativeDirs(dir, creatives, title) {
    if (!fs.existsSync(dir + 'creatives')) {
      fs.mkdirSync(dir + '/creatives', err => {
        if (err) {
          throw err;
        }
      });
    }
    if (creatives.constructor === Array) {
      creatives.forEach(url => {
        try {
          fs.copySync(__dirname + '/../../static/' + url + '/', './static/pages/' + title + '/creatives/' + url.split('unzipped/')[1]);
        } catch (err) {
          throw err;
        }
      });
    } else {
      try {
        fs.copySync(__dirname + '/../../static/' + creatives + '/', './static/pages/' + title + '/creatives/' + creatives.split('unzipped/')[1]);
      } catch (err) {
        throw err;
      }
    }
  }

  function generateIframes(creatives) {
    if(creatives.constructor === Array) {
      creatives.forEach(creative => {
        iFrames.push(createIframe(creative));
      })
    } else {
      iFrames.push(createIframe(creatives));
    }
    
  }

  function createIframe() {
    let entryPath = 'creatives/' + creative.split('unzipped/')[1] + 'index.html';
    let newIframe = `<iframe src="${entryPath}" scrolling="no">`;
  }
}