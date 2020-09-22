import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:5000'
})

const getPhoneBooks = () => api.get('/phonebook')
const getPhoneBookById = (id) => api.get(`phonebook/${id}`)
const savePhoneBook = (phoneBook) => api.post('phonebook', phoneBook)
const searchPhoneBookEntries = (id, query) => api.get(`phonebook/${id}/entries?query=${query}`)
const deletePhoneBook = (id) => api.delete(`phonebook/${id}`)

export {
	deletePhoneBook,
	getPhoneBookById,
	getPhoneBooks,
	savePhoneBook,
	searchPhoneBookEntries,
}
