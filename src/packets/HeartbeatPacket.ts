import {Opcode} from "../utils"
import BasePacket from "./BasePacket"
import Client from "../client";
export default class HeartbeatPacket extends BasePacket {
  constructor(client: Client) {
    super()
    client.heartbeat_interval! += 1
    this.op = Opcode.Heartbeat
    this.d = client.heartbeat_interval
  }
}
