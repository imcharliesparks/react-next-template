import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'
import AuthWrapper from '../components/Layout/AuthWrapper'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ErrorBoundary>
			<SessionProvider session={session}>
				<Layout>
					{
						// @ts-ignore
						Component.auth ? (
							<AuthWrapper>
								<Component {...pageProps} />
							</AuthWrapper>
						) : (
							<Component {...pageProps} />
						)
					}
				</Layout>
			</SessionProvider>
		</ErrorBoundary>
	)
}

export default MyApp
