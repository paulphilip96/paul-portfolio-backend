//server imports
const { pool } = require('./config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

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

//get message
const getContact = (request, response) => {
	response.status(200).send("something");
}

//add message
const contact = (request, response) => {
	var {name, contact, message} = request.body;
	const emailList = ['paulphilip290996@gmail.com', 'paulphiliperrors@gmail.com'];

	if (!name.replace(/\s/g, "").length) {
		name = "No Name Was Provided";
	}

	if (!message.replace(/\s/g, "").length) {
		message = "No Message Was Provided";
	}

	if (!contact.replace(/\s/g, "").length) {
		contact = "No Contact Information Was Provided";
	}

	sgMail.setApiKey('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')
	const msg = {
		to: emailList,
		from: 'paulphilipportfolio@mail.com',
		subject: 'Mesage from Contact Page on Website!',
		text: `<p>Name of Sender: ${name}<p/><p>Contact Information: ${contact}<p/><p><strong>Message:</strong><br/>${message}</p>`,
		html: `<p>Name of Sender: ${name}<p/><p>Contact Information: ${contact}<p/><p><strong>Message:</strong><br/>${message}</p>`,
	}

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
		})
		.catch((error) => {
			console.error(error)
	})
	response.status(201).json({status: "success", message: "Sent"});
}

//construct routes
app.listen(port, () => {
	console.log('Server Listening');
})
app.route('/users').get(getUsers).post(addUser);
app.route('/duplicate/:name').get(checkDuplicates);
app.route('/rank/:name').get(getRank);
app.route('/message').get(getContact).post(contact);
