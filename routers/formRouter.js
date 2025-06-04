var express=require("express");

var obj = require("../controllers/formController");

var formRouter = express.Router();

formRouter.post("/saveapplication",obj.doSaveFormPost);
formRouter.get("/allapplicants",obj.doFetchAll);
formRouter.post("/accept",obj.doAccept);
formRouter.post("/reject",obj.doReject);
formRouter.post("/delete",obj.doDelete);
formRouter.post("/franchise",obj.doFranchise);

module.exports=formRouter;