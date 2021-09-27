//server imports
const { pool } = require('./config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//server declaration
const port = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//API
//view table
const getUsers = (request, response) => {
	pool.query('SELECT * FROM ppdb ORDER BY score DESC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	})
}

//check duplicates
const checkDuplicates = (request, response) => {
	pool.query(`SELECT EXISTS(SELECT * FROM ppdb WHERE LOWER(name) = LOWER('${request.params.name}'))`, (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(results.rows[0].exists)
	})
}

//add user
const addUser = (request, response) => {
	const {name, score} = request.body;
	pool.query('INSERT INTO ppdb (name, score) VALUES ($1, $2)', [name, score], (error) => {
		if (error) {
			response.status(200).json("failed")
			throw error
		}
		response.status(201).json({status: "success", message: "User Added"})
	})
}

//get user ranking
const getRank = (request, response) => {
	pool.query(`SELECT rank.* FROM (SELECT id, name, score, RANK () OVER (ORDER BY score DESC) FROM ppdb) rank WHERE name = '${request.params.name}'`, (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(results.rows[0]);
	})
}

//contact API
const contact = (request, response) => {
	pool.query('SELECT * FROM ppdb ORDER BY score DESC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json("Test Success");
	})
}

//construct routes
app.listen(port, () => {
	console.log('Server Listening');
})
app.route('/users').get(getUsers).post(addUser);
app.route('/duplicate/:name').get(checkDuplicates);
app.route('/rank/:name').get(getRank);
app.route('/contact').get(contact);
