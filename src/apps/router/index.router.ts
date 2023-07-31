import express from "express"
import authenticationRouter from "./authentication/authentication.router.js"

const apiRouter = express.Router()

apiRouter.use("/auth", authenticationRouter)

export default apiRouter
