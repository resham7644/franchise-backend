var express = require("express");
var obj = require('../controllers/productController')
var productRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware");

productRouter.post("/save",verifyToken,obj.doSaveProduct);
productRouter.get("/fetchall/:id",verifyToken,obj.doFetchAll);
productRouter.delete('/delete/:id', verifyToken, obj.doDeleteProduct);
productRouter.put('/:id', verifyToken,obj.doUpdateProduct);


module.exports = productRouter;