import { NextApiRequest, NextApiResponse } from 'next'
import { UserModel } from '../../../models/CredentialedUser'
import { APIMethods, APIStatuses, AuthResponses, GeneralAPIResponses } from '../../../shared/types'
import { comparePasswords, hashPassword, validatePassword } from '../../../shared/utils'
import { connectToMongoDB } from '../../../lib/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req
	const token = await getToken({ req })

	if (!token) {
		return res.status(401).json({ status: APIStatuses.ERROR, type: AuthResponses.UNAUTHORIZED })
	}

	if (method !== APIMethods.PATCH) {
		return res.status(404).json({
			status: APIStatuses.ERROR,
			type: GeneralAPIResponses.INVALID_REQUEST_TYPE,
			data: { expectedRequestType: APIMethods.DELETE }
		})
	}

	try {
		await connectToMongoDB()

		if (!body.email || !body.password || !validatePassword(body.newPassword)) {
			return res.status(422).json({ status: APIStatuses.ERROR, type: AuthResponses.INVALID_CREDENTIALS })
		}

		const foundUser = await UserModel.findOne({ email: body.email })

		if (!foundUser) {
			return res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.USER_NOT_FOUND })
		}

		const passwordsMatch: boolean = await comparePasswords(body.password, foundUser.password)
		const newPassword = await hashPassword(body.newPassword)
		foundUser.password = newPassword

		if (!passwordsMatch) {
			return res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.WRONG_PASSWORD })
		}

		const result = await foundUser.save()

		if (result._id) {
			return res.status(200).json({ status: APIStatuses.SUCCESS, type: AuthResponses.USER_DELETED })
		} else
			return result._id
				? res.status(200).json({ status: APIStatuses.SUCCESS, type: AuthResponses.USER_DELETED })
				: res.status(400).json({ status: APIStatuses.ERROR, type: AuthResponses.UNABLE_TO_DELETE_USER })
	} catch (e) {
		console.log('e', e)
	}
}

export default handler
