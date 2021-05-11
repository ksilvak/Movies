import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import classnames from 'classnames'


interface Props {
	anchor?: 'left' | 'right'
	label: JSX.Element | string
	children: JSX.Element
	dropdownClassName?: string
	labelClassName?: string
	itemsClassName?: string
	autoClose?: boolean
	isDisabled?: boolean
	onOpen?: () => void
	onClose?: () => void
}

export interface DropdownMethods {
	close: () => void
}


export default forwardRef(function Dropdown({
	anchor = 'left',
	label,
	children,
	dropdownClassName,
	labelClassName = 'button white',
	itemsClassName,
	autoClose,
	isDisabled,
	onOpen,
	onClose,
}: Props, ref: React.Ref<DropdownMethods>) {
	const dropdownRef = useRef<any>()
	const [isOpen, setIsOpen] = useState(false)

	const dropdownClass = classnames('react-dropdown', dropdownClassName, anchor, {
		open: isOpen,
	})

	const handleDocumentClick = (event: MouseEvent) => {
		if (!dropdownRef.current) {
			return
		}

		const clickedElement = event.target as HTMLElement
		const contains = dropdownRef.current.contains(clickedElement)
		const same = dropdownRef.current.isSameNode(clickedElement)

		const clickedInside = contains || same
		const keepOpen = autoClose === false

		if (!(clickedInside && keepOpen)) {
			close()
		}
	}

	const open = () => {
		// Add event listener to document click, so we can close this
		// dropdown by clicking everywhere else. This listener is removed
		// when dropdown is closed and then possilby readded again.
		// This is done for performance reasons. There can be potentially
		// hundreds of dropdowns on page and we don't want to register one
		// document click listener for every one of them.
		document.addEventListener('click', handleDocumentClick)

		setIsOpen(true)
		onOpen && onOpen()
	}

	const close = () => {
		// See open() function.
		document.removeEventListener('click', handleDocumentClick, true)
		document.removeEventListener('click', handleDocumentClick, false)

		setIsOpen(false)
		onClose && onClose()
	}

	useImperativeHandle(ref, () => ({
		close,
	}))

	return (
		<div ref={dropdownRef} className={dropdownClass}>
			<button
				type="button"
				className={labelClassName}
				onClick={isOpen ? close : open}
				disabled={isDisabled}
				children={label}
			/>
			{isOpen && (
				<div
					style={{display: 'block'}} /* There is non-react dropdown */
					className={classnames('dropdown-items', itemsClassName)}
					children={children}
				/>
			)}
		</div>
	)
})
