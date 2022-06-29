import React from 'react'
import Loading from '../../components/general/Loading'
import { usePageSecurity } from '../../hooks/usePageSecurity'
import { NextAuthStatues } from '../../shared/types'

const ProtectedPageExample = () => {
	const [status] = usePageSecurity()
	return status === NextAuthStatues.LOADING ? <Loading /> : <div>Admin page!</div>
}

export default ProtectedPageExample
