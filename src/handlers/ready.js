const Opcodes = require("../Opcodes")

module.exports = {
  op: Opcodes.READY,
  execute(client, message) {
    client.session_id = message.data.session_id
    if (message.data.application) client.application = message.data.application
    client.guilds = message.data.guilds
    client.user = message.data.user
    client.emit("ready", message.data)
  }
}
