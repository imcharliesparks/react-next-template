import { NextApiRequest, NextApiResponse } from 'next'
import { APIMethods } from '../../../shared/types'
import { Entity, IEntity } from '../../../models/Entity'
import { ObjectId } from 'mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	// await mongoose.connect(MONGODB_URI)

	switch (method) {
		case APIMethods.POST:
			const newEntity: IEntity = await Entity.create({
				// TODO: Figure out how to fix the BSON type error
				// userId: new ObjectId('12345678911'),
				key: 'test',
				createdAt: new Date(),
				updatedAt: new Date()
			})
			res.status(201).json({ data: newEntity })
			break
		default:
			break
	}
}

export default handler
