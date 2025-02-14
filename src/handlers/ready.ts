import Client from "../client";

import {Opcode, Packet, staticImplements} from "../utils";

@staticImplements<Handler>()
export default abstract class Handler {
  static op = Opcode.Ready;
  static execute(client: Client, message: Packet) {
    client.session_id = message.d.session_id
    // if (message.d.application) client.application = message.d.application
    client.guilds = message.d.guilds
    client.user = message.d.user
    client.emit("ready", message.d)
  }
}
