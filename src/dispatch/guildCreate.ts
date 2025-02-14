import Client from "../client";
import {Handler} from "./index";
import {DispatchEvents, Packet, staticImplements} from "../utils";
import {Guild} from "../types";

@staticImplements<Handler>()
export default class GuildCreateHandler {
  static t: DispatchEvents = "GUILD_CREATE";
  static execute(client: Client, packet: Packet) {
    if (!client.guilds) client.guilds = []
    let guildIndex = client.guilds.findIndex((a: Guild)=>a.id==packet.d.id)
    if (guildIndex) client.guilds[guildIndex] = packet.d
    else client.guilds.push(packet.d)
  }
}