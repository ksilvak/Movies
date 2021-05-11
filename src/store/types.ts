import { Record } from 'immutable'


export interface ITableMovies {
	name: string
	genre: string
	rating: string
}

export class TableMovies extends Record<ITableMovies>({
	name: '',
	genre: '',
	rating: ''
}) implements ITableMovies {}
