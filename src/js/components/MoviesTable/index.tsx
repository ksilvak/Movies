import React from 'react'
import { List } from 'immutable'
import { TableMovies } from '../../../store/types'
import { removeMovie } from '../../../store/utils'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TableBody from './components'


interface Props {
	visibleMovies: List<TableMovies>
	updateWatchList: (movies: List<TableMovies>) => void
}


export default function MoviesTable({
	visibleMovies,
	updateWatchList,
}: Props) {
	const header = ['Název filmu', 'Žánr', 'Hodnocení']

	const handleMovieRemove = (movie: TableMovies) => (
		updateWatchList(removeMovie(movie, visibleMovies))
	)

	const onDragEnd = (result) => {
		const { destination, source } = result

		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.idex
		) {
			return
		}

		updateWatchList(
			visibleMovies.splice(result.source.index, 1)
				.splice(result.destination.index, 0, visibleMovies.get(result.source.index))
		)
	}

	return (
		<DragDropContext
			onDragEnd={onDragEnd}
		>
			<Droppable
				droppableId="droppable"
				direction="vertical"
			>
				{(provided) => (
					<table
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<thead>
							<tr>
								<th>
									Akce
								</th>
								{header.map((title, index) => (
									<th key={index}>
										{title}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<TableBody
								visibleMovies={visibleMovies}
								handleMovieRemove={handleMovieRemove}
							/>
						{provided.placeholder}
						</tbody>
					</table>
				)}
			</Droppable>
		</DragDropContext>
	)
}
