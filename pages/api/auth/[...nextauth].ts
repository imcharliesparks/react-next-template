import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import mongoose from 'mongoose'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleOAuthProvider from 'next-auth/providers/google'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { MONGODB_URI } from '../../../shared/constants'
import { comparePasswords } from '../../../shared/utils'
import clientPromise from '../../../lib/mongodb'
import { UserRoles } from '../../../shared/types'

type NextAuthCredentials = {
	email: string
	password: string
}

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
						role: foundUser.role
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
			profile({ sub: id, name, email, picture: image }) {
				return {
					id,
					name,
					email,
					image,
					role: UserRoles.USER
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
		async jwt({ token, user, account }) {
			if (account && user) {
				token.accessToken = account.access_token
				token.role = user.role
				token.firstName = user.firstName
				token.lastName = user.lastName
			}

			return token
		},
		async session({ session, token }) {
			if (session.user) {
				// @ts-ignore
				session.user.role = token.role
				// @ts-ignore
				session.user.name = `${token.firstName} ${token.lastName}`
			}

			return session
		}
	}
})
