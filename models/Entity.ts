import { Schema, model, ObjectId, models } from 'mongoose'

export interface IEntity {
	_id?: string
	userId: ObjectId | string
	key: string
	value: string
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
	value: String,
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: Date
})

export const Entity = models.Entity || model('Entity', entitySchema)
