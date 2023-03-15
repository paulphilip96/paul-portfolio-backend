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
	const emailList = ['paulphilip290996@gmail.com', 'paul@pphilip.com'];
	const responseEmailList = [contact, 'paulphilip290996@gmail.com', 'paul@pphilip.com'];

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

	const html = 
	`
		<p>Name of Sender: ${name}<p/><p>Contact Information: ${contact}<p/><p><strong>Message:</strong><br/>${message}</p><br/><br/>
		<table style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border: none; border-collapse: collapse;">
			<tbody>
				<tr style="height: 36pt;">
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 106px; height: 106px;"><img src="https://lh6.googleusercontent.com/PggPlrOl--wiiKv9Ukmgu_XotBgqrJtiCRh1y0bLPVQRwvd3Eyj74lJ6mZ4GDGShmE79ceFGmEltmfkgmPaZMDgAPNAZlLf0UZoiKEuZBtqtRk1JYqBjRtp0pebDRb21rwEP8TECztPky-ZJXpR_N9M" width="106" height="106"></span></span></p>
					</td>
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;Paul Philip</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;Software Engineer</span></p>
						<p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px; white-space: pre-wrap;"><em>&nbsp; &nbsp; _______________________</em></span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/tjQhUSft0E5q-PRj-wshefsgU2UrKrrj-8JXzAsQTDIxV2gI9vC_5Q7869us_mRZqiyRfwbJAbAIC7JGJHtzbn7AdVXfF4j9mnTqR9-77YdkrmvR95IE5C6L5ipYgstCNLyliI30pMqV4wuM6ntmcnI" width="10" height="10"></span></span><span style="font-size: 8pt; font-family: Roboto, sans-serif; background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="http://www.pphilip.com/" style="color: rgb(17, 85, 204);" target="_blank">www.pphilip.com</a>&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/AOxWH7hqTwlVPOxFs_b6VsACwse57Uj-KerTazlSna5-lI_T6CtVRE7rJiAf2XDQ-5Fv4KyaXVxzMIrGvOAuuFCixW7AVg_MYX9usHPPfKOhgX5LPnOKs74Bv4PkAQQp16jVFRFiuyM4W4GJaV7NxI4" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">(402) 525-7384</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh4.googleusercontent.com/MZbb3_FpPh0A05fVLVtf8Z4BPJSgBU6S8jPYZjbcJFOwOMVgZ_v17FFtlkULvWbfl3m-RmeGzBO-Yuq90_n-pqg9RlYpJNHbvtNtT5nx5E3qRma6Sp7kcs307aQtcLDfPQtw_FPVmenY_KM9kkp9qus" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="mailto:paul@pphilip.com" style="color: rgb(17, 85, 204);" target="_blank">paul@pphilip.com</a></span></p>
					</td>
				</tr>
			</tbody>
		</table>
	`

	const response_html = 
	`
		<p>I received your message and will be in touch soon.</p><p>Thanks again for reaching out.</p><br/>
		<p>Best,</p>
		<table style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border: none; border-collapse: collapse;">
			<tbody>
				<tr style="height: 36pt;">
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 106px; height: 106px;"><img src="https://lh6.googleusercontent.com/PggPlrOl--wiiKv9Ukmgu_XotBgqrJtiCRh1y0bLPVQRwvd3Eyj74lJ6mZ4GDGShmE79ceFGmEltmfkgmPaZMDgAPNAZlLf0UZoiKEuZBtqtRk1JYqBjRtp0pebDRb21rwEP8TECztPky-ZJXpR_N9M" width="106" height="106"></span></span></p>
					</td>
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;Paul Philip</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;Software Engineer</span></p>
						<p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px; white-space: pre-wrap;"><em>&nbsp; &nbsp; _______________________</em></span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/tjQhUSft0E5q-PRj-wshefsgU2UrKrrj-8JXzAsQTDIxV2gI9vC_5Q7869us_mRZqiyRfwbJAbAIC7JGJHtzbn7AdVXfF4j9mnTqR9-77YdkrmvR95IE5C6L5ipYgstCNLyliI30pMqV4wuM6ntmcnI" width="10" height="10"></span></span><span style="font-size: 8pt; font-family: Roboto, sans-serif; background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="http://www.pphilip.com/" style="color: rgb(17, 85, 204);" target="_blank">www.pphilip.com</a>&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/AOxWH7hqTwlVPOxFs_b6VsACwse57Uj-KerTazlSna5-lI_T6CtVRE7rJiAf2XDQ-5Fv4KyaXVxzMIrGvOAuuFCixW7AVg_MYX9usHPPfKOhgX5LPnOKs74Bv4PkAQQp16jVFRFiuyM4W4GJaV7NxI4" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">(402) 525-7384</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh4.googleusercontent.com/MZbb3_FpPh0A05fVLVtf8Z4BPJSgBU6S8jPYZjbcJFOwOMVgZ_v17FFtlkULvWbfl3m-RmeGzBO-Yuq90_n-pqg9RlYpJNHbvtNtT5nx5E3qRma6Sp7kcs307aQtcLDfPQtw_FPVmenY_KM9kkp9qus" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="mailto:paul@pphilip.com" style="color: rgb(17, 85, 204);" target="_blank">paul@pphilip.com</a></span></p>
					</td>
				</tr>
			</tbody>
		</table>
	`

	const msg = {
		to: emailList,
		from: 'paul@pphilip.com',
		subject: 'Mesage from Contact Page on Website!',
		text: html,
		html: html,
	}

	const confirm_msg = {
		to: responseEmailList,
		from: 'paul@pphilip.com',
		subject: 'Thank you for reaching out!',
		text: response_html,
		html: response_html,
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

	sgMail
		.send(confirm_msg)
		.then(() => {
			console.log('Reply Email sent')
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