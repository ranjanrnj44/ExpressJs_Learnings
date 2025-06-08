const multer = require('multer');
const path = require('path');

const singleFileImg = multer.diskStorage({
    // destination: (request, fileName, callBackFn) => {
    //     callBackFn(null, 'upload/');
    // },
    destination: path.join(__dirname, 'uploads'),
    filename: (request, image, callBackFn) => {
        callBackFn(null, image.originalname);
    }
});


const uploadSingleImg = multer({ 
    storage: singleFileImg,
    limits: { fileSize: 1000000 }, // 10mb
    fileFilter: (request, file, callBack) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
            callBack(null, true);
        }
        else{ 
            callBack(new Error('Only .jpeg/.jpg images are allowed!'));
        }
    }
});

module.exports = uploadSingleImg;