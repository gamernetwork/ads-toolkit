const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const extract = require('extract-zip');

const app = express();

const directory = 'creatives'

if (!fs.existsSync(__dirname + `/${directory}`)) {
  fs.mkdirSync(__dirname + `/${directory}`, err => {
    if (err) res.status(500).send(err);
  });
};

let zippedCreatives;
let unzippedCreatives;
let campaignTitle;

app.use(fileUpload());
app.use(express.static('static/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  zippedCreatives = [];
  unzippedCreatives = [];

  let files = req.files.creative;
  campaignTitle = req.body.campaign;

  if (!fs.existsSync(__dirname + `/${directory}/${campaignTitle}`)) {
    fs.mkdirSync(__dirname + `/${directory}/${campaignTitle}`, err => {
      if (err) res.status(500).send(err);
    });
  };

  if(files.length > 1) {
    files.forEach(((file, index) => {
      file.mv(__dirname + `/${directory}/${campaignTitle}/${file.name}`, function (err) {
        if (err)
          return res.status(500).send(err);
        var str = __dirname + `/${directory}/${campaignTitle}/${file.name}`
        zippedCreatives.push(str);
        unzippedCreatives.push(str.split('.zip')[0] + '/');
        index++;
        if (index === files.length) {
          // Files Are Uploaded
          res.send(unzippedCreatives)
          unzip();
        }
      });
    }));
  } else {
    files.mv(__dirname + `/${directory}/${campaignTitle}/${files.name}`, function (err) {
      if (err)
        return res.status(500).send(err);
      extractZip(__dirname + `/${directory}/${campaignTitle}/${files.name}`);
      res.send(__dirname + `/${directory}/${campaignTitle}/${files.name}`);
    });
  }
});

function unzip() {
  zippedCreatives.forEach(entry => {
    extractZip(entry);
  })
}

function extractZip(src) {
  if (!fs.existsSync( __dirname + `/${directory}/${campaignTitle}/unzipped/`)) {
    fs.mkdirSync(__dirname + `/${directory}/${campaignTitle}/unzipped/`, err => {
      if (err) res.status(500).send(err);
    });
  };
  extract(src, {dir: __dirname + `/${directory}/${campaignTitle}/unzipped/`}, err => {
    if(err) throw err;
  });
}

// Listen on 3000 for connections
app.listen(3000, () => {
  console.log('Listening On localhost:3000');
});