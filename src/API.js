const axios = require("axios").default
module.exports = class API {
    /**
    * Get yourself by a token
    */
    static async getMe(token) {
        return (await axios.get("https://discord.com/api/v9/users/@me", {
            headers: {
                Authorization: token
            }
        })).data
    }
    /**
    * Send message to a channel
    */
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
    /**
    * Get guild by id
    */
    static async getGuild(client, guildId) {
        return (await axios.get(`https://${client.apiUrl}/v9/guilds/${guildId}`, { 
            headers: {
                Authorization: client.getToken()
            }
        })).data
    }
    /**
    * Get channel by id
    */
    static async getChannel(client, channelId) {
        return (await axios.get(`https://${client.apiUrl}/v9/channels/${channelId}`, { 
            headers: {
                Authorization: client.getToken()
            }
        })).data
    }
}
