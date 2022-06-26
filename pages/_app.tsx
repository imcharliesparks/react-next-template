import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ErrorBoundary>
	)
}

export default MyApp
