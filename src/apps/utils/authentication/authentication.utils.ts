import { nanoid } from "nanoid"
import nodemailer from "nodemailer"
import speakeasy from "speakeasy"
import { AuthenticatioinModel } from "../../model/authentication/authentication.model.js"
import { ForgotPasscodeModel } from "../../model/authentication/forgot-passcode.model.js"
import { env } from "../../../config/env.config.js"

export const FetchExistingUser = async (email: string) => {
	return await AuthenticatioinModel.find({ userEmail: email }).lean()
}

export const CreateNewUser = async (body: Record<string, string>) => {
	const { userEmail, userPassword } = body

	const newUser = new AuthenticatioinModel({
		userId: nanoid(),
		userEmail,
		userPassword
	})

	await newUser.save()
}

export const FetchTempPasscode = async (userData: Record<string, any>) => {
	const passcode = speakeasy.totp({
		secret: speakeasy.generateSecret({ length: 20 }).base32,
		digits: 6,
		algorithm: "sha1"
	})

	const { userId, userEmail } = userData[0]

	await ForgotPasscodeModel.findOneAndUpdate(
		{ userEmail },
		{ userId, userEmail, tempPasscode: passcode },
		{ new: true, upsert: true }
	)

	return passcode
}

export const FetchUserTempcode = async (userEmail: string, tempPasscode: string) => {
	return await ForgotPasscodeModel.find({ userEmail, tempPasscode }).lean()
}

export const ChangeUserNewPassword = async (userEmail: string, userPassword: string) => {
	await AuthenticatioinModel.findOneAndUpdate({ userEmail }, { userPassword }, { new: true })
}

export const SendMailToUser = async (email: string, tempPassword: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: env.nodemailer.AUTH_USER,
			pass: env.nodemailer.AUTH_PASSWORD
		}
	})

	const mailOptions = {
		from: env.nodemailer.AUTH_USER,
		to: email,
		subject: "Forgot Passcode",
		text: `This's your temporary passcode ${tempPassword}`
	}

	transporter.sendMail(mailOptions)
}
