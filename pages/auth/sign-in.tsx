import React from 'react'
import { APIMethods, CredentialedSignIn } from '../../shared/types'
import { signIn } from 'next-auth/react'

const SignIn = () => {
	const firstName = React.createRef<HTMLInputElement>()
	const lastName = React.createRef<HTMLInputElement>()
	const email = React.createRef<HTMLInputElement>()
	const password = React.createRef<HTMLInputElement>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		// TODO: Properly authenticate user with Next sign-in
		e.preventDefault()
		try {
			const credentials: CredentialedSignIn = {
				email: email.current!.value,
				password: password.current!.value
			}

			const response = await fetch(`/api/custom-auth/sign-up`, {
				method: APIMethods.POST,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials)
			})
			await response.json()
			alert('Sign up successful!')
		} catch (e: any) {
			console.error(e)
		}
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
				<h1>Signup</h1>
				<input placeholder="First Name" type="text" ref={firstName} />
				<input placeholder="Last Name" type="text" ref={lastName} />
				<input placeholder="Email" type="text" ref={email} />
				<input placeholder="Password" type="password" ref={password} />
				<button type="submit">Submit</button>
				<button onClick={() => signIn()}>Sign In</button>
			</form>
		</div>
	)
}

export default SignIn
