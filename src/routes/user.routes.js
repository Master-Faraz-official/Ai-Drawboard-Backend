import { Router } from "express";
import registerUserController from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post("/register", registerUserController )

// The below approach allows us to build chaining of req ex-> .post().get().delete()
// userRouter.route("/register").post(registerUserController )


export default userRouter