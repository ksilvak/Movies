import React from 'react'
import { List } from 'immutable'
import { TableMovies } from '../../../../store/types'
import ActionColumn from './ActionColumn'
import { Draggable } from 'react-beautiful-dnd'


interface Props {
	visibleMovies: List<TableMovies>
	handleMovieRemove: (movie: TableMovies) => void
}


export default function TableBody({
	visibleMovies,
	handleMovieRemove,
}: Props) {

	return (
		<>
			{visibleMovies.map((column, index) => (
				<Draggable
					draggableId={String(index)}
					index={index}
					key={index}
				>
					{(provided, snapshot) => (

						<tr
							ref={provided.innerRef}
							{...provided.draggableProps}
							className={snapshot.isDragging ? 'is-dragged' : ''}
						>
							<ActionColumn
								index={index}
								column={column}
								provided={provided}
								handleMovieRemove={handleMovieRemove}
							/>
							<td
								key={column.name}
								title={column.name}
								className="movie-name"
							>
								{column.name}
							</td>
							<td
								key={`${column.name} ${column.genre}`}
								title={column.genre}
								className="movie-genre"
							>
								{column.genre}
							</td>
							<td
								key={`${column.name} ${column.rating}`}
								title={column.rating}
								className="movie-rating"
							>
								{column.rating}
							</td>
						</tr>
					)}
				</Draggable>
			))}
		</>
	)
}
