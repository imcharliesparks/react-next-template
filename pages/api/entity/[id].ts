import { NextApiRequest, NextApiResponse } from 'next'
import { APIMethods, APIStatuses, AuthResponses, EntityReponses, GeneralAPIResponses } from '../../../shared/types'
import { Entity } from '../../../models/Entity'
import { connectToMongoDB } from '../../../lib/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req
	const { id } = req.query
	const token = await getToken({ req })

	if (!token) {
		return res.status(401).json({ status: APIStatuses.ERROR, type: AuthResponses.UNAUTHORIZED })
	}

	if (method === APIMethods.GET) {
		try {
			await connectToMongoDB()
			const foundEntity = await Entity.findById(id)

			if (!foundEntity) {
				return res.status(404).json({ status: APIStatuses.ERROR, type: EntityReponses.ENTITY_NOT_FOUND })
			}

			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: EntityReponses.ENTITY_FOUND,
				data: { entity: foundEntity }
			})
		} catch (e) {
			console.log('e', e)
			res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.PUT) {
		try {
			await connectToMongoDB()
			const foundEntity = await Entity.findById(id)

			if (!foundEntity) {
				return res.status(404).json({ status: APIStatuses.ERROR, type: EntityReponses.ENTITY_NOT_FOUND })
			}

			const updatedEntity = await Entity.findByIdAndUpdate(id, { ...body.entity, updatedAt: new Date() }, { new: true })

			if (!updatedEntity) {
				return res.status(400).json({ status: APIStatuses.ERROR, type: EntityReponses.UNABLE_TO_UPDATE_ENTITY })
			}

			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: EntityReponses.ENTITY_UPDATED,
				data: { entity: updatedEntity }
			})
		} catch (e) {
			console.log('e', e)
			res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.DELETE) {
		try {
			await connectToMongoDB()
			const foundEntity = await Entity.findById(id)

			if (!foundEntity) {
				return res.status(404).json({ status: APIStatuses.ERROR, type: EntityReponses.ENTITY_NOT_FOUND })
			}

			const deletedEntity = await Entity.findByIdAndDelete(id)

			if (!deletedEntity) {
				return res.status(400).json({ status: APIStatuses.ERROR, type: EntityReponses.UNABLE_TO_DELETE_ENTITY })
			}

			return res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: EntityReponses.ENTITY_DELETED,
				data: { entity: deletedEntity }
			})
		} catch (e) {
			console.log('e', e)
			res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE })
}

export default handler
