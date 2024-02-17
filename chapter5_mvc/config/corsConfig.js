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

module.exports = corsOptions;