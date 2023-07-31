import mongoose from "mongoose"

const schemaOptions = {
	toObject: {
		virtuals: true,
		getters: true
	},
	toJSON: {
		virtuals: true,
		getters: true
	},
	timestamps: true
}

const authenticationSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		userEmail: { type: String, required: true, unique: true },
		userPassword: { type: String, required: true },
		createdAt: Date,
		updatedAt: Date
	},
	schemaOptions
)

export const AuthenticatioinModel = mongoose.model("user-credentials", authenticationSchema)
