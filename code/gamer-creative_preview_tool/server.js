const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/page', (req, res) => {
    const page = req.body.page;
    console.log(page)
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
}); 