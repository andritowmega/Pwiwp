class MessageDomain {
    static async createMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.create(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
    static async getMessage(data) {
        const messageEntity = require("../entities/message.entity");
        const messageResponse = await messageEntity.getMessagesByChatId(data).catch((e) => {
            console.error("SERVICE MESSAGE SYSTEM: can not regist message", e);
            return null;
        });
        return messageResponse;
    }
}

module.exports = MessageDomain;