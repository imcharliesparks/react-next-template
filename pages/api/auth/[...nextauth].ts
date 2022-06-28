import mongoose from 'mongoose'
import NextAuth, { RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { CredentialedUser, UserModel } from '../../../models/CredentialedUser'
import { MONGODB_URI } from '../../../shared/constants'
import { comparePasswords } from '../../../shared/utils'

type NextAuthCredentials = {
	email: string
	password: string
}

type NextAuthRequest = Pick<RequestInternal, 'headers' | 'body' | 'query' | 'method'>

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials: NextAuthCredentials | undefined, req: NextAuthRequest) {
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
	secret: process.env.NEXTAUTH_SECRET
})
