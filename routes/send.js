const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator');
const validateEmailForm = require('../Controllers/validators/validateEmailForm');
const sendMail = require("../Controllers/sendMail");
const errorsforShow = [];
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
        const sendSuc = await sendMail(recipientEmail, senderEmail, emailSubject, message, apiKey);
        console.log(sendSuc);
        req.flash('EmailSend', sendSuc);
        res.render('formInput.ejs', {messages: req.flash('EmailSend')})
        //Setup a pop up for a successful transfer.

    } catch (error){
        console.error(error);
        req.flash('EmailErr', error);
        res.render('formInput.ejs', {messages: req.flash('EmailErr')});
        // Repopulate the form on rerender with the input values
    }
    console.log(req.body);

})
module.exports = router;