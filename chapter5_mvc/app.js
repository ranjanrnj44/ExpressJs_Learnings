// port - to run our app
const PORT = 3000;
const path = require('path');
// express server
const express = require('express');
const app = express(); // recommended way
// CORS
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
// Event
const {logEvents, logger} = require('./middleware/loggerEvent');
// error handler
const errorHandler = require('./middleware/errorHandler');

app.use(logger);
app.use(cors(corsOptions));

// defining middleware - always at the top level - only the error handling keep at the last level
// get form submission data
app.use(express.urlencoded({extended: false}));
// get JSON
app.use(express.json());

// Built-in Middleware - to serve the necessary CSS, images and other required files at prior stage
app.use('/', express.static(path.join(__dirname, './public'))); // default it applies to ROOT directory, to point to different dir (i.e., subdir -> mention path like below line)
app.use('/subdir', express.static(path.join(__dirname, './public')));

// middleware - ROUTES
app.use('/', require('./routes/root')); // this will serve pages that is in the (views) > root directory
app.use('/subdir', require('./routes/subdir')); // this will serve pages that is in the (views > subdir) directory
// ROUTES API CREATION
app.use('/employees', require('./routes/employees')); // usually the API will be in JSON format so no need of consuming CSS pointing to public folder

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