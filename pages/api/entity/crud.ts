import { NextApiRequest, NextApiResponse } from 'next'
import { APIMethods, APIStatuses, AuthResponses, EntityReponses, GeneralAPIResponses } from '../../../shared/types'
import { Entity, IEntity } from '../../../models/Entity'
import { connectToMongoDB } from '../../../lib/db'
import { UserModel } from '../../../models/CredentialedUser'
import { getToken } from 'next-auth/jwt'
// import { ObjectId } from 'mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req
	// const { email } = body.user
	const { key } = body.entity

	await connectToMongoDB()

	if (method === APIMethods.POST) {
		try {
			const token = await getToken({ req })

			if (!token) {
				return res.status(401).json({ status: APIStatuses.ERROR, type: AuthResponses.UNAUTHORIZED })
			}

			const foundUser = await UserModel.findOne({ email: token.email })

			if (!foundUser) {
				return res.status(404).json({ status: APIStatuses.ERROR, type: AuthResponses.UNABLE_TO_FIND_USER })
			}

			const newEntity: IEntity = {
				key,
				userId: foundUser._id.toString(),
				createdAt: new Date(),
				updatedAt: new Date()
			}

			const savedEntity = new Entity(newEntity)

			return savedEntity
				? res.status(201).json({
						status: APIStatuses.SUCCESS,
						type: EntityReponses.ENTITY_CREATED,
						data: { entityId: savedEntity._id.toString() }
				  })
				: res.status(400).json({ status: APIStatuses.ERROR, type: EntityReponses.UNABLE_TO_SAVE_ENTITY })
		} catch (e) {
			console.log('e', e)
			res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	}

	return res.status(404).json({ status: APIStatuses.ERROR, type: AuthResponses.INVALID_REQUEST_TYPE })
}

export default handler
