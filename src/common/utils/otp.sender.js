import nodemailer from 'nodemailer'
import {ENV} from '../config.js';
import fs from 'fs'
import path from 'path';

const htmlContent = fs.readFileSync(path.join(process.cwd(),'src/common/utils/email.tempilate.html' ) , 'utf-8')

export async function sendEmail(email , subject , text = "sizning tasdiqlash kodingiz") {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: ENV.EMAIL,
                pass: ENV.EMAIL_PASSWROD,
            },
        });

        await transporter.sendMail({
            from: ENV.EMAIL,
            to: email,
            subject: `Your Recovery Code - ${subject}`,
            html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Your code is : ${subject}</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Thank you for joining our platform. We are excited to have you on board. Please click the button below to get started:</p>
                    <a href="https://example.com" class="button">Get Started</a>
                    <p>If you have any questions, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
}