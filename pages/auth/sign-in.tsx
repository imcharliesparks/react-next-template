import React from 'react'
import { CredentialedSignIn } from '../../shared/types'
import { signIn, SignInResponse } from 'next-auth/react'
import CustomHead from '../../components/Layout/Head'
import { useRouter } from 'next/router'

const SignIn = () => {
	const email = React.createRef<HTMLInputElement>()
	const password = React.createRef<HTMLInputElement>()
	const router = useRouter()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		// TODO: Properly handle errors in UI
		e.preventDefault()
		try {
			const credentials: CredentialedSignIn = {
				email: email.current!.value,
				password: password.current!.value
			}
			const response: SignInResponse | undefined = await signIn('credentials', { redirect: false, ...credentials })

			if (response?.error || !response) {
				throw new Error(response?.error ?? 'There was an undefined error signing in')
			} else {
				router.push('/')
			}
		} catch (e) {
			console.error(e)
			alert(`We couldn't sign you in!`)
		}
	}

	return (
		<>
			<CustomHead title="Sign in" metaContent={{ name: 'signin', content: 'Sign in to the site' }} />
			<div className="flex h-screen justify-center">
				<div className="max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-14 md:mt-72" onSubmit={submit}>
						<p className="text-2xl text-center mb-2">Sign In</p>
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
							{/* TODO: Implement forgot password */}
							{/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
							Forgot Password?
						</a> */}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default SignIn
