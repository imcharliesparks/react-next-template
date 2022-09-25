import * as React from 'react'
import { Card } from '../../../components/general/Card'
import { IEntity } from '../../../models/Entity'
import { getAllEntities } from '../../api/entity/allEntities'

type Props = {
	entities: IEntity[]
}

const AllEntities = ({ entities }: Props) => {
	console.log('entities', entities)
	return (
		<div className="container mx-auto flex flex-col">
			{entities.map((entity: IEntity) => (
				<Card
					key={entity._id}
					title={entity.key}
					content={entity.value}
					cardButtons={[
						{
							text: 'Action',
							action: () => console.log('here')
						}
					]}
				/>
			))}
		</div>
	)
}

export default AllEntities

export const getServerSideProps = async () => {
	const entities = await getAllEntities()
	return {
		props: {
			entities: JSON.parse(JSON.stringify(entities))
		}
	}
}
