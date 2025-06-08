const multer = require('multer');
const path = require('path');
const fs = require('fs');

const videoFile = multer.diskStorage({
    destination: (request, file, cBackFn) => {
        // defining the custom path and it's folder first
        const videoUploadPath = path.join(__dirname, 'videoUploads');
        if(!fs.existsSync(videoUploadPath)){
            fs.mkdirSync(videoUploadPath, err => {
                if(err) throw err;
                console.log("Folder created to upload videos");
            });
        }
        cBackFn(null, videoUploadPath); // setting up our custom directory
    },
    filename: (request, video, cBackFn) => cBackFn(null, video.originalname)
});

const uploadVideoFile = multer({
    storage: videoFile,
    limits: { fileSize: 10000000},
    fileFilter: (request, file, cBackFn) => {
        if(file.originalname.match(/\.(mp4|MPEG-4|mkv|mov|avi)$/)) { // regExp for file filtering
            cBackFn(null, true);
        }
        else{
            cBackFn(new Error('Only mp4 video formats are allowed to upload'))
        }
    }
});

module.exports = uploadVideoFile;