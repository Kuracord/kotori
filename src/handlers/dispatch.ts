import {Opcode, Packet, staticImplements} from "../utils"
import Handlers from "../dispatch"
import Client from "../client";
import {Handler} from "./index";

@staticImplements<Handler>()
export default abstract class DispatchHandler {
  static op = Opcode.Dispatch;
  static execute(client: Client, message: Packet) {
    let handler = Handlers.getHandler(message.t!)
    if (!handler) return client.emit("debug", "Handler not found for dispatch type " + message.t) as unknown as void;
    handler.execute(client, message)
  }
}
