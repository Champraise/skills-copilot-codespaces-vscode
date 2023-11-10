// Create web server
// 1. Load express module
// 2. Create web server
// 3. Start web server
// 4. Create route
// 5. Create handler
// 6. Send response
// 7. Listen to port
// 8. Start web server: node comments.js

// 1. Load express module
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// 2. Create web server
var app = express();

// 3. Start web server
app.listen(3000, function() {
    console.log('Connected, 3000 port!');
});

// 4. Create route
// 5. Create handler
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/comments', function(req, res) {
    fs.readFile('data/comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    fs.readFile('data/comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('data/comments.json', JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.redirect('/comments');
        });
    });
});

app.delete('/comments/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    fs.readFile('data/comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var comments = JSON.parse(data);
        comments.splice(id, 1);
        fs.writeFile('data/comments.json', JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.redirect('/comments');
        });
    });
});