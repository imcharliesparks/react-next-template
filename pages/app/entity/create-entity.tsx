import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '../../../components/general/Loading'
import CustomHead from '../../../components/Layout/Head'
import { APIMethods, NextAuthStatues } from '../../../shared/types'

const CreateEntity = () => {
	const router = useRouter()
	const { status } = useSession()
	const key = React.createRef<HTMLInputElement>()

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		// TODO: Properly handle errors in UI
		e.preventDefault()
		try {
			const entity = { key: key.current!.value.trim() }
			const response = await fetch(`/api/entity/create`, {
				method: APIMethods.POST,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ entity })
			})
			await response.json()
			if (response.status === 201) {
				alert('Entity created!')
				router.push('/')
			} else {
				throw new Error('Entity creation failed!')
			}
		} catch (e) {
			console.error(e)
			alert(`We couldn't create an entity!`)
		}
	}

	return status === NextAuthStatues.LOADING ? (
		<Loading />
	) : (
		<>
			<CustomHead title="Create Entity" metaContent={{ name: 'create-entity', content: 'Create a new data entity!' }} />
			<div className="flex h-screen justify-center">
				<div className="max-w-xs">
					<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-14 md:mt-72" onSubmit={submit}>
						<p className="text-2xl text-center mb-2">Sign In</p>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
								Key
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="key"
								type="text"
								placeholder="key"
								ref={key}
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Create
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

export default CreateEntity
