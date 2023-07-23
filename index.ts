import express from "express"
import { env } from "./src/config/env.config.js"
import { mongooseConnection } from "./src/connection/mongodb.connection.js"
import apiRouter from "./src/apps/router/index.router.js"

mongooseConnection()

const app = express()

const apiVersion = env.common.API_VERSION as string

const port = env.common.SERVER_PORT as string

app.use(apiVersion, apiRouter)

app.listen(port, () => {
	console.log(`Server listening on port ${port}}`)
})
