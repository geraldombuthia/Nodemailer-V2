require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const sendRouter = require("./routes/send")
const { body, validationResult } = require('express-validator');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/send', sendRouter);
app.get("/", (req, res) => {
    res.render("index.ejs")
    // res.status(200).json({messsage: "Welcome to the Email Man application"})
})
app.listen(4000, () => {
    console.log("Listening at 4000...")
})