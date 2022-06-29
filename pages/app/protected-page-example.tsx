import { useSession } from 'next-auth/react'
import React from 'react'
import Loading from '../../components/general/Loading'
import { NextAuthStatues } from '../../shared/types'

const ProtectedPageExample = () => {
	const { status } = useSession()
	return status === NextAuthStatues.LOADING ? <Loading /> : <div>Admin page!</div>
}

export default ProtectedPageExample
