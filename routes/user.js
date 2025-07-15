const express = require("express");
const { register, login, getProfile, editProfile } = require("../controllers/user");
const middleware = require("../middleware/middleware")

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getProfile", middleware, getProfile);
userRouter.post('/editProfile/:id', middleware, editProfile)
module.exports = userRouter;
