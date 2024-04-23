import nodemailer from "nodemailer";
import { promisify } from 'util';

export async function orderConfirmationEmail(email: string, productId: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PW,
            },
        });

        const sendMailAsync = promisify(transporter.sendMail).bind(transporter);

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Order Confirmation | Ecommercery',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation | Ecommercery</title>
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
              .product-id {
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
                <h1>Thank you for your order!</h1>
                <p>Your order has been successfully placed.</p>
                <p class="product-id">Product ID: <span>${productId}</span></p>
              </div>
            </body>
            </html>
            `,
        };

        await sendMailAsync(mailOptions);
        return { sent: true };
    } catch (error) {
        console.error(error);
        return { sent: false };
    }
}
