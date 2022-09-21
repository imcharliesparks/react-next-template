import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import mongoose from 'mongoose'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleOAuthProvider from 'next-auth/providers/google'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { MONGODB_URI } from '../../../shared/constants'
import { comparePasswords } from '../../../shared/utils'
import clientPromise from '../../../lib/mongodb'

type NextAuthCredentials = {
	email: string
	password: string
}

// type NextAuthRequest = Pick<RequestInternal, 'headers' | 'body' | 'query' | 'method'>

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials: NextAuthCredentials | undefined) {
				if (!credentials) {
					throw new Error('No credentials provided')
				}

				await mongoose.connect(MONGODB_URI)

				const { email, password } = credentials!
				const foundUser: CredentialedUser | null = await UserModel.findOne({ email })

				if (!foundUser) {
					throw new Error('User not found')
				}

				const passwordsMatch: boolean = await comparePasswords(password, foundUser.password)

				if (passwordsMatch) {
					const result: Partial<CredentialedUser> = {
						_id: foundUser._id!.toString(),
						firstName: foundUser.firstName,
						lastName: foundUser.lastName,
						email: foundUser.email,
						permissions: foundUser.permissions
					}

					return result
				} else {
					throw new Error("Passwords don't match")
				}
			}
		}),
		GoogleOAuthProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? 'oops',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'whaaaa',
			profile({ sub: id, name, email, picture: image }, tokens) {
				return {
					id,
					name,
					email,
					image
				}
			}
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 14 * 24 * 60 * 60, // two weeks
		updateAge: 1 * 24 * 60 * 60 // one day
	},
	pages: {
		signIn: '/auth/sign-in'
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, account }) => {
			if (account) {
				// TODO: Attach role and stuff here once other providers are setup
				console.log('oAuth account found', account)
			} else {
				const foundUser = await UserModel.findOne({ email: token.email })
				if (foundUser) {
					token.userPermission = foundUser.permissions
				} else {
					throw new Error('Error finding user in JWT callback')
				}
			}

			return token
		}
	}
})
