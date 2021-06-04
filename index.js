//server imports
const { pool } = require('./config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//server declaration
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//API
//view table
const getUsers = (request, response) => {
	pool.query('SELECT * FROM ppdb', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	})
}

//sort and get top5users

//add user

//get user ranking
//--sort and get placing serverside

//construct routes
app.listen(3002, () => {
	console.log('Server Listening');
})
app.route('/users').get(getUsers)