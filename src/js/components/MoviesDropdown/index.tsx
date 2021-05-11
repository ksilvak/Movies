import React, { useState } from 'react'
import { TableMovies } from '../../../store/types'
import ElementsFilter from './ElementsFilter'
import ElementsList from './ElementsList'
import { List } from 'immutable'
import Dropdown from '../Dropdown'


interface Props {
	allMovies: List<TableMovies>
	visibleMovies: List<TableMovies>
	updateWatchList: (movies: List<TableMovies>) => void
}


export default function MoviesDropdown({
	visibleMovies,
	allMovies,
	updateWatchList,
}: Props) {
	const [filter, setFilter] = useState('')

	const selectedMovies = allMovies.filter((element) => (
		element.name.toUpperCase().includes(filter.toUpperCase())
	))

	const handleMovieRemove = () => (
		updateWatchList(visibleMovies.filter((visibleMovie) => !(
			visibleMovie
		)))
	)

	const handleAllMoviesSelected = () => (
		updateWatchList(allMovies)
	)

	return (
		<div className="movies-selector">
			<Dropdown
				autoClose={false}
				labelClassName="positive-button big-button"
				label="Přidat film"
			>
				<>
					<div className="movies-selector-header">
						<ElementsFilter
							filter={filter}
							handleChange={setFilter}
						/>
						{!visibleMovies.equals(allMovies) ? (
							<button
								className="positive-button"
								onClick={(event) =>  {
									event.stopPropagation()
									handleAllMoviesSelected()
								}}
								children="Vybrat vše"
							/>
						): null}
						{visibleMovies.size ? (
							<button
								className="negative-button"
								onClick={(event) => {
									event.stopPropagation()
									handleMovieRemove()
								}}
								children="Zrušit výběr"
							/>
						): null}
					</div>
					<ElementsList
						selectedMovies={selectedMovies}
						updateWatchList={updateWatchList}
						visibleMovies={visibleMovies}
					/>
				</>
			</Dropdown>
		</div>
	)
}
