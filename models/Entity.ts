import { Schema, model, ObjectId } from 'mongoose'

export interface IEntity {
	userId: ObjectId | string
	key: string
	createdAt: Date
	updatedAt: Date
}

const entitySchema = new Schema<IEntity>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	key: String,
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: Date
})

export const Entity = model('Entity', entitySchema)
