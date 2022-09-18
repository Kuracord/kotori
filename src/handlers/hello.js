const Opcodes = require("../Opcodes")
const IdentifyPacket = require("../packets/IdentifyPacket")
const HeartbeatPacket = require("../packets/HeartbeatPacket")
module.exports = {
  op: Opcodes.HELLO,
  async execute(client, message) {
    //client.heartbeat_interval = 1
    //client.interval = setInterval(() => client.send((new HeartbeatPacket(client)).JSON()), message.data.heartbeat_interval * Math.random())
    client.send((new IdentifyPacket(client)).JSON())
  }
}
