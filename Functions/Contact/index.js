//General imports
const sgMail = require('@sendgrid/mail')
const { getFormattedDate } = require('../Helper/index.js')
require('dotenv').config();

//add message
const sendMessage = (request, response) => {
	let errorTemplate = {
		error: "Send Email Error",
		function: "sendMessage",
		errorInfo: "",
		timestamp: ""
	}

	var {name, contact, message} = request.body;
	const emailList = ['paulphilip290996@gmail.com'];

	if (!name.replace(/\s/g, "").length) {
		name = "No Name Was Provided";
	}

	if (!message.replace(/\s/g, "").length) {
		message = "No Message Was Provided";
	}

	if (!contact.replace(/\s/g, "").length) {
		contact = "No Contact Information Was Provided";
	}

	sgMail.setApiKey(process.env.SG_MAIL_API_KEY)
	const msg = {
		to: emailList,
		from: 'paulphiliperrors@gmail.com',
		subject: 'Mesage from Contact Page on Website!',
		text: `<p>Name of Sender: ${name}<p/><p>Contact Information: ${contact}<p/><p><strong>Message:</strong><br/>${message}</p>`,
		html: `<p>Name of Sender: ${name}<p/><p>Contact Information: ${contact}<p/><p><strong>Message:</strong><br/>${message}</p>`,
	}

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent')
			response.status(200).json([`Message Sent on ${getFormattedDate()}`]);
		})
		.catch((error) => {
			const errorBlob = {
				...errorTemplate,
				errorInfo: error,
				timestamp: getFormattedDate()
			}
			console.error(errorBlob)
			response.status(400).json([errorBlob])
		})
}

module.exports = { sendMessage }