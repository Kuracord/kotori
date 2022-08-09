const Opcodes = require("../Opcodes")
const BasePacket = require("./BasePacket")
module.exports = class HeartbeatPacket extends BasePacket {
  constructor(client) {
    super()
    client.heartbeat_interval += 1
    this.op = Opcodes.HEARTBEAT
    this.d = client.heartbeat_interval
  }
}
