import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config()

const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
});

const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "jonasnavin@gmail.com",
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "Hello",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);