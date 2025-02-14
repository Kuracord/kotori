import {DispatchEvents, Opcode, Packet} from "../utils";

export default abstract class BasePacket implements Packet {
  JSON() {
    return JSON.stringify(this)
  }
  d: any;
  op!: Opcode;
  t!: DispatchEvents | null;
}
