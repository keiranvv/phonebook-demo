import React, { useCallback, useState } from 'react'
import Modal from 'react-modal'

import { modalStyles } from '../theme/modal'

const AddEntryModal = ({ isOpen, onRequestClose, onSave }) => {
	const [name, setName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const handleSaveClick = useCallback(
		() => {
			if (onSave) {
				onSave({ name, phoneNumber })
			}

			setName('')
			setPhoneNumber('')
		},
		[name, onSave, phoneNumber],
	)

	const handleRequestClose = useCallback(
		() => {
			if (onRequestClose) {
				onRequestClose()
				setName('')
				setPhoneNumber('')
			}
		},
		[onRequestClose],
	)

	return (
		<Modal ariaHideApp={false} onRequestClose={handleRequestClose} style={modalStyles} isOpen={isOpen}>
			<h2 className="mb-4 font-semibold text-lg">Add Contact</h2>
			<div className="mb-4 flex flex-col">
				<input className="p-2 rounded bg-gray-200" type="text" placeholder="Full name(s)" value={name} onChange={(e) => { setName(e.target.value) }} />
				<input className="p-2 mt-2 rounded bg-gray-200" type="phone" placeholder="Phone Number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
			</div>
			<div className="flex">
				<button onClick={handleRequestClose} className=" flex-1 px-4 py-2 mt-4 bg-gray-500 rounded text-white text-sm font-semibold hover:bg-gray-700">
					Cancel
					</button>
				<button onClick={handleSaveClick} className="flex-1 ml-4 px-4 py-2 mt-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">
					Add Contact
				</button>
			</div>
		</Modal>
	)
}

export default AddEntryModal
