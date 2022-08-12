const axios = require("axios")
module.exports = function register(client) {
  const Client = require("./client")
  if (!client instanceof Client) throw new Error("Client must be an instance of Client")
  function axiosWithToken(url, data, headers = null) {
    return (await axios.post(url, data, {
      json: true,
      headers: { Authorization: client.getToken(), ...headers }
    })).data
  }
  return class API {
    static async sendMessage(channelId, content, options = {}) {
      if (typeof content == "object") options = content
      if (typeof content == "string") options.content = content
      return await axiosWithToken(`https://discord.com/api/v9/channels/${channelId}/messages`, options)
    }
    static async followUp(token, content, options = {}) {
      if (!client.application) throw new Error("Selfbot not supported")
      if (typeof content == "object") options = content
      if (typeof content == "string") options.content = content
      return await axiosWithToken(`https://discord.com/api/v9/webhooks/${client.application.id}/${token}`, options)
    }
    static async defer(id, token, loadingState = true) {
      return await axiosWithToken(`https://discord.com/api/v9/interactions/${id}/${token}/callback`, { type: loadingState ? 5 : 6 })
    }
    static async sendModal(id, token, modal) {
      return await axiosWithToken(`https://discord.com/api/v9/interactions/${id}/${token}/callback`, { type: 9, data: modal })
    }
  }
}
