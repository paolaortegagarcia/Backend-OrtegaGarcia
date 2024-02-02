import { twilioClient } from "../services/sms.service.js";
import "dotenv/config";
import { logger } from "../utils/logger.js";

export const sendSms = async (req, res) => {
    try {
        const { message } = req.body;
        const { dest } = req.body;
        const msg = {
            body: message,
            from: process.env.SMS,
            to: dest,
        };

        const response = await twilioClient.messages.create(msg);
        res.json(response);
    } catch (error) {
        logger.error(`Error en sendSms = ${error}`);
        next(error.menssage);
    }
};
