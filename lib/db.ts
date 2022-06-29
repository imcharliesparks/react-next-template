import mongoose from 'mongoose'
import { MONGODB_URI } from '../shared/constants'

export async function connectToMongoDB() {
	return await mongoose.connect(MONGODB_URI)
}
