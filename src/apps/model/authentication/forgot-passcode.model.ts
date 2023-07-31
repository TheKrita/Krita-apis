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

const forgotPasscodeSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		userEmail: { type: String, required: true, unique: true },
		tempPasscode: { type: String, required: true },
		createdAt: Date,
		updatedAt: Date
	},
	schemaOptions
)

export const ForgotPasscodeModel = mongoose.model("user-temp-passcodes", forgotPasscodeSchema)
