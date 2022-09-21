import { NextApiRequest, NextApiResponse } from 'next'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { APIMethods, APIStatuses, AuthResponses, GeneralAPIResponses, UserRoles } from '../../../shared/types'
import { hashPassword, validateSignupCredentials } from '../../../shared/utils'
import { connectToMongoDB } from '../../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	if (method !== APIMethods.POST) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		await connectToMongoDB()

		if (!validateSignupCredentials(body)) {
			return res.status(422).json({ status: APIStatuses.ERROR, type: AuthResponses.INVALID_CREDENTIALS })
		}

		const newUser: CredentialedUser = { ...body, permission: body.role ?? UserRoles.USER }
		const foundUser = await UserModel.findOne({ email: body.email })

		if (foundUser) {
			return res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.USER_ALREADY_EXISTS })
		}

		const user = new UserModel(newUser)
		user.password = await hashPassword(user.password)
		const savedUser = await user.save()

		return savedUser
			? res
					.status(201)
					.json({ status: APIStatuses.SUCCESS, type: AuthResponses.USER_CREATED, user: savedUser._id.toString() })
			: res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.UNABLE_TO_SAVE_USER })
	} catch (e) {
		console.log('e', e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
}

export default handler
