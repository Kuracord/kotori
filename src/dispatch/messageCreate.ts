import Client from "../client";
import {Handler} from "./index";
import {DispatchEvents, Packet, staticImplements} from "../utils";
import {Message} from "../types";

@staticImplements<Handler>()
export default class MessageCreateHandler {
  static t: DispatchEvents = "MESSAGE_CREATE";
  static execute(client: Client, packet: Packet) {
    // data.sendMessage = async (content, options = {}) => {
    //   if (typeof content == "object") options = content
    //   if (typeof content == "string") options.content = content
    //   return await client.api.sendMessage(data.channel.id, options)
    // }
    client.emit("message", packet.d as Message);
    client.emit("messageCreate", packet.d as Message);
  }
}
