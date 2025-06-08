const multer = require('multer');
const fs = require('fs');
const path = require('path');

// const checkStorageLocation = () => {
//     const dirCheck = path.join(__dirname, '..', 'multipleUploads');
//     if(!fs.existsSync(dirCheck)){
//         fs.mkdirSync(dirCheck, (err) => {
//             if(err) throw err;
//             console.log("Folder created to upload multiple Images");
//         });
//     }
// }
const multipleFileImg = multer.diskStorage({
    destination: (request, file, cBackFn) => {
        const dirCheck = path.join(__dirname, 'multipleUploads');
        if(!fs.existsSync(dirCheck)){
            fs.mkdirSync(dirCheck, (err) => {
                if(err) throw err;
                console.log("Folder created to upload multiple Images");
            });
        }
        cBackFn(null, dirCheck); // we are setting our custom destination
    },
    filename: (request, image, cBackFn) => cBackFn(null, image.originalname),
});

const uploadMultipleImg = multer({
    storage: multipleFileImg,
    limits: {fileSize: 1000000},
    fileFilter: (request, file, cBackFn) => {
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            cBackFn(null, true);
        }
        else{
            cb(new Error('Only .jpeg/.jpg images are allowed!'));
        }
    }
})

module.exports = uploadMultipleImg;