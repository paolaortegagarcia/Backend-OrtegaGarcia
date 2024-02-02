import { logger } from "../utils/logger.js";

export default class LoggerController {
    async loggerTest(req, res) {
        try {
            logger.debug("Debug message");
            logger.info("Info message");
            logger.warn("Warning message");
            logger.error("Error message");

            res.send("Logs ok!");
        } catch (error) {
            logger.error(`Error en loggerTest = ${error}`);
            res.status(500).send("Error en el servidor");
        }
    }

    async loggerError(req, res) {
        logger.error("error en el endpoint de prueba");
        res.send("probando logger");
    }
}
