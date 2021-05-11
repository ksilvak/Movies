import React from 'react'
import close from '../../../../icons/close.svg'
import reorder from '../../../../icons/reorder.svg'
import { TableMovies } from '../../../../store/types'


interface Props {
	index: number
	column: TableMovies
	provided: any
	handleMovieRemove: (movie: TableMovies) => void
}


export default function ActionColumn({
	index,
	column,
	provided,
	handleMovieRemove,
}: Props) {

	return (
		<td
			key={index}
			className="action-column"
		>
			<a
				onClick={() => handleMovieRemove(column)}
				title="Přesunout"
				{...provided.dragHandleProps}
			>
				<img
					src={reorder}
					className="drag-handle"
					alt="Přesunout"
				/>
			</a>
			<a
				onClick={() => handleMovieRemove(column)}
				title="Odstranit"
			>
				<img
					src={close}
					className="remove-movie"
					alt="Odstranit"
				/>
			</a>
		</td>
	)
}
