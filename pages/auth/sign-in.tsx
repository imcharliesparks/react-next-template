import React from 'react'
import { APIMethods, CredentialedSignIn } from '../../shared/types'
import { signIn } from 'next-auth/react'

const SignUp = () => {
	const firstName = React.createRef<HTMLInputElement>()
	const lastName = React.createRef<HTMLInputElement>()
	const email = React.createRef<HTMLInputElement>()
	const password = React.createRef<HTMLInputElement>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// TODO: Need validation and style
		const credentials: CredentialedSignIn = {
			email: email.current!.value,
			password: password.current!.value
		}

		signIn()
		// const response = await fetch(`/api/auth/sign-in/email`, {
		// 	method: APIMethods.POST,
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(credentials)
		// })
		// const result = await response.json()
	}

	return (
		<div
			style={{
				width: '80%',
				maxWidth: 400,
				margin: '10% auto'
			}}
		>
			<form onSubmit={submit} action="post">
				<h1>Sign In</h1>
				<input placeholder="Email" type="text" ref={email} />
				<input placeholder="Password" type="password" ref={password} />
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}

export default SignUp
