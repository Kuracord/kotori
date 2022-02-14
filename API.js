const axios = require("axios").default
const Db = require("./GlobalDatabase")
module.exports = class API {
    static async sendMessage(channelId, content) {
        return (await axios.post(`https://${Db.get("apiUrl")}/v9/channels/${channelId}/messages`, {
            content
        }, { 
            headers: {
                Authorization: "Bot " + Db.get("token")
            },
            json: true
        })).data
    }
    static async getGuild(guildId) {
        return (await axios.get(`https://${Db.get("apiUrl")}/api/v9/guilds/${guildId}`, { 
            headers: {
                Authorization: "Bot " + Db.get("token")
            }
        })).data
    }
    static async getChannel(channelId) {
        return (await axios.get(`https://${Db.get("apiUrl")}/api/v9/channels/${channelId}`, { 
            headers: {
                Authorization: "Bot " + Db.get("token")
            }
        })).data
    }
}