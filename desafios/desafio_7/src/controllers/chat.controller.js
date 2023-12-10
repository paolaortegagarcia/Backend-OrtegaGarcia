import * as service from "../services/chat.service.js";

export const getMessages = async (req, res, next) => {
    try {
        const response = await service.getMessages();
        if (!response)
            res.status(404).json({ msg: "Error getting the messages" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getMessagesById = async (req, res, next) => {
    try {
        const { msgId } = req.params;
        const response = await service.getMessagesById(msgId);
        if (!response)
            res.status(404).json({ msg: "Error getting the message by ID" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const createMessage = async (req, res, next) => {
    try {
        const newMsg = await service.createMessage(req.body);
        if (!newMsg) res.status(404).json({ msg: "Error adding the message" });
        else res.status(200).json(newMsg);
    } catch (error) {
        next(error.message);
    }
};

export const updateMessage = async (req, res, next) => {
    try {
        const { msgId } = req.params;
        const msgUpd = await service.updateMessage(msgId, req.body);
        if (!msgUpd)
            res.status(404).json({ msg: "Error updating the message" });
        else res.status(200).json(msgUpd);
    } catch (error) {
        next(error.message);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {
        const { msgId } = req.params;
        const msgDel = await service.deleteMessage(msgId);
        if (msgDel) res.status(404).json({ msg: "Error deleting the message" });
        else
            res.status(200).json({
                msg: `Message ID ${msgId} deleted successfully`,
            });
    } catch (error) {
        next(error.message);
    }
};

export const deleteMessages = async (req, res, next) => {
    try {
        const response = await service.deleteMessages();
        if ((response = []))
            res.status(404).json({ msg: "Error deleting the messages" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};
