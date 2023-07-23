import dotenv from "dotenv"

dotenv.config()

export const env = {
	common: {
		SERVER_PORT: process.env.SERVER_PORT,
		API_VERSION: process.env.API_VERSION
	},
	mongodb: {
		MONGO_DB_DEV_URL: process.env.MONGO_DB_DEV_URL
	}
}
