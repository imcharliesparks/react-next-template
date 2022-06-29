import type { NextRequest } from 'next/server'
import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { UserPermissions } from '../../../shared/types'

export default withAuth(
	// @ts-ignore
	function middleware(req: NextRequest & { nextauth: { token: JWT | null } }) {
		console.log(req.nextauth.token)
	},
	{
		callbacks: {
			authorized: ({ token }) => token?.userPermission === UserPermissions.ADMIN
		}
	}
)

export const config = { matcher: ['/admin'] }
