import { HttpStatusCode } from "axios"
import {
	ChangeUserNewPassword,
	CreateNewUser,
	FetchExistingUser,
	FetchTempPasscode,
	FetchUserTempcode,
	SendMailToUser
} from "../../utils/authentication/authentication.utils.js"

export const UserSignUp = async (req: any, res: any) => {
	const { userEmail } = req.body

	const getExistingUser = await FetchExistingUser(userEmail)

	if (getExistingUser.length > 0)
		return res.json({ Status: HttpStatusCode.Conflict, Message: "User Already Exist" })

	await CreateNewUser(req.body)

	return res.json({ Status: HttpStatusCode.Created, Message: "User Record Created Successfully" })
}

export const UserForgotPassword = async (req: any, res: any) => {
	const { userEmail } = req.body

	const getExistingUser = await FetchExistingUser(userEmail)

	if (getExistingUser.length === 0)
		return res.json({
			Status: HttpStatusCode.NotFound,
			Message: "User Not Found, Kindly Check The Email"
		})

	const getTempPassword = await FetchTempPasscode(getExistingUser)

	await SendMailToUser(userEmail, getTempPassword)

	return res.json({ Status: HttpStatusCode.Processing, Message: "Mail Sended" })
}

export const VerifyTempPasscode = async (req: any, res: any) => {
	const { userEmail, tempPasscode } = req.body

	const getExistingUser = await FetchExistingUser(userEmail)

	if (getExistingUser.length === 0)
		return res.json({
			Status: HttpStatusCode.NotFound,
			Message: "User Not Found, Kindly Check The Email"
		})

	const getUserTempCode = await FetchUserTempcode(userEmail, tempPasscode)

	if (getUserTempCode.length === 0)
		return res.json({
			Status: HttpStatusCode.NotFound,
			Message: "Check the Temporary code"
		})

	return res.json({
		Status: HttpStatusCode.Accepted,
		Message: "Temporary Code Verified Successfully"
	})
}

export const ChangeUserPassword = async (req: any, res: any) => {
	const { userEmail, userPassword } = req.body

	const getExistingUser = await FetchExistingUser(userEmail)

	if (getExistingUser.length === 0)
		return res.json({
			Status: HttpStatusCode.NotFound,
			Message: "User Not Found, Kindly Check The Email"
		})

	await ChangeUserNewPassword(userEmail, userPassword)

	return res.json({
		Status: HttpStatusCode.Accepted,
		Message: "User New Password Updated Successfully"
	})
}
