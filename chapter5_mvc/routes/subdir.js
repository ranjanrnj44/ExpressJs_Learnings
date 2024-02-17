const express = require('express');
const router = express.Router();
const path = require('path');

// don't use app.get, it's router.get ---> this is to handle router, other subDir files
router.get('^/$|/home(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views/subdir', 'index.html'));
});

router.get('^/$|/test(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views/subdir', 'test.html'));
});

module.exports = router;