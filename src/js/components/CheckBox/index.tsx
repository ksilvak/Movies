import React from 'react'


interface Props {
	checked: boolean
	name?: string
	disabled?: boolean
	invert?: boolean
	onChange: (checked: boolean) => void
}


const Checkbox = ({
	checked,
	name,
	disabled,
	invert,
	onChange,
}: Props) => {
	const inputClass = 'keep-native' + (invert ? ' invert' : '')

	const handleChange = (event: any) => {
		onChange(event.target.checked)
	}

	return (
		<div className="styled-input">
			<input
				type="checkbox"
				name={name}
				className={inputClass}
				checked={checked}
				disabled={disabled}
				onChange={handleChange}
			/>
			<i className="input-checkbox" />
		</div>
	)
}

export default Checkbox
