import { createResponse } from "../utils/utils.js";

export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            createResponse(res, 200, items);
        } catch (error) {
            logger.error(`Error en getAll = ${error}`);
            next(error.message);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item)
                createResponse(res, 404, {
                    method: "getById",
                    error: "Error - Item not found",
                });
            else createResponse(res, 200, item);
        } catch (error) {
            logger.error(`Error en getById = ${error}`);
            next(error.message);
        }
    };

    create = async (req, res, next) => {
        try {
            const newItem = await this.service.create(req.body);
            if (!newItem)
                createResponse(res, 404, {
                    method: "create",
                    error: "Error - the item could not be created",
                });
            else createResponse(res, 200, newItem);
        } catch (error) {
            logger.error(`Error en create = ${error}`);
            next(error.message);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item)
                createResponse(res, 404, {
                    method: "update",
                    error: "Error - the item could not be updated",
                });
            const itemUpd = await this.service.update(id, req.body);
            createResponse(res, 200, itemUpd);
        } catch (error) {
            logger.error(`Error en update = ${error}`);
            next(error.message);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item)
                createResponse(res, 404, {
                    method: "delete",
                    error: "Error - the item could not be deleted",
                });
            const itemUpd = await this.service.delete(id);
            createResponse(res, 200, {
                itemUpd,
                msg: `Cart ID ${id} deleted successfully`,
            });
        } catch (error) {
            logger.error(`Error en delete = ${error}`);
            next(error.message);
        }
    };
}
