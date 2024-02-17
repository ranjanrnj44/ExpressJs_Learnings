const {v4: uuid} = require('uuid');
const {format} = require('date-fns');
// fs, fsPromise and path
const fs = require('fs'); // sync based
const fsPromises = require('fs').promises; // async based
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'ddMMyyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime} ${uuid()} ${message} \n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'logEvent.txt'), logItem);
    }
    catch(err){
        console.error(err);
    }
}

const logger = (request, response, next) => {
    console.log(`${request.method} -- ${request.path} -- ${request.headers.origin}`);
    logEvents(`${request.method} -- ${request.path} -- ${request.headers.origin} \n`);
    next();
}

module.exports = {logEvents, logger};