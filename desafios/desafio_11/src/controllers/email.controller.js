import "dotenv/config";
import { template } from "../services/email-templates/template.js";
import { transporter } from "../services/email.service.js";

export const sendGmail = async (req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: "Bienvenida/o",
            // text: ''
            // html: `<h1>Bienvenido/a a Coderhouse!</h1>`
            html: template,
            attachments: [
                {
                    path:
                        process.cwd() +
                        "/src/services/email-templates/text.txt",
                    filename: `Adjunto-${name}`,
                },
            ],
        };
        const response = await transporter.sendMail(gmailOptions);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};
