import express from "express"
import { test } from "../controller/index.controller.js"
const apiRouter = express.Router()

apiRouter.use("/ping", test)

export default apiRouter
