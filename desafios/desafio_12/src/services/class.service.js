import { logger } from "../utils/logger/logger.js";

export default class Services {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            return this.dao.getAll();
        } catch (error) {
            logger.error(`desde class.service.js - Error en getAll = ${error}`);
        }
    }

    getById = async (id) => {
        try {
            const item = await this.dao.getById(id);
            if (!item) return false;
            else return item;
        } catch (error) {
            logger.error(
                `desde class.service.js - Error en getById = ${error}`
            );
        }
    };

    create = async (obj) => {
        try {
            const newItem = await this.dao.create(obj);
            if (!newItem) return false;
            else return newItem;
        } catch (error) {
            logger.error(`desde class.service.js - Error en create = ${error}`);
        }
    };

    update = async (id, obj) => {
        try {
            const item = await this.dao.getById(id);
            if (!item) return false;
            else return await this.dao.update(id, obj);
        } catch (error) {
            logger.error(`desde class.service.js - Error en update = ${error}`);
        }
    };

    delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            logger.error(`desde class.service.js - Error en delete = ${error}`);
        }
    };
}
