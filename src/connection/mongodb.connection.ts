import mongoose, { ConnectOptions } from "mongoose"
import { env } from "../config/env.config.js"

const MONGO_DB_PATH = env.mongodb.MONGO_DB_DEV_URL as string

const options: ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
} as Record<string, boolean>

export const mongooseConnection = () => {
	mongoose
		.connect(MONGO_DB_PATH, options)
		.then(() => {
			console.log("Connected to MongoDB!")
		})
		.catch(error => {
			console.error("Error connecting to MongoDB:", error)
		})
}
