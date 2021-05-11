import React from 'react'

interface Props {
	filter: string
	handleChange: (filter: string) => void
}


export default function ElementsFilter({
	filter,
	handleChange,
}: Props) {

	return (
		<div className="movies-filter">
			<input
				placeholder={'Hledat'}
				type="text"
				value={filter}
				onChange={(event) => {
					handleChange(event.target.value)
				}}
				autoFocus={true}
			/>
		</div>
	)
}
