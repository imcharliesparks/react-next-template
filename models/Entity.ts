import { Schema, model, ObjectId } from 'mongoose'

export interface IEntity {
	userId: ObjectId
	key: string
	createdAt: Date
	updatedAt: Date
}

const entitySchema = new Schema<IEntity>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	key: String,
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: Date
})

export const Entity = model('Entity', entitySchema)
