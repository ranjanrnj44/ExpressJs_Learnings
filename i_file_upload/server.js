const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 3001;
// multer uploads [Img, multiple Imgs, Video]
const uploadSingleImg = require('./middlewares/singleFileImg');
const uploadMultipleImg = require('./middlewares/multipleFileImg');
const uploadVideoFile = require('./middlewares/videoFile');

const globalErrorHandler = require('./middlewares/globalErrHandler');

// m/w we're telling EXPRESS to serve /multipleUploads folder as static
app.use('/multipleUploads', express.static(path.join(__dirname, 'middlewares', 'multipleUploads')));
app.use('/videoUploads', express.static(path.join(__dirname, 'middlewares', 'videoUploads'))); 


app.get('/', (request, response) => {
    return response.status(200).sendFile(path.join(__dirname, "views", "home.html"));
});

app.get('/contact', (request, response) => {
    return response.status(200).sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get('/dashboard', (request, response) => {
    return response.status(200).sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get('/gallery', (request, response) => {
    // get the directory
    const getSingleImgDir = path.join(__dirname, 'middlewares', 'uploads');
    const getMultipleImgDir = path.join(__dirname, 'middlewares', 'multipleUploads');;
    const getVideosDir = path.join(__dirname, 'middlewares', 'videoUploads');
     /*
      synchronously reads the contents of a directory. It returns an array containing the names
      of all files and subdirectories within the specified directory
    */
    const listSingleImgFiles = fs.readdirSync(getSingleImgDir);
    const listMultipleImgFiles = fs.readdirSync(getMultipleImgDir);
    const listVideoFiles = fs.readdirSync(getVideosDir);

    let returnHtml = '<h1>gallery</h1>';
    [...listMultipleImgFiles, ...listVideoFiles].forEach(file => {
        if(file.match(/\.(jpg|jpeg|png)$/)) {
            // const singleImgs = `<img src='/uploads/${file}' alt="${file.toString()}" width="200" style="margin: 10px" />`;
            const multipleImgs = `<img src='/multipleUploads/${file}' alt="${file.toString()}" width="200" style="margin: 10px" />`;
            returnHtml+=multipleImgs;
        }
        else if(file.match(/\.(mp4|mkv|avi|mov)$/)){
            returnHtml+= `
                <video width="320" height="240" controls>
                    <source src='/videoUploads/${file}' alt="${file.toString()}" type="video/mov">
                    <source src='/videoUploads/${file}' alt="${file.toString()}" type="video/oog">
                    <source src='/videoUploads/${file}' alt="${file.toString()}" type="video/avi">
                    Your browser does not support the video tag.
                </video>
            `;
        }
        else{
            returnHtml+= `<p>File is: ${file}</p>`;
        }
    });
    return response.status(200).send(returnHtml);
});

app.post('/single-img', uploadSingleImg.single('image'), (request, response, next) => {
    console.log("request.file", request.file);
    try{
        return response.status(201).json({ "status": "Single Image uploaded successfully!"})
    }catch(err){
        console.log(`Failed to upload single Image, Error: ${err}`);
        next(err); // sends error to global handler
    }
});

app.post('/multiple-img', uploadMultipleImg.array('image', 3), (request, response, next) => {
    console.log("request.file", request.file);
    try{
        return response.status(201).json({ "status": "Multiple Image uploaded successfully!"})
    }catch(err){
        console.log(`Failed to upload multiple Images, Error: ${err}`);
        next(err); // sends error to global handler
    }
});

app.post('/video', uploadVideoFile.single('video'), (request, response, next) => {
    try{
        return response.status(201).json({"status":"Video uploaded successfully!"})
    }catch(err){
        console.log(`Failed to upload the video, Error: ${err}`);
        next(err); // sends error to global handler
    }
})

app.all('*', (request, response) => {
    response.status(404);
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname, "views", "error-page.html"));
    }
    else if(request.accepts('json')){
        response.json({"error": "something went wrong!"});
    }
    else{
        response.type("txt").send("text response - went wrong!")
    }
});

// Global Error Handler - Always keep it as LAST middleware
app.use(globalErrorHandler);

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`App is running on the server: ${PORT}`);
});