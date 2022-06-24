import mongoose from 'mongoose'
import NextAuth, { RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserModel } from '../../../models/CredentialedUser'
import { MONGODB_URI } from '../../../shared/constants'
import bcrypt from 'bcrypt'

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
				const foundUser = await UserModel.findOne({ email })

				if (!foundUser) {
					throw new Error('User not found')
				}

				const passwordsMatch: boolean = await bcrypt.compare(password, foundUser.password)

				if (passwordsMatch) {
					return foundUser.toJSON()
				} else {
					throw new Error("Passwords don't match")
				}
			}
		})
	],
	callbacks: {
		// TODO: Type these
		async jwt({ token, user, account }: any) {
			if (account && user) {
				return {
					...token,
					accessToken: user.data.token,
					refreshToken: user.data.refreshToken
				}
			}

			return token
		},

		async session({ session, token }: any) {
			session.user.accessToken = token.accessToken

			return session
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
	// TODO: Implement custom page capabilities
	// pages: {
	// 	signIn: '/auth/sign-in'
	// }
})
