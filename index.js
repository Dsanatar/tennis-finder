// requires ----------

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// app vars ----------

const app = express();
dotenv.config();
const port = process.env.PORT;

// app config --------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));


// routes ------------

app.use(function (req, res, next) {
    console.log('this is a test');
    next();
})

app.get('/', function(req, res) {
    // first arg is the file name of the template
    // second arg is optional vars to inject 
    res.render("index", {title: "Test"});
});

app.get('/user', function(req, res) {
    res.render("user");
})

// special error handling middleware
// must be "used" last
// handles any error that's thrown in the stack
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Something broke!')
  })

// server ---------

app.listen(port, function(err) {
    if (err) {
        return console.log('error with server', err)
    }
    console.log(`server is listening on ${port}`);
});