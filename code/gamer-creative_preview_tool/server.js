const express = require('express');
const bodyParser = require('body-parser');
var createHTML = require('create-html')
const app = express();
const fs = require('fs');

const port = 5000;

// Set limit to account for large text blobs
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({limit: '10mb'}));

app.use(express.static(`${__dirname}/generated_pages`));

// On post request, generate a static.html file with page contents
app.post('/api/page', (req, res) => {
    const page = req.body.page;
    let title = req.body.title;
    title = title.replace(/\s+/g, '-').toLowerCase();
    var html = createHTML({
        title: title,
        css: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
        body: page
    })
    fs.writeFile(`generated_pages/${title}.html`, html, function(){
        console.log('file written!');
        res.send({
            rendered: true,
            path: `localhost:5000/${title}.html`
        });
    });
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
}); 