import React from 'react'
import { CredentialedSignIn } from '../../shared/types'
import { signIn } from 'next-auth/react'

const SignIn = () => {
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

			const response = await signIn('credentials', { redirect: false, ...credentials })
			if (response?.error || !response) {
				throw new Error(response?.error ?? 'There was an undefined error signing in')
			} else {
				alert('Successfully signed in')
			}
		} catch (e) {
			console.error(e)
			alert(`We couldn't sign you in!`)
		}
	}

	return (
		<div className="flex h-screen justify-center">
			<div className="max-w-xs">
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-14 md:mt-72" onSubmit={submit}>
					<p className="text-2xl text-center mb-2">Sign In</p>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
							ref={email}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
							ref={password}
						/>
						{/* <p className="text-red-500 text-xs italic">Please enter a password.</p> */}
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Sign In
						</button>
						{/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
							Forgot Password?
						</a> */}
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignIn