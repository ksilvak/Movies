import React from 'react'
import { TableMovies } from '../../../store/types'
import { isMovieSelected, removeMovie } from '../../../store/utils'
import { List } from 'immutable'
import Checkbox from '../CheckBox'


interface Props {
	selectedMovies?: List<TableMovies>
	visibleMovies: List<TableMovies>
	updateWatchList: (movies: List<TableMovies>) => void
}


export default function ElementsList({
	selectedMovies,
	visibleMovies,
	updateWatchList,
}: Props) {
	const handleMovieSelect = (checked: boolean, movie: TableMovies) => (
		checked ?
			updateWatchList(visibleMovies.push(movie)) :
			updateWatchList(removeMovie(movie, visibleMovies))
	)

	return (
		<>
			{selectedMovies.map((movie) => (
				<div
					key={movie.name}
					className="available-movie"
				>
					<div>
						{movie.name}
					</div>
					<Checkbox
						checked={isMovieSelected(movie, visibleMovies)}
						onChange={(checked) => handleMovieSelect(checked, movie)}
					/>
				</div>
			))}
		</>
	)
}
