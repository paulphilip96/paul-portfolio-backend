const FormData = require("form-data");
const Mailgun  = require("mailgun.js");
const validator = require("validator");

const { getFormattedDate } = require('../Helper/index.js')
const { generateContactReceivedHTML, generateResponseHTML, generateResponseText } = require("./helpers.js");
const { generateContactReceivedText } = require("./helpers.js");


const sendEmail = async (request, response) => {
  let { name, contact, message } = request.body;
  const emailList = ["Paul Philip <paul@pphilip.com>"];

  if (!name?.trim()) name = "No Name Was Provided";
  if (!message?.trim()) message = "No Message Was Provided";
  if (!contact?.trim()) contact = "No Contact Information Was Provided";
  const isValidEmail = validator.isEmail(contact);

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
    url: "https://api.mailgun.net"
  });

	const contactReceivedHTML = generateContactReceivedHTML(name, contact, message);
	const contactReceivedText = generateContactReceivedText(name, contact, message);
  const contactResponseHTML = generateResponseHTML(name, contact);
  const contactResponseText = generateResponseText(name);

  try {
    await mg.messages.create(process.env.MAILGUN_PROD_URL, {
      from: `Paul Philip <postmaster@${process.env.MAILGUN_PROD_URL}>`,
      to: emailList,
      subject: "Hello Paul Philip",
      text: contactReceivedText,
			html: contactReceivedHTML
    });

    // If contact is a valid email, send a response email back to them
    if (isValidEmail) {
      await mg.messages.create(process.env.MAILGUN_PROD_URL, {
        from: `Paul Philip <postmaster@${process.env.MAILGUN_PROD_URL}>`,
        to: contact,
        subject: "Thank you for reaching out!",
        text: contactResponseText,
        html: contactResponseHTML
      });
    }
		/* Sandbox incase you want to test */
		// await mg.messages.create(process.env.MAILGUN_SANDBOX_URL, {
    //   from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_SANDBOX_URL}>`,
    //   to: emailList,
    //   subject: "Hello Paul Philip",
    //   text: contactReceivedText,
		// 	html: contactReceivedHTML
    // });
    return response.status(201).json({ message: "Email sent successfully" });
  } 
	catch (error) {
		const errorBlob = {
			function: "sendEmail()",
			errorInfo: error,
			timestamp: getFormattedDate()
		}
    console.error(error);
    return response.status(500).json(errorBlob);
  }
};

module.exports = { sendEmail };