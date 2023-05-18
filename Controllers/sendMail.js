// This modules carries out the sending out of Emails.
//  It will provide means to send emails using default email
// or custom emails for those who can setup their own emails 
// to send out information

const nodemailer = require('nodemailer');
const markdownParser = require("./markdownParser")
async function sendMail(receiverEmail, senderEmail, msgSubject, message, apiKey) {
    let user, pass;
    let parsed = await markdownParser(message);
    if (senderEmail && apiKey) {
        user = senderEmail;
        pass = apiKey;
    } else {
        user = process.env.SENDER_EMAIL;
        pass = process.env.SENDER_PASSWORD;
    }

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    const mailOptions = {
        from: senderEmail || process.env.SENDER_EMAIL,
        to: receiverEmail,
        subject: msgSubject,
        // text: message,
        html: await markdownParser(message),
    };
    console.log(message)
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
}

module.exports = sendMail;

