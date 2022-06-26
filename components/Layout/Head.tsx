import Head from 'next/head'

export type MetaContent = {
	name: string
	content: string
}

type Props = {
	title: string
	metaContent: MetaContent
}

// TODO: Expand as SEO knowledge grows
const CustomHead = ({ title, metaContent }: Props) => (
	<Head>
		<title>{title}</title>
		<meta name={metaContent.name} content={metaContent.content} />
	</Head>
)

export default CustomHead
