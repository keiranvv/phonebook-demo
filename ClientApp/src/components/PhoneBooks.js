import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { getPhoneBooks, savePhoneBook } from '../services/apiService'
import AddPhoneBookModal from './AddPhoneBookModal'

const PhoneBookList = () => {
	const [phoneBooks, setPhoneBooks] = useState([])
	const [isFetching, setIsFetching] = useState(true)
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
				alert(response.data)
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
			<AddPhoneBookModal isOpen={showAddPhoneBookModal} onSave={handleSaveClick} onRequestClose={() => { setShowAddPhoneBookModal(false) }} />
		</>
	)
}

export default PhoneBookList
