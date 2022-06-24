import mongoose from 'mongoose'
import { UserPermissions } from '../shared/types'

export interface CredentialedUser {
	firstName: string
	lastName: string
	permissions?: UserPermissions
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
	permissions: {
		type: String,
		default: UserPermissions.USER
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

export const UserModel = mongoose.model<CredentialedUser>('User', userSchema)
