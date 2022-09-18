module.exports = {
  t: "MESSAGE_CREATE",
  execute(client, { data }) {
    data.sendMessage = async (content, options = {}) => {
      if (typeof content == "object") options = content
      if (typeof content == "string") options.content = content
      return await client.api.sendMessage(message.channel.id, options)
    }
    client.emit("message", data)
    client.emit("messageCreate", data)
  }
}
