// JSON data
data = {};
data.employees = require('../model/employee.json'); // this part usually we connect to DB in real world

const getAllEmployees = ((request, response) => {
    response.json(data.employees); // sending response as JSON just like (send, sendFile)
})
const createEmployee = ((request, response) => {
    response.json({
        "name": request.body.name,
        "age": request.body.age,
        "place": request.body.place
    }); // posting response as JSON just like (send, sendFile)
})
const updateEmployee = ((request, response) => {
    response.json({
        "name": request.body.name,
        "age": request.body.age  
    }); // posting response as JSON just like (send, sendFile)
})
const deleteEmployee = ((request, response) => {
    response.json({
        "id": request.body.id,
    }); // posting response as JSON just like (send, sendFile)
})
// sometimes the URL will have ID
const getEmployeeIndividualID = ((request, response) => {
    response.json({"id": request.params.id})
})

module.exports = {getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeIndividualID}