import { NextApiRequest, NextApiResponse } from 'next'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { APIMethods, APIStatuses, AuthResponses } from '../../../shared/types'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { MONGODB_URI } from '../../../shared/constants'
import { validateCredentials } from '../../../shared/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	await mongoose.connect(MONGODB_URI)

	if (method !== APIMethods.POST) {
		return res.status(400).json('Wrong request type for singup endpoint')
	}

	try {
		if (!validateCredentials(body)) {
			return res.status(422).json({ status: APIStatuses.ERROR, type: AuthResponses.INVALID_CREDENTIALS })
		}

		const newUser: CredentialedUser = { ...body }
		const foundUser = await UserModel.findOne({ email: newUser.email })
		if (foundUser) {
			return res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.USER_ALREADY_EXISTS })
		}

		const user = new UserModel(newUser)
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)
		const savedUser = await user.save()

		return savedUser
			? res.status(201).json({ status: APIStatuses.SUCCESS, user: savedUser._id.toString() })
			: res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.UNABLE_TO_SAVE_USER })
	} catch (e) {
		console.log('e', e)
	}
}

export default handler
