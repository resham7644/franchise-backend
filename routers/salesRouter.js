var express=require("express");
var obj = require("../controllers/salesController");
var salesRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware")

salesRouter.post("/upload",obj.doUploadSale)
salesRouter.get("/fetchall/:id",obj.doFetchAll);

module.exports =salesRouter;