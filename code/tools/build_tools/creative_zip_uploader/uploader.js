const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const extract = require('extract-zip');

/* UPLOADER */

exports.setup = function (app) {

  // Directory to save creatives to
  const directory = 'static/creatives'

  // If directory does not exist, create it
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

  app.get('/uploader', (req, res) => {
    res.sendFile(__dirname + '/uploader.html');
  });

  app.post('/upload', (req, res) => {
    // If no files are present, return before any errors occur!
    if (!req.files.creative)
      return res.status(500).write('Please Select Some Files To Upload!');

    // Reset zipped / unzipped creatives arrays
    zippedCreatives = [];
    unzippedCreatives = [];

    // Uploaded files data and campaign title (used to set final save directory)
    let files = req.files.creative;
    campaignTitle = req.body.campaign;

    // If campaignTitle directory does not exist within the base dir, create it
    if (!fs.existsSync(__dirname + `/${directory}/${campaignTitle}`)) {
      fs.mkdirSync(__dirname + `/${directory}/${campaignTitle}`, err => {
        if (err) res.status(500).send(err);
      });
    };

    if (files.length > 1) {
      // Multiple files
      files.forEach(((file, index) => {
        // file.mv saves the .zip file to a chosen directory
        file.mv(__dirname + `/${directory}/${campaignTitle}/${file.name}`, function (err) {
          if (err)
            return res.status(500).send(err);
          // Push .zip location to zippedCreatives
          zippedCreatives.push(__dirname + `/${directory}/${campaignTitle}/${file.name}`);
          // Remove 'static/' and .zip from unzippedCreatives link and add unzipped/ path to the url
          unzippedCreatives.push(`/${directory.split('/')[1]}/${campaignTitle}/unzipped/${file.name}`.split('.zip')[0] + '/');
          // Index is used to only send reponse when each .zip file has been uploaded / urls have been created and stored in their respective arrays
          index++;
          if (index === files.length) {
            // Files Are Uploaded
            res.send(unzippedCreatives)
            // Unzip the uploaded files
            unzip();
          }
        });
      }));
    } else {
      // Single file
      files.mv(__dirname + `/${directory}/${campaignTitle}/${files.name}`, function (err) {
        if (err)
          return res.status(500).send(err);
        extractZip(__dirname + `/${directory}/${campaignTitle}/${files.name}`);
        res.send(`/${directory.split('/')[1]}/${campaignTitle}/unzipped/${files.name}`.split('.zip')[0] + '/');
      });
    }
  });

  function unzip() {
    zippedCreatives.forEach(entry => {
      extractZip(entry);
    })
  }

  function extractZip(src) {
    if (!fs.existsSync(__dirname + `/${directory}/${campaignTitle}/unzipped/`)) {
      fs.mkdirSync(__dirname + `/${directory}/${campaignTitle}/unzipped/`, err => {
        if (err) res.status(500).send(err);
      });
    };
    extract(src, {
      dir: __dirname + `/${directory}/${campaignTitle}/unzipped/`
    }, err => {
      if (err) throw err;
    });
  }
}