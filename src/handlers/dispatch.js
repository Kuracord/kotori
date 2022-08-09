const Opcodes = require("../Opcodes")
const IdentifyPacket = require("../packets/IdentifyPacket")
const HeartbeatPacket = require("../packets/HeartbeatPacket")
const Handlers = require("../dispatch")
module.exports = {
  op: Opcodes.DISPATCH,
  async execute(client, message) {
    let handler = Handlers.getHandler(message.eventType)
    if (!handler) return client.emit("debug", "Handler not found for dispatch type " + message.eventType);
    handler.execute(client, message)
  }
}
