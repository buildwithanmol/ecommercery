"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification_email = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = require("crypto");
const util_1 = require("util");
const otp = (0, crypto_1.randomInt)(1111, 9999);
async function verification_email(email) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PW,
            },
        });
        const sendMailAsync = (0, util_1.promisify)(transporter.sendMail).bind(transporter);
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Email Verification | Ecommercery',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Ecommercery!</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #020202;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
              }
              p {
                color: #020202;
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                margin-top: 20px;
              }
              .verification-code {
                font-size: 24px;
                font-weight: 700;
                color: #ff6600;
                margin-top: 10px;
                text-align: center;
              }
            </style>
            </head>
            <body>
              <div class="container">
                <h1>Welcome to Ecommercery!</h1>
                <p>Please verify your email address to complete the registration.</p>
                <p class="verification-code">Email Verification Code: <span>${otp}</span></p>
              </div>
            </body>
            </html>
            `,
        };
        await sendMailAsync(mailOptions);
        return { sent: true, otp };
    }
    catch (error) {
        console.error(error);
        return { sent: false, otp };
    }
}
exports.verification_email = verification_email;
//# sourceMappingURL=verification_mail.js.map