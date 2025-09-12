const { pool } = require('../../config.js')
const { getFormattedDate } = require('../Helper/index.js')


//General
const tableName = "typing_test_high_scores"

//View table
const getUsers = (_request, response) => {
	const query = `SELECT * FROM ${tableName} ORDER BY score DESC`
	pool.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				function: "getUsers()",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - getUsers()", errorBlob)
			return response.status(400).json(errorBlob);
		}
		else return response.status(200).json({ message: "High scores retrieved successfully", data: results.rows })
	})
}

//Add user
// Add user with duplicate check
const addUser = (request, response) => {
	const { name, score } = request.body;

	// Step 1: Check if user already exists
	const checkQuery = `SELECT EXISTS(SELECT 1 FROM ${tableName} WHERE LOWER(name) = LOWER($1))`;

	pool.query(checkQuery, [name], (checkError, checkResults) => {
		if (checkError) {
			const errorBlob = {
				function: "addUser() - check duplicates",
				errorInfo: checkError,
				query: checkQuery,
				timestamp: getFormattedDate()
			};
			console.log("Error - addUser() [check duplicates]", errorBlob);
			return response.status(400).json(errorBlob);
		}

		// If user already exists, return 409 Conflict
		if (checkResults.rows[0].exists) {
			return response.status(409).json({
				message: `User '${name}' already exists`
			});
		}

		// Step 2: Insert new user
		const insertQuery = `INSERT INTO ${tableName} (name, score) VALUES ($1, $2)`;
		pool.query(insertQuery, [name, score], (insertError) => {
			if (insertError) {
				const errorBlob = {
					function: "addUser() - insert",
					errorInfo: insertError,
					query: insertQuery,
					timestamp: getFormattedDate()
				};
				console.log("Error - addUser() [insert]", errorBlob);
				return response.status(400).json(errorBlob);
			}

			// Success
			return response
				.status(201)
				.json({ message: "User successfully added" });
		});
	});
};


//Get user ranking
const getRank = (request, response) => {
	const query = `
		SELECT rank.*
		FROM (
			SELECT id, name, score, RANK() OVER (ORDER BY score DESC)
			FROM ${tableName}
		) rank
		WHERE name = '${request.params.name}'
	`;

	pool.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				function: "getRank()",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			};
			console.log("Error - getRank()", errorBlob);
			return response.status(400).json({ errorBlob });
		}

		// No matching user found
		if (results.rows.length === 0) {
			return response.status(404).json({
				message: `User '${request.params.name}' not found`
			});
		}

		// User found
		return response.status(200).json({
			message: "User rank retrieved successfully",
			data: results.rows[0]
		});
	});
};


module.exports = {
	getUsers,
	addUser,
	getRank
}