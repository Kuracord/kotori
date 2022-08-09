const Opcodes = require("../Opcodes")
const BasePacket = require("./BasePacket")
const os = require("os")
module.exports = class IdentifyPacket extends BasePacket {
  constructor(client, intents = 513, presence) {
    super()
    this.op = Opcodes.IDENTIFY
    this.d = {
      token: client.getToken(false),
      properties: {
        os: os.platform(),
        browser: "https://github.com/keneshindev/kotori",
        device: os.type() + " " + os.hostname() + " " + os.release() + " " + os.version() + " " + os.arch() + " " + os.platform()
      },
      intents,
      ...(presence && { presence })
    }
  }
}
