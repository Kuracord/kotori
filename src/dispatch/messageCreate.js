module.exports = {
  t: "MESSAGE_CREATE",
  execute(client, { data }) {
    client.emit("message", data)
    client.emit("messageCreate", data)
  }
}
