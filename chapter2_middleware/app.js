// port - to run our app
const PORT = 3000;
const path = require('path');
// express server
const express = require('express');
const app = express(); // recommended way
// CORS
const cors = require('cors');
// Event
const {logEvents, logger} = require('./middleware/loggerEvent');
// error handler
const errorHandler = require('./middleware/errorHandler');

// Custom Middleware - to log server things
// app.use((request, response, next) => {
//     console.log(`${request.method} -- ${request.path} -- ${request.headers.origin}`);
//     logEvents(`${request.method} -- ${request.path} -- ${request.headers.origin} \n`);
//     next();
// })
app.use(logger);
app.use(cors());

// CORS
const whiteList = ['https://www.myWebsiteURL.com', 'https://www.google.com', 'https://locaalhost:3000', 'https://127.0.0.1:5500'];
const corsOptions = {
    origin: (origin, callback) => {
        // if the list is present refers to -1, so that no error and ALLOWED by CORS
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }
        // Err, Not allowed by CORS
        else{
            callback(new Error('Invalid, This is not allowed'));
        }
    },
    optionsSuccessStatus: 200
};


// defining middleware - always at the top level - only the error handling keep at the last level
// get form submission data
app.use(express.urlencoded({extended: false}));
// get JSON
app.use(express.json());

// Built-in Middleware - to serve the necessary CSS, images and other required files at prior stage
app.use(express.static(path.join(__dirname, './public')));

// creating the routing paths - use / or(|) /home or /home.html - using regExp
app.get('^/$|/home(.html)?', (request, response) => {
    // response.send('Hey ExpressJs Server!');
    response.sendFile(path.join(__dirname, 'index.html'));
});
// server HTML file - call as /about.html or just /about
app.get('/about(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/contact', (request, response) => {
    response.sendFile(path.join(__dirname, 'views', 'contact.html'));

});
// redirecting to newProduct page if the user hits old-product 
app.get('/new-page(.html)?', (request, response) => {
    response.redirect(301,'old-page.html');
    next();
});
app.get('/old-page(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
// next()
app.get('/hello(.html)?', (request, response, next) => {
    console.log('This is the page you are looking for');
    next();
}, (request, response) => {
    response.send('This is the NEXT() function data');
})

// chaining
const one = (request, response, next) => {
    console.log('one');
    next();
}
const two = (request, response, next) => {
    console.log('two');
    next();
}
const three = (request, response) => {
    console.log('three, finished!');
    response.send('finished all 3 routes');
}

app.get('/chain(.html)?', [one, two, three]);

// error page - it accepts only for the GET, but for all METHODS plz check below code line 98
// app.get('/*', (request, response) => {
//     response.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html'));
// })
app.all('*', (request, response) => {
    response.status(404);
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname, 'views', 'error-page.html'));
    }
    else if(request.accepts('json')){
        response.json({"error": "404 not found!"});
    }
    else{
        response.type('txt').send("404 not found!");
    }
});

// errorHandler -> always keep this is in just above the listener
app.use(errorHandler);

// listen on the PORT for connections
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('listening on port', PORT);
});