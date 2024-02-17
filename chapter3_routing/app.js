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
// router
const subDirRouter = require('./routes/subdir');
const rootRouter = require('./routes/root');

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
app.use('/', express.static(path.join(__dirname, './public'))); // default it applies to ROOT directory, to point to different dir (i.e., subdir -> mention path like below line)
app.use('/subdir', express.static(path.join(__dirname, './public')));

// middleware - ROUTES
app.use('/', rootRouter); // this will serve pages that is in the (views) > root directory
app.use('/subdir', subDirRouter); // this will serve pages that is in the (views > subdir) directory



// error page - it accepts only for the GET, but for all METHODS plz check below code with app.all
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