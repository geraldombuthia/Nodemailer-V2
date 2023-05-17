const { body } = require('express-validator');

const validateEmailForm = [
    body('message').notEmpty().withMessage('Message is required').escape().trim(),
    body('emailSubject').notEmpty().withMessage('Email subject is required').escape().trim(),
    body('recipientEmail').notEmpty().withMessage('Recipient email is required').escape().trim(),
    body('apiKey').escape().trim(),
    body('senderEmail').escape().trim(),
];

module.exports = validateEmailForm;