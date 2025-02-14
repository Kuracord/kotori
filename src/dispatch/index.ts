import GUILD_CREATE from "./guildCreate"
import MESSAGE_CREATE from "./messageCreate"
import {DispatchEvents, Opcode, Packet} from "../utils";
import Client from "../client";

const handlerList: Handler[] = [
    GUILD_CREATE as unknown as Handler,
    MESSAGE_CREATE as unknown as Handler,
]

export interface Handler {
    t: DispatchEvents;
    execute(client: Client, message: Packet): Promise<void> | void
}
export default class Handlers {
  public static getHandler(type: DispatchEvents): Handler | undefined {
      return handlerList.find((a: Handler) => a.t == type);
  }
}