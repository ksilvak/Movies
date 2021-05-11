export enum ACTIONS {
	MOVIE_REQUESTED = "MOVIE_REQUESTED",
	MOVIE_LOADED = "MOVIE_LOADED",
	UPDATE_MOVIES = "UPDATE_MOVIES",
	WATCHLIST_REQUESTED = "WATCHLIST_REQUESTED",
	WATCHLIST_LOADED = "WATCHLIST_LOADED",
}

export function getMovies() {
	return {
		type: ACTIONS.MOVIE_REQUESTED
	}
}

export function getWatchList() {
	return {
		type: ACTIONS.WATCHLIST_REQUESTED
	}
}
export function updateMovieWatchList(payload) {
	return {
		type: ACTIONS.UPDATE_MOVIES,
		payload
	}
}
