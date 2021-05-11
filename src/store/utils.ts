import { TableMovies } from './types'
import { List } from 'immutable'


export const isMovieSelected = (movie: TableMovies, visibleMovies: List<TableMovies>): boolean => (
	!!visibleMovies.find((visibleMovie) => (
		visibleMovie.name === movie.name
	))
)

export const removeMovie = (movie: TableMovies, visibleMovies: List<TableMovies>) => (
	visibleMovies.filter((visibleMovie) => (
		visibleMovie !== movie
	))
)
