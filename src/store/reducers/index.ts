import {List } from 'immutable'
import { TableMovies } from '../types'
import { ACTIONS } from '../actions/index'


const initialState = {
	titles: List<TableMovies>(),
	watchList: List<TableMovies>()
}

function rootReducer(state = initialState, action) {
	if (action.type === ACTIONS.MOVIE_LOADED) {
		return Object.assign({}, state, {
			titles: state.titles.concat(action.payload)
		})
	}

	if (action.type === ACTIONS.WATCHLIST_LOADED) {
		return Object.assign({}, state, {
			watchList: state.watchList.concat(action.payload)
		})
	}

	if (action.type === ACTIONS.UPDATE_MOVIES) {
		return Object.assign({}, state, {
			watchList: action.payload
		})
	}

	return state
}

export default rootReducer
