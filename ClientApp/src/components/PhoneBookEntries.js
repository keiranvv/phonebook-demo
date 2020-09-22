import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { deletePhoneBook, getPhoneBookById, savePhoneBook, searchPhoneBookEntries } from '../services/apiService'
import AddEntryModal from './AddEntryModal'
import DeletePhoneBookModal from './DeletePhoneBookModal'

const PhoneBookEntries = () => {
	const [phoneBook, setPhoneBook] = useState(null)
	const [isFetching, setIsFetching] = useState(true)
	const [showAddEntry, setShowAddEntry] = useState(false)
	const [showDeletePhoneBook, setShowDeletePhoneBook] = useState(false)
	const [addEntryError, setAddEntryError] = useState(false)
	const [query, setQuery] = useState('')
	const { phoneBookId } = useParams()
	const history = useHistory()

	useEffect(
		() => {
			const fetchPhoneBook = async () => {
				const response = await getPhoneBookById(phoneBookId)

				if (response.status === 200) {
					setPhoneBook(response.data)
				} else {

				}

				setIsFetching(false)
			}

			fetchPhoneBook()
		},
		[phoneBookId],
	)

	const renderItems = useMemo(
		() => () => {
			if (phoneBook.entries.length === 0) {
				return (
					<>
						No contacts added yet.
					</>
				)
			}

			return (
				<div className="grid md:grid-cols-3 md:gap-4">
					{phoneBook.entries.map((entry, ix) => (
						<div key={ix.toString()} className="rounded mt-2 bg-white shadow-sm p-4 md:mt-0">
							<div className="font-semibold">{entry.name}</div>
							<div>{entry.phoneNumber}</div>
						</div>
					))}
				</div>
			)
		},
		[phoneBook]
	)

	const handleNewContactSave = useCallback(
		async ({ name, phoneNumber }) => {
			const p = {
				...phoneBook,
				entries: [...phoneBook.entries, { name, phoneNumber }]
			}

			const response = await savePhoneBook(p)

			if (response.status === 200) {
				setPhoneBook(response.data)
				setShowAddEntry(false)
			} else {
				setAddEntryError(Object.values(response.data.errors)[0][0])
			}

		},
		[phoneBook]
	)

	const handlePhoneBookDelete = useCallback(
		async () => {
			const response = await deletePhoneBook(phoneBookId)

			if (response.status === 200) {
				history.push('/')
			} else {
				console.log(response.data)
			}
		},
		[history, phoneBookId],
	)

	const handleAddContactCancel = useCallback(
		() => {
			setShowAddEntry(false)
		},
		[]
	)

	const handleSearchClick = useCallback(
		async () => {
			if (query.trim() === '') {
				const response = await getPhoneBookById(phoneBookId)

				if (response.status === 200) {
					setPhoneBook(response.data)
				} else {
					console.log(response.data)
				}
			} else {
				const response = await searchPhoneBookEntries(phoneBookId, query)

				if (response.status === 200) {
					const p = {
						...phoneBook,
						entries: response.data,
					}
					setPhoneBook(p)
				} else {
					console.log(response.data)
				}
			}
		},
		[phoneBook, phoneBookId, query],
	)

	const handleSearchKeyDown = useCallback(
		async (e) => {
			if (e.which === 13) {
				handleSearchClick()
			}
		},
		[phoneBook, phoneBookId, query]
	)

	if (isFetching) {
		return (
			<>
				Loading...
			</>
		)
	}

	return (
		<>
			<div className="flex justify-between items-center pb-2 mb-4 border-b border-gray-300">
				<div className="font-bold text-lg">
					<Link className="hover:text-pink-500 hover:underline" to="/">
						Phone Books
					</Link>
					&nbsp;/&nbsp;
					{phoneBook.name}
				</div>
				<div className="flex">
					<button onClick={() => { setShowDeletePhoneBook(true) }} className="px-4 py-2 mr-2 bg-gray-500 rounded text-white text-sm font-semibold hover:bg-gray-700">Delete</button>
					<button onClick={() => { setShowAddEntry(true) }} className="px-4 py-2 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">Add Contact</button>
				</div>
			</div>
			<div className="mb-4 flex items-center">
				<input onKeyDown={handleSearchKeyDown} className="p-4 font-bold rounded bg-gray-200 text-sm w-full" type="text" placeholder="Search..." value={query} onChange={(e) => { setQuery(e.target.value) }} />
				<button onClick={handleSearchClick} className="ml-4 px-6 py-4 bg-pink-500 rounded text-white text-sm font-semibold hover:bg-pink-700">Search</button>
			</div>
			{renderItems()}
			<AddEntryModal errorMessage={addEntryError} isOpen={showAddEntry} onRequestClose={handleAddContactCancel} onSave={handleNewContactSave} />
			<DeletePhoneBookModal isOpen={showDeletePhoneBook} onRequestClose={() => { setShowDeletePhoneBook(false) }} onDelete={handlePhoneBookDelete} />
		</>
	)
}

export default PhoneBookEntries
