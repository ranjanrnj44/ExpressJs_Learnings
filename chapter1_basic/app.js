// port - to run our app
const PORT = 3000;
const path = require('path');
// express server
const express = require('express');
const app = express(); // recommended way

// creating the routing paths - use / or(|) /home or /home.html - using regExp
app.get('^/$|/home(.html)?', (request, response) => {
    response.send('Hey ExpressJs Server!');
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

// error page
app.get('/*', (request, response) => {
    response.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html'));
})
// listen on the PORT for connections
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log('listening on port', PORT);
});