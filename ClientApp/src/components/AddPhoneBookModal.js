import React, { useCallback, useState } from 'react'
import Modal from 'react-modal'
import { modalStyles } from '../theme/modal'

const AddPhoneBookModal = ({ isOpen, onRequestClose, onSave }) => {
	const [name, setName] = useState('')

	const handleSaveClick = useCallback(
		() => {
			if (onSave) {
				onSave({ name })
			}

			setName('')
		},
		[name, onSave],
	)

	const handleRequestClose = useCallback(
		() => {
			if (onRequestClose) {
				onRequestClose()
				setName('')
			}
		},
		[onRequestClose],
	)

	return (
		<Modal ariaHideApp={false} onRequestClose={handleRequestClose} style={modalStyles} isOpen={isOpen}>
			<h2 className="mb-4 font-semibold text-lg">Create phonebook</h2>
			<div className="mb-4 flex flex-col">
				<input className="p-2 rounded bg-gray-200" type="text" placeholder="Phone book name" value={name} onChange={(e) => { setName(e.target.value) }} />
			</div>
			<div className="flex">
				<button onClick={handleRequestClose} className="flex-1 px-4 py-2 mt-4 bg-gray-500 rounded text-white text-sm font-semibold hover:bg-gray-700">
					Cancel
					</button>
				<button onClick={handleSaveClick} className="flex-1 ml-4 px-4 py-2 mt-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">
					Save
					</button>
			</div>
		</Modal>
	)
}

export default AddPhoneBookModal
