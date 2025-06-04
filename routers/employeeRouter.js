var express = require("express")
var obj = require('../controllers/employeeController')
var employeeRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware")

employeeRouter.post("/save",verifyToken,obj.doSaveEmployee);
employeeRouter.get("/fetchall/:id",verifyToken,obj.doFetchAll);
employeeRouter.delete('/delete/:id', verifyToken, obj.doDeleteEmp);
employeeRouter.put('/:id', verifyToken,obj.doUpdateEmp);



module.exports = employeeRouter;