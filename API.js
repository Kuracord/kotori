const axios = require("axios").default
module.exports = class API {
    static async getMe(token) {
        return (await axios.get("https://discord.com/api/v9/users/@me", {
            headers: {
                Authorization: token
            }
        })).data
    }
    static async sendMessage(client, channelId, content) {
        return (await axios.post(`https://${client.apiUrl}/v9/channels/${channelId}/messages`, {
            content
        }, { 
            headers: {
                Authorization: client.getToken()
            },
            json: true
        })).data
    }
    static async getGuild(guildId) {
        return (await axios.get(`https://${client.apiUrl}/v9/guilds/${guildId}`, { 
            headers: {
                Authorization: client.getToken()
            }
        })).data
    }
    static async getChannel(channelId) {
        return (await axios.get(`https://${client.apiUrl}/v9/channels/${channelId}`, { 
            headers: {
                Authorization: client.getToken()
            }
        })).data
    }
}
