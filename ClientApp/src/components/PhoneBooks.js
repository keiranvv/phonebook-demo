import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { getPhoneBooks, savePhoneBook } from '../services/apiService'
import AddPhoneBookModal from './AddPhoneBookModal'

const PhoneBookList = () => {
	const [phoneBooks, setPhoneBooks] = useState([])
	const [isFetching, setIsFetching] = useState(true)
	const [addPhoneBookError, setAddPhoneBookError] = useState('')
	const [showAddPhoneBookModal, setShowAddPhoneBookModal] = useState(false)
	const history = useHistory()

	useEffect(
		() => {
			const fetchPhoneBooks = async () => {
				setIsFetching(true)

				const response = await getPhoneBooks()

				if (response.status === 200) {
					setPhoneBooks(response.data)
				} else {
					alert(response.data)
				}

				setIsFetching(false)
			}

			fetchPhoneBooks()
		},
		[],
	)

	const handleSaveClick = useCallback(
		async ({ name }) => {
			const response = await savePhoneBook({ name })

			if (response.status === 200) {
				history.push(`/phonebooks/${response.data.id}`)
			} else {
				setAddPhoneBookError(Object.values(response.data.errors)[0][0])
			}
		},
		[history],
	)

	if (isFetching) {
		return (
			<div>
				<div role="status">
					Loading...
				</div>
			</div>
		)
	}

	if (phoneBooks.length === 0) {
		return (
			<div className="max-w-lg mt-10 mx-auto my-auto">
				<h1 className="font-bold text-4xl text-gray-800">
					Looks like you have no friends
				</h1>
				<div className="my-4 text-gray-600">
					Get some imaginary friends by creating a new virtual phone book.
				</div>
				<button onClick={() => { setShowAddPhoneBookModal(true) }} className="px-4 py-2 mt-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">New phonebook</button>
				<AddPhoneBookModal isOpen={showAddPhoneBookModal} onSave={handleSaveClick} onRequestClose={() => { setShowAddPhoneBookModal(false) }} />
			</div>
		)
	}

	return (
		<>
			{
				phoneBooks.map((phoneBook) => (
					<Link key={phoneBook.id.toString()} to={`/phonebooks/${phoneBook.id}`}>
						<div className="border-b border-gray-300 py-2 hover:bg-gray-300">
							<div className="font-semibold">{phoneBook.name}</div>
							<div className="text-sm text-gray-500">{phoneBook.entries.length} entries</div>
						</div>
					</Link>
				))
			}
			<button onClick={() => { setShowAddPhoneBookModal(true) }} className="px-4 py-2 mt-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">New phonebook</button>
			<AddPhoneBookModal errorMessage={addPhoneBookError} isOpen={showAddPhoneBookModal} onSave={handleSaveClick} onRequestClose={() => { setShowAddPhoneBookModal(false) }} />
		</>
	)
}

export default PhoneBookList
