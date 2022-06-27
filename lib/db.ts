import { MongoClient } from 'mongodb'
import { MONGODB_URI } from '../shared/constants'

// TODO: Decide on ORM vs MongoClient
export async function connectToMongoDB() {
	const client = await MongoClient.connect(MONGODB_URI)
	return client.db()
}
