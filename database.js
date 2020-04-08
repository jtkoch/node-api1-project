let users = [
	{ 
		id: "1", 
		name: "Michael Scott",
		bio: "Regional Manager of the Scranton, Pennsylvania branch of Dunder Mifflin."
	},
	{ 
		id: "2", 
		name: "Dwight Schrute",
		bio: "Assistant to the Regional Manager and Salesmen"
	},
	{ 
		id: "3", 
		name: "Jim Halpert",
		bio: "Salesmen and #2 after Michael." 
	},
	{
		id: "4",
		name: "Pam Halpert",
		bio: "Original secretary then moved onto sales and married to Jim."
	},
	{
		id: "5",
		name: "Andy Bernard",
		bio: "Cornell grad, Salesmen, and Singer"
	}
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: String(users.length + 1),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}
	
	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}