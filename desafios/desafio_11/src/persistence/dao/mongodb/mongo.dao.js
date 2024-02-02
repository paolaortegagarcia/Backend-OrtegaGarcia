import { logger } from "../../../utils/logger.js";

export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            logger.error("Error en getAll", error);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            logger.error("Error en getById", error);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            logger.error("Error en create", error);
        }
    }

    async update(id, obj) {
        try {
            const response = await this.model.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            logger.error("Error en update", error);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            logger.error("Error en delete", error);
        }
    }
}
