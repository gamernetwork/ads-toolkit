const fs = require('fs-extra');
const path = require('path');
const createHTML = require('create-html');

module.exports = app => {
  // Array to store iFrame strings, later injected into the page index.html
  let iFrames = [];

  app.post('/generateHTML5', (req, res) => {
    iFrames = [];
    const PAGE_TITLE = req.body.campaign;
    const CREATIVE_URLS = req.body.creative;
    // Path for preview page directory
    const PREVIEW_PAGE_DIR = path.join(__dirname, `/../../static/pages/${PAGE_TITLE}/`);
    // Check for title
    if (PAGE_TITLE.length > 1) {
      // Check for creatives
      if(CREATIVE_URLS !== '') {
        makePageDir(PREVIEW_PAGE_DIR, CREATIVE_URLS, PAGE_TITLE);
      } else {
        return res.status(500).send('Please Add Some Creatives!');
      }
    } else {
      return res.status(500).send('Please Add A Page Title!');
    }
  });

  // Create directory for the preview page
  function makePageDir(dir, creatives, title) {
    if (fs.existsSync(dir)) {
      // Just copy the creative dirs, dont create a new directory for the page title
      copyCreativeDirs(dir, creatives, title);
    } else {
      // Create a new directory for the page title
      fs.mkdirSync(dir, err => {
        if (err) {
          return res.status(500).send('Error Creating Page Directory: ', err);
        }
      });
      copyCreativeDirs(dir, creatives, title);
    }
    generateIframes(creatives);
    createIndex(dir);
    injectIframeScripts(title, creatives);
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

  function createIframe(creative) {
    let entryPath = 'creatives/' + creative.split('unzipped/')[1] + 'index.html';
    return `<iframe src="${entryPath}" scrolling="no"></iframe>`;
  }

  function createIndex(dir) {
    const html = createHTML({
      title: 'Test',
      body: [iFrames.join(' ')],
      head: '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>',
      script: ['https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.1/iframeResizer.min.js'],
    });

    fs.writeFile(dir + '/index.html', html, err => {
      if(err) console.log(err);
    })
  }

  function injectIframeScripts(title, creatives) {
    creatives.forEach(creative => {
      var url = './static/pages/' + title + '/creatives/' + creative.split('unzipped/')[1] + '/index.html';
      console.log('./static/pages/' + title + '/creatives/' + creative.split('unzipped/')[1] + '/index.html');
      fs.readFile(url, 'utf8', (err, data) => {
        console.log(data)
      })
    })
  }
}