//Database imports
const { pool } = require('../../config.js')

//Function imports
const { getFormattedDate } = require('../Helper/index.js')

//General
const tableName = "typing_test_high_scores"
let errorTemplate = {
	error: "Database Error",
	function: "",
	errorInfo: "",
	query: "",
	timestamp: ""
}

//View table
const getUsers = (request, response) => {
	const query = `SELECT * FROM ${tableName} ORDER BY score DESC`
	pool.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "getUsers",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - getUsers", error)
			response.status(400).json([errorBlob])
		}
		else response.status(200).json([results.rows])
	})
}

//Check duplicates
const checkDuplicates = (request, response) => {
	const query = `SELECT EXISTS(SELECT * FROM ${tableName} WHERE LOWER(name) = LOWER('${request.params.name}'))`
	pool.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "checkDuplicates",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - checkDuplicates", error)
			response.status(400).json([errorBlob])		
		}
		else response.status(200).json([results.rows[0].exists])
	})
}

//Add user
const addUser = (request, response) => {
	const {name, score} = request.body;
	const query = `INSERT INTO ${tableName} (name, score) VALUES ($1, $2)`
	pool.query(query, [name, score], (error) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "addUser",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - addUser", error)
			response.status(400).json([errorBlob])	
		}
		else {
			const responseBlob = { message: "User Added"}
			response.status(201).json([responseBlob])
		}
	})
}

//Get user ranking
const getRank = (request, response) => {
	const query = `SELECT rank.* FROM (SELECT id, name, score, RANK () OVER (ORDER BY score DESC) FROM ppdb) rank WHERE name = '${request.params.name}'`
	pool.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "getRank",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - addUser", error)
			response.status(400).json([errorBlob])			
		}
		else response.status(200).json([results.rows[0]])
	})
}

module.exports = {
    getUsers,
    checkDuplicates,
    addUser,
    getRank,
}