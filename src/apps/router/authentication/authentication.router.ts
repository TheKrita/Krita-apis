import express from "express"
import {
	VerifyTempPasscode,
	UserForgotPassword,
	ChangeUserPassword,
	UserSignUp
} from "../../controller/authentication/authentication.controller.js"

const authenticationRouter = express.Router()

authenticationRouter.post("/user/signup", UserSignUp)

authenticationRouter.post("/user/forgot/password", UserForgotPassword)

authenticationRouter.post("/user/verify/tempcode", VerifyTempPasscode)

authenticationRouter.post("/user/change/password", ChangeUserPassword)

export default authenticationRouter
