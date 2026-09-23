import express from "express"
import { userAdmin, userLogin, userRegister } from "../controllers/user.controller.js"

const userRouter = express.Router()


userRouter.post("/register", userRegister)
userRouter.post("/login", userLogin)
userRouter.post("/admin", userAdmin)

export default userRouter