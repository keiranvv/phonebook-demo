import React from 'react'
import Modal from 'react-modal'
import { modalStyles } from '../theme/modal'

const DeletePhoneBookModal = ({ isOpen, onRequestClose, onDelete }) => {
	return (
		<Modal ariaHideApp={false} onRequestClose={onRequestClose} style={modalStyles} isOpen={isOpen}>
			<h2 className="mb-4 font-semibold text-lg">Delete Phone Book</h2>
			<div className="mb-4">Are you sure you want to delete this phone book?</div>
			<div className="flex">
				<button onClick={onRequestClose} className=" flex-1 px-4 py-2 mt-4 bg-gray-500 rounded text-white text-sm font-semibold hover:bg-gray-700">
					Cancel
					</button>
				<button onClick={onDelete} className="flex-1 ml-4 px-4 py-2 mt-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">
					Delete Phone Book
				</button>
			</div>
		</Modal>
	)
}

export default DeletePhoneBookModal
