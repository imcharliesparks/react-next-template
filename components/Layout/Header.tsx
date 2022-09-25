import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { NextAuthStatues } from '../../shared/types'
import LoadingSpinner from '../general/LoadingSpinner'

const Header = () => {
	const { data: session, status } = useSession()
	const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		signOut()
	}

	// TODO: Add hamburger menu
	return (
		<header>
			<nav className="relative container mx-auto p-6">
				<div className="flex items-center justify-between">
					<div className="cursor-pointer pt-2 max-w-xs mx-auto md:mx-0">
						<Link href="/">
							<Image src={require('../../resources/sfs-logo.svg')} alt="The Sparks Full-Stack Logo" />
						</Link>
					</div>
					<div className="hidden lg:flex space-x-6">
						{session && status === NextAuthStatues.AUTHENTICATED ? (
							<>
								<Link href="/app/protected-page-example" className="hover:text-darkGrayishBlue transition-colors">
									<span className=" hover:text-darkGrayishBlue transition-colors cursor-pointer">Protected</span>
								</Link>
								<Link href="/app/entity/create-entity" className="hover:text-darkGrayishBlue transition-colors">
									<span className=" hover:text-darkGrayishBlue transition-colors cursor-pointer">Entities</span>
								</Link>
							</>
						) : (
							<>
								<Link href="/sign-in" className="hover:text-darkGrayishBlue transition-colors">
									<span className=" hover:text-darkGrayishBlue transition-colors cursor-pointer">Protected</span>
								</Link>
								<Link href="/sign-in">
									<span className=" hover:text-darkGrayishBlue transition-colors cursor-pointer">Entities</span>
								</Link>
							</>
						)}
					</div>
					<div className="flex flex-row">
						{status === NextAuthStatues.LOADING ? (
							<LoadingSpinner />
						) : session && status === NextAuthStatues.AUTHENTICATED ? (
							<button
								onClick={handleSignOut}
								className="hidden md:block bg-darkBlue px-6 py-2.5 rounded-full text-white baseline hover:bg-darkGrayishBlue transition-colors"
							>
								Sign out
							</button>
						) : (
							<>
								<Link href="/auth/sign-in">
									<span
										style={{ width: 106 }}
										className="cursor-pointer hidden md:block bg-darkBlue px-6 py-2.5 rounded-full text-white baseline hover:bg-darkGrayishBlue transition-colors text-center mr-2"
									>
										Sign In
									</span>
								</Link>
								<Link href="/auth/sign-up">
									<span
										style={{ width: 106 }}
										className="cursor-pointer hidden md:block bg-darkBlue px-6 py-2.5 rounded-full text-white baseline hover:bg-darkGrayishBlue transition-colors text-center"
									>
										Sign Up
									</span>
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
