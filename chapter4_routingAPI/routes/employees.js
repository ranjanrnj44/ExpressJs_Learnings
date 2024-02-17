const express = require('express');
const router = express.Router();

// JSON data
data = {};
data.employees = require('../public/data/employee.json'); // this part usually we connect to DB in real world

router.route('^/$|/index(.html)?')
.get((request, response) => {
    response.json(data.employees); // sending response as JSON just like (send, sendFile)
})
.post((request, response) => {
    response.json({
        "name": request.body.name,
        "age": request.body.age,
        "place": request.body.place
    }); // posting response as JSON just like (send, sendFile)
})
.put((request, response) => {
    response.json({
        "name": request.body.name,
        "age": request.body.age
    }); // posting response as JSON just like (send, sendFile)
})
.delete((request, response) => {
    response.json({
        "id": request.body.id,
    }); // posting response as JSON just like (send, sendFile)
})
// sometimes the URL will have ID
router.route('/:id')
.get((request, response) => {
    response.json({"id": request.params.id})
})

module.exports = router;