const express = require('express');
const bodyParser = require('body-parser');
var createHTML = require('create-html')
const app = express();
const fs = require('fs');



const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/page', (req, res) => {
    const page = req.body.page;
    var html = createHTML({
        title: 'test',
        body: page
    })
    fs.writeFile('test.html', html, function(){
        console.log('file written!');
    });
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
}); 