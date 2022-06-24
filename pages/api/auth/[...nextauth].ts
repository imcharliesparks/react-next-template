import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { MONGODB_URI } from '../../../shared/constants'
// import clientPromise from '../../../lib/mongodb'
import { CredentialSignin } from '../../../shared/types'
import bcrypt from 'bcrypt'

export default NextAuth({
	// adapter: MongoDBAdapter(clientPromise),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				console.log('in auth method')
				await mongoose.connect(MONGODB_URI)
				const { email, password } = credentials

				const foundUser = await UserModel.findOne({ email })
				console.log('foundUser', foundUser)
				if (!foundUser) {
					throw new Error('User not found')
				}
				const passwordsMatch: boolean = await bcrypt.compare(foundUser.password, password)

				if (passwordsMatch) {
					return foundUser
				} else {
					throw new Error("Passwords don't match")
				}
			}
		})
	],
	session: {
		// Set to jwt in order to CredentialsProvider works properly
		strategy: 'jwt'
	}
	// pages: {
	// 	signIn: '/signin'
	// },
	// secret: 'secret'
})
