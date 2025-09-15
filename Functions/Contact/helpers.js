const generateContactReceivedHTML = (name, contact, message) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2e6da4; margin-bottom: 10px;">New Message Received!</h2>
      <p style="font-size: 16px;">You have a new message via your website contact form:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="font-weight: bold; padding: 5px 10px; width: 120px;">Name:</td>
          <td style="padding: 5px 10px;">${name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px 10px;">Contact:</td>
          <td style="padding: 5px 10px;">${contact}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 5px 10px;">Message:</td>
          <td style="padding: 5px 10px;">${message}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #666;">
        This is an automated email. Please do not reply to this address.
      </p>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

      <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} Paul Philip. All rights reserved.</p>
    </div>
  `

  return html;
}

const generateContactReceivedText = (name, contact, message) => {
  const text = `
    Hello Paul Philip!
    You have received a new message:

    Name: ${name}
    Contact: ${contact}
    Message: ${message}

    — End of message —
  `

  return text;
}

// Response email templates — for sending back to the contact
const generateResponseHTML = (name, contact) => {
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2e6da4; margin-bottom: 10px;">Thank you for reaching out!</h2>
        <p style="font-size: 16px;">We appreciate your message and will respond promptly.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="font-weight: bold; padding: 5px 10px; width: 120px;">Name:</td>
            <td style="padding: 5px 10px;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 5px 10px;">Contact:</td>
            <td style="padding: 5px 10px;">${contact}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          This is an automated email. Please do not reply to this address.
        </p>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">

        <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} Paul Philip. All rights reserved.</p>
      </div>
    `

    return html;
  }
;

const generateResponseText = (name) => `
Hello ${name}!

Thank you for contacting us. We have received your message and will respond as soon as possible.

— Paul Philip
`;

module.exports = {
  generateContactReceivedHTML,
  generateContactReceivedText,
  generateResponseHTML,
  generateResponseText
}