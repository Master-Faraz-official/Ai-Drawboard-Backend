import { Router } from "express";
import { loginController, logoutController, registerUserController } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.post("/register", registerUserController)

// The below approach allows us to build chaining of req ex-> .post().get().delete()
// userRouter.route("/register").post(registerUserController )


userRouter.post("/login", loginController)

// Secured Routes
userRouter.post("/logout", verifyJWT, logoutController)


export default userRouter