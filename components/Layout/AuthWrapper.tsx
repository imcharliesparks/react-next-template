import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {
	children: React.ReactElement
}

const AuthWrapper = ({ children }: Props): React.ReactElement => {
	const { status } = useSession({ required: true })

	return status === 'loading' ? <div>Loading...</div> : children
}

export default AuthWrapper
