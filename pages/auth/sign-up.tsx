import React from 'react'
import { BASE_URL } from '../../shared/constants'
import { APIMethods, CredentialedSignUp } from '../../shared/types'

const SignUp = () => {
	const firstName = React.createRef<HTMLInputElement>()
	const lastName = React.createRef<HTMLInputElement>()
	const email = React.createRef<HTMLInputElement>()
	const password = React.createRef<HTMLInputElement>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const credentials: CredentialedSignUp = {
			firstName: firstName.current!.value,
			lastName: lastName.current!.value,
			email: email.current!.value,
			password: password.current!.value
		}

		console.log(JSON.stringify(credentials))
		const response = await fetch(`/api/custom-auth/sign-up`, {
			method: APIMethods.POST,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		console.log('here')
		const result = await response.json()
		console.log('result', result)
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
			</form>
		</div>
	)
}

export default SignUp
