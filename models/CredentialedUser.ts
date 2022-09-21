import mongoose from 'mongoose'
import { UserRoles } from '../shared/types'

export interface CredentialedUser {
	_id?: string
	firstName: string
	lastName: string
	// TODO: Add a security layer to assign permissions based on role
	role?: UserRoles
	email: string
	password: string
	location?: string
	createdAt?: Date
	updatedAt?: Date
}

const userSchema = new mongoose.Schema<CredentialedUser>({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: UserRoles.USER
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	location: String,
	createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	}
})

export const UserModel = mongoose.models.User ?? mongoose.model<CredentialedUser>('User', userSchema)
