const express = require('express');
const router = express.Router();
const path = require('path');

// creating the routing paths - use / or(|) /home or /home.html - using regExp
router.get('^/$|/home(.html)?', (request, response) => {
    // response.send('Hey ExpressJs Server!');
    response.sendFile(path.join(__dirname, '..', 'index.html'));
});
// server HTML file - call as /about.html or just /about
router.get('/about(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});
router.get('/contact', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'contact.html'));

});
// redirecting to newProduct page if the user hits old-product 
router.get('/new-page(.html)?', (request, response) => {
    response.redirect(301,'old-page.html');
    next();
});
router.get('/old-page(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});
// next()
router.get('/hello(.html)?', (request, response, next) => {
    console.log('This is the page you are looking for');
    next();
}, (request, response) => {
    response.send('This is the NEXT() function data');
});

module.exports = router;