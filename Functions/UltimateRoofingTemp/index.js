const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { getFormattedDate } = require("../Helper/index.js")

const sendTimesheetEmail = (request, response) => {
	console.log("works");
	let errorTemplate = {
		error: "Send Email Error",
		function: "sendMessage",
		errorInfo: "",
		timestamp: ""
	}
	console.log("req", request.body);

	var {employeeId, timeIn, timeOut} = request.body;
	const emailList = ['paulphilip290996@gmail.com', 'paul@pphilip.com', 'ludwing@jupiterhouse.space'];

	if (!employeeId.replace(/\s/g, "").length) {
		employeeId = "No employee Id was provided.";
	}

	if (!timeIn.replace(/\s/g, "").length) {
		timeIn = "No time in was provided.";
	}

	if (!timeOut.replace(/\s/g, "").length) {
		timeOut = "No time out was provided.";
	}

	sgMail.setApiKey(process.env.SG_MAIL_API_KEY)

	const html = 
	`
		<p><strong>Employee Id: </strong>${employeeId}<p/><p><strong>Time In: </strong>${timeIn}<p/><strong>Time out: </strong>${timeOut}</p><br/>
		<table style="color: rgb(34, 34, 34); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border: none; border-collapse: collapse;">
			<tbody>
				<tr style="height: 36pt;">
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 106px; height: 106px;"><img src="https://s3.ca-central-1.amazonaws.com/pphilip.com/gwclogo.png" width="106" height="106"></span></span></p>
					</td>
					<td style="margin: 0px; vertical-align: top; overflow: hidden;">
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; font-weight: 700; vertical-align: baseline; white-space: pre-wrap;">&nbsp;Ultimate Roofing & Restoration</span><span style="font-size: 10pt; font-family: Calibri, sans-serif; color: rgb(127, 96, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px; white-space: pre-wrap;"><em>&nbsp; &nbsp; _______________________</em></span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 8pt; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/tjQhUSft0E5q-PRj-wshefsgU2UrKrrj-8JXzAsQTDIxV2gI9vC_5Q7869us_mRZqiyRfwbJAbAIC7JGJHtzbn7AdVXfF4j9mnTqR9-77YdkrmvR95IE5C6L5ipYgstCNLyliI30pMqV4wuM6ntmcnI" width="10" height="10"></span></span><span style="font-size: 8pt; font-family: Roboto, sans-serif; background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="https://master.d3c4voe1co5okk.amplifyapp.com/" style="color: rgb(17, 85, 204);" target="_blank">Visit our website!</a>&nbsp;</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh3.googleusercontent.com/AOxWH7hqTwlVPOxFs_b6VsACwse57Uj-KerTazlSna5-lI_T6CtVRE7rJiAf2XDQ-5Fv4KyaXVxzMIrGvOAuuFCixW7AVg_MYX9usHPPfKOhgX5LPnOKs74Bv4PkAQQp16jVFRFiuyM4W4GJaV7NxI4" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">(402) 613-8124</span></p>
						<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp; &nbsp;</span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(44, 50, 102); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 10px; height: 10px;"><img src="https://lh4.googleusercontent.com/MZbb3_FpPh0A05fVLVtf8Z4BPJSgBU6S8jPYZjbcJFOwOMVgZ_v17FFtlkULvWbfl3m-RmeGzBO-Yuq90_n-pqg9RlYpJNHbvtNtT5nx5E3qRma6Sp7kcs307aQtcLDfPQtw_FPVmenY_KM9kkp9qus" width="10" height="10"></span></span><span style="font-size: 9pt; font-family: Cambria, serif; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><a href="mailto:ludwing@jupiterhouse.space" style="color: rgb(17, 85, 204);" target="_blank">Email</a></span></p>
					</td>
				</tr>
			</tbody>
		</table>
	`

	const msg = {
		to: emailList,
		from: 'paul@pphilip.com',
		subject: 'Timesheet Submission',
		text: html,
		html: html,
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

const test = (req, res) => {
  res.status(200).json("Success");
}

module.exports = { sendTimesheetEmail, test }