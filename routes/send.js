const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const validateEmailForm = require('../Controllers/validators/validateEmailForm');
const sendMail = require("../Controllers/sendMail");

router.route("/").get((req, res) => {
    // A view with a form containing inputs for the recipient(s) emails
    // sender email or empty for the default email
    // a message subject and a message body
    res.render("formInput.ejs");
    // res.status(200).json({ message: "You have reached the send route" });
}).post(validateEmailForm, async (req, res) => {
    // This one takes the inputs containing the details and forwards them to the 
    // recipient. Gives a visual feedback on the success of the delivery.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { message, emailSubject, recipientEmail, apiKey, senderEmail } = req.body;
    try {
        await sendMail(recipientEmail, senderEmail, emailSubject, message, apiKey)
    } catch (error){
        console.error(error);
        
    }
    console.log(req.body);
})
module.exports = router;