import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { env } from "./src/config/env.config.js"
import { mongooseConnection } from "./src/connection/mongodb.connection.js"
import apiRouter from "./src/apps/router/index.router.js"
import { rawBodyBuffer } from "./src/common/index.common.js"

const apiVersion = env.common.API_VERSION as string

const port = env.common.SERVER_PORT as string

mongooseConnection()

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true, limit: "10mb" }))

app.use(bodyParser.json({ verify: rawBodyBuffer, limit: "10mb" }))

app.use(
	bodyParser.raw({
		verify: rawBodyBuffer,
		type: "*/*"
	})
)

app.use(apiVersion, apiRouter)

app.listen(port, () => {
	console.log(`Server listening on port ${port}}`)
})
