import { useSession } from 'next-auth/react'
import React from 'react'

const AdminExample = () => {
	const { data: session } = useSession()
	console.log('session', session)
	return <div>AdminExample</div>
}

export default AdminExample
