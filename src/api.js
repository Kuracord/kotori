const axios = require("axios")
module.exports = function register(client) {
  const Client = require("./client")
  if (!client instanceof Client) throw new Error("Client must be an instance of Client")
  return class API {
    static async sendMessage(channelId, content, options = {}) {
      if (typeof content == "object") options = content
      if (typeof content == "string") options.content = content
      return (await axios.post(`https://discord.com/api/v9/channels/${channelId}/messages`, options, {
        json: true,
        headers: { Authorization: client.getToken() }
      })).data
    }
  }
}
