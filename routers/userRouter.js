var express=require("express");
var obj = require("../controllers/userController");
var userRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware")

userRouter.post("/save",obj.doSaveUser)
userRouter.post("/login",obj.doLoginUser)
userRouter.put("/update/:id",obj.doUpdateUser);
userRouter.get("/fetchall",obj.doFetchUsers);
// userRouter.get("/profile", verifyToken, getUserData);  // 👈 protected route



module.exports =userRouter;