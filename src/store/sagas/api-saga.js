import { takeEvery,call, put } from "redux-saga/effects"
import { ACTIONS } from '../actions/index'


export default function* watcherSaga() {
	yield takeEvery(ACTIONS.WATCHLIST_REQUESTED, workerSagaWatchList)
	yield takeEvery(ACTIONS.MOVIE_REQUESTED, workerSagaAllMovies)
}


function* workerSagaWatchList() {
	try {
		const payload = yield call(getWatchList)
		yield put({
			type: ACTIONS.WATCHLIST_LOADED,
			payload
		})
	} catch (e) {
		yield put({
			type: "API_ERRORED",
			payload: e
		})
	}
}

function getWatchList() {
	return fetch("https://my-json-server.typicode.com/ksilvak/Project/watchList").then(response =>
		response.json()
	)
}

function* workerSagaAllMovies() {
	try {
		const payload = yield call(getAllMovies)
		yield put({
			type: ACTIONS.MOVIE_LOADED,
			payload
		})
	} catch (e) {
		yield put({
			type: "API_ERRORED",
			payload: e
		})
	}
}

function getAllMovies() {
	return fetch("https://my-json-server.typicode.com/ksilvak/Project/titles").then(response =>
		response.json()
	)
}
