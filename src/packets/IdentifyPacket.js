const Opcodes = require("../Opcodes")
const BasePacket = require("./BasePacket")
const os = require("os")
module.exports = class IdentifyPacket extends BasePacket {
  constructor(client) {
    super()
    this.op = Opcodes.IDENTIFY
    this.d = {
      token: client.getToken(),
    }
  }
}
