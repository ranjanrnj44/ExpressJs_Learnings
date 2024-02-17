const logEvent = require('./loggerEvent');

const errorHandler = (error, request, response, next) => {
    logEvent(`${error.name}: ${error.message}, 'logEvent.txt' `);
    console.error(error.stack);
    response.status(500).send(error.message)
    next();
}

module.exports = errorHandler;