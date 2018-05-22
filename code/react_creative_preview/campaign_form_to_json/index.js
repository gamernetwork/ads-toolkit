const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs');

const port = 3000;
let jsonVal = null;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/test/demo.html'));
});
server.listen(port, (err) => {
    if(err) {
        return console.log('Error: ', err);
    }
    io.on('connection', function(socket){
        socket.on('message', function(data){
            jsonVal = data;
            fs.readFile('public/json/testjson.json', 'utf8', function readFileCallack(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    obj = jsonVal;
                    json = JSON.stringify(obj);
                    fs.writeFile('public/json/testjson.json', json, 'utf8', function(){
                        console.log('file written!');
                    });
                }
            });
        });
    })
    console.log(`Server listening on ${port}`);
});