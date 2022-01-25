"use strict";
const nodemailer = require("nodemailer");

module.exports = async () => {
    // Generate test SMTP service account from ethereal.email
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "amancvtesting@gmail.com", 
            pass: "anotherpassword", 
        },
    });
    return transporter;
}