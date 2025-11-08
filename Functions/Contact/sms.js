const FormData = require("form-data");
const Mailgun  = require("mailgun.js");

const sendEmailSMS = async (request, response) => {
  const {
    name,
    phone,
    email,
    proposed_company,
    nature_business,
    business_address,
    shareholder_name,
    director_name,
    message,
  } = request.body;

  //const emailList = ['SMS Corporate Services <smscorporate1989@gmail.com>'];
  const emailList = ["Paul Philip <paul@pphilip.com>"];

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
    url: "https://api.mailgun.net",
  });

  const contactReceivedHTML = `
        <html>
        <head>
            <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                color: #333;
                line-height: 1.5;
            }
            h2 {
                margin-bottom: 0;
            }
            .section-title {
                margin-top: 25px;
                font-weight: bold;
                text-decoration: underline;
            }
            .label {
                font-weight: bold;
            }
            </style>
        </head>
        <body>
            <h2>📩 SMS Corporate Services</h2>
            <p>You have received a new inquiry from the website.</p>

            <p class="section-title">General Information</p>
            <p><span class="label">Name:</span> ${name}</p>
            <p><span class="label">Phone:</span> ${phone}</p>
            <p><span class="label">Email:</span> ${email}</p>

            <p class="section-title">Company Information</p>
            <p><span class="label">Proposed Company Name:</span> ${proposed_company}</p>
            <p><span class="label">Nature of Business:</span> ${nature_business}</p>
            <p><span class="label">Business Address:</span> ${business_address}</p>
            <p><span class="label">Shareholder Name:</span> ${shareholder_name}</p>
            <p><span class="label">Director Name:</span> ${director_name}</p>

            <p class="section-title">Message</p>
            <p>${message}</p>
        </body>
        </html>
    `;

  const contactReceivedText = `
        SMS Corporate Services - New Website Inquiry

        GENERAL:
        Name: ${name}
        Phone: ${phone}
        Email: ${email}

        COMPANY:
        Proposed Company Name: ${proposed_company}
        Nature of Business: ${nature_business}
        Business Address: ${business_address}
        Shareholder Name: ${shareholder_name}
        Director Name: ${director_name}

        MESSAGE:
        ${message}
    `;

  try {
    await mg.messages.create(process.env.MAILGUN_PROD_URL, {
      from: `SMSCS <postmaster@${process.env.MAILGUN_PROD_URL}>`,
      to: emailList,
      subject: "Contact Page - Message Received",
      text: contactReceivedText,
      html: contactReceivedHTML,
    });
    return response.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    const errorBlob = {
      function: "sendEmail()",
      errorInfo: error,
      timestamp: getFormattedDate(),
    };
    console.error(errorBlob);
    return response.status(500).json("Internal server error");
  }
};

module.exports = { sendEmailSMS };
