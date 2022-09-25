import Image, { ImageProps } from 'next/image'
import * as React from 'react'
import { CardButton } from '../../shared/types'

type Props = {
	imageProps?: ImageProps
	title: string
	content: string
	cardButtons: CardButton[]
}

export const Card = ({ imageProps, title, content, cardButtons }: Props) => (
	<div className="max-w-sm rounded overflow-hidden shadow-lg">
		{imageProps && imageProps.src && (
			<Image className="w-full" {...imageProps} alt={imageProps.alt ?? 'No alt provided'} />
		)}
		<div className="px-6 py-4">
			<div className="font-bold text-xl mb-2">{title}</div>
			<p className="text-gray-700 text-base">{content}</p>
		</div>
		<div className="px-6 pt-4 pb-2">
			{cardButtons.map((cardButton: CardButton, i: number) => (
				<button key={`${cardButton.text}_${i}`} onClick={cardButton.action}>
					{cardButton.text}
				</button>
			))}
		</div>
	</div>
)
