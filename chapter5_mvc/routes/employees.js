const express = require('express');
const router = express.Router();
const employeeControllerData = require('../controllers/employeeController');


router.route('^/$|/index(.html)?')
.get(employeeControllerData.getAllEmployees)
.post(employeeControllerData.createEmployee)
.put(employeeControllerData.updateEmployee)
.delete(employeeControllerData.deleteEmployee)
// sometimes the URL will have ID
router.route('/:id')
.get(employeeControllerData.getEmployeeIndividualID)

module.exports = router;