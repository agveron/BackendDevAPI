let express = require('express');
let app = express();
require('dotenv').config();
const bodyParser = require('body-parser');


// 07 - Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

// 11 - Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 12 - Get Data from POST Requests
app.post('/name', (req, res) => {
    let data = req.body.first + ' ' + req.body.last;
    res.json({ name: data });
});

// 01 - Meet the Node console
console.log("Hello World");

// 02 - Start a working Express Server
/* app.get('/', (req, res) =>{
    res.send('Hello Express');
});
 */

/* 03 - Serve an HTML file */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// 04 - Serve static assets
app.use('/public', express.static(__dirname + '/public'));

// 05 - Serve JSON on a specific route
/* app.get('/json', (req, res) => {
    res.json({
        message: "Hello json"
    });
}); */

// 06 - Use the .env file to configure the app
app.get('/json', (req, res) => {
    let jsonResponse = {
        message: "Hello json"
    };

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        jsonResponse.message = jsonResponse.message.toUpperCase();
    }
    res.json(jsonResponse); 
});



// 08 - Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    });
});

// 09 - Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
    res.json({
        echo: req.params.word
    });
});

// 10 - Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
    res.json({
        name: req.query.first + ' ' + req.query.last
    });
});


module.exports = app;
