import { connectToMongoDB } from '../../../lib/db'
import { Entity } from '../../../models/Entity'

export const getAllEntities = async () => {
	try {
		await connectToMongoDB()
		const foundEntities = await Entity.find()
		if (foundEntities) {
			console.log('foundEntities', foundEntities)
			return foundEntities
		} else return []
	} catch (error) {
		throw new Error(`There was an error when finding entities: ${error.message ?? 'No error message'}`)
	}
}
