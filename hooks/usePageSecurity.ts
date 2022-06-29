import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextAuthStatues } from '../shared/types'

export const usePageSecurity = (redirectLocation?: string) => {
	const { data: session, status } = useSession()
	const router = useRouter()

	React.useEffect(() => {
		if (status !== NextAuthStatues.LOADING && status === NextAuthStatues.UNAUTHENTICATED) {
			router.push(redirectLocation ?? '/')
		}
	}, [status])

	return [status, session]
}
