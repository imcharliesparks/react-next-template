import React from 'react'
import { APIMethods, CredentialedSignUp } from '../../shared/types'
import CustomHead from '../../components/Layout/Head'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignUp = () => {
	const router = useRouter()
	const firstName = React.createRef<HTMLInputElement>()
	const lastName = React.createRef<HTMLInputElement>()
	const email = React.createRef<HTMLInputElement>()
	const password = React.createRef<HTMLInputElement>()
	const rePassword = React.createRef<HTMLInputElement>()

	// TODO: Handle errors in UI
	// TODO: Fix refresh on form submit
	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const credentials: CredentialedSignUp = {
				firstName: firstName.current!.value.trim(),
				lastName: lastName.current!.value.trim(),
				email: email.current!.value.trim(),
				password: password.current!.value.trim()
			}

			const response = await fetch(`/api/auth/sign-up`, {
				method: APIMethods.POST,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials)
			})
			await response.json()
			if (response.status === 201) {
				await signIn('credentials', { email: credentials.email, password: credentials.password })
				alert('Sign up successful!')
				router.push('/')
			} else {
				alert('Sign up failed!')
				throw new Error('Sign up failed!')
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			<CustomHead title="Sign Up" metaContent={{ name: 'signup', content: 'Sign up for the site' }} />
			<div className="flex h-screen justify-center">
				<div className="max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-14 md:mt-72" onSubmit={submit}>
						<p className="text-2xl text-center mb-2">Sign Up</p>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
								First Name
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="firstName"
								type="text"
								placeholder="John"
								ref={firstName}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
								Last Name
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="lastName"
								type="text"
								placeholder="Smith"
								ref={lastName}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
								Email
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="example@gmail.com"
								ref={email}
							/>
						</div>
						<div className="mb-4">
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
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="re-password">
								Re-Enter Password
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="re-password"
								type="password"
								placeholder="******************"
								ref={rePassword}
							/>
							{/* <p className="text-red-500 text-xs italic">Please enter a password.</p> */}
						</div>
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Sign Up
							</button>
							<Link href="/auth/sign-in">
								<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
									Sign In Instead
								</a>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default SignUp
