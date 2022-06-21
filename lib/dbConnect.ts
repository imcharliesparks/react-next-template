import mongoose from 'mongoose'

const MONGODB_URI: string = process.env.MONGO_ATLAS_URL!

// @ts-ignore
let cached = global.mongoose

if (!cached) {
	// @ts-ignore
	cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
			bufferMaxEntries: 0,
			useFindAndModify: true,
			useCreateIndex: true
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default dbConnect
