import {Opcode} from "../utils"
import BasePacket from "./BasePacket"
import os from "os"
import Client from "../client";
export default class IdentifyPacket extends BasePacket {
  constructor(client: Client) {
    super()
    this.op = Opcode.Identify
    this.d = {
      token: client.getToken(),
    }
  }
}
