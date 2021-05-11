import React from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions/index'
import MoviesSelector from './components/MoviesDropdown'
import MoviesTable from './components/MoviesTable'
import { connect } from "react-redux"
import { List } from 'immutable'
import { TableMovies } from '../store/types'


const mapStateToProps = state => {
	return {
		allMovies: state.titles,
		visibleMovies: state.watchList
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getMovie: dispatch(actions.getMovies()),
		getWatchList: dispatch(actions.getWatchList()),
		updateMovie: movie => dispatch(actions.updateMovieWatchList(movie)),
	}
}

function ProductsTableWrapper({ allMovies, visibleMovies } ) {
	const dispatch = useDispatch()

	const updateWatchList = (visibleMovies: List<TableMovies>) =>  (
		dispatch(actions.updateMovieWatchList(visibleMovies))
	)

	return (
		<>
			<div className="page-header">
				Filmy, které musím vidět
				{!visibleMovies.size ? (
					<p>
						Vítejte ve správci oblíbených filmů. Ze seznamu si můžete vybrat,
						ty na které se budete chtít někdy podívat
					</p>
				) : null}
			</div>
			<MoviesSelector
				allMovies={allMovies}
				updateWatchList={updateWatchList}
				visibleMovies={visibleMovies}

			/>
			{visibleMovies.size ? (
				<MoviesTable
					visibleMovies={visibleMovies}
					updateWatchList={updateWatchList}
				/>
			) : null}
		</>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTableWrapper)
