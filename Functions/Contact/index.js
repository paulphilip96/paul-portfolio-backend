//General imports
const sgMail = require('@sendgrid/mail')

//add message
const sendMessage = (request, response) => {
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

module.exports = { sendMessage }