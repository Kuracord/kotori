import {Opcode, Packet, staticImplements} from "../utils"
import IdentifyPacket from "../packets/IdentifyPacket"
import HeartbeatPacket from "../packets/HeartbeatPacket"
import Client from "../client";

@staticImplements<Handler>()
export default abstract class Handler {
  static op = Opcode.Hello;
  static async execute(client: Client, message: Packet): Promise<void> {
    //client.heartbeat_interval = 1
    //client.interval = setInterval(() => client.send((new HeartbeatPacket(client)).JSON()), message.data.heartbeat_interval * Math.random())
    client.send((new IdentifyPacket(client)).JSON())
  }
}
