import BasePacket from "./packets/BasePacket";
import {register as API, APIInterface} from "./api";
import EventEmitter from "events"
import Gateway from "./gateway"
import {Guild, User} from "./types";
export default class Client extends EventEmitter {
  readonly token!: string
  readonly api!: APIInterface;
  readonly gateway!: any;
  public guilds?: Guild[];
  public user?: User;
  interval?: number;
  heartbeat_interval?: number;
  session_id?: string;
  constructor(token: string) {
    super()
    Object.defineProperty(this, "token", { enumerable: false, value: token, writable: false })
    this.api = API(this)
    this.gateway = new (Gateway(this))()
  }
  send(obj: BasePacket | string) {
    if (obj instanceof BasePacket) obj = obj.JSON()
    this.gateway.send(obj)
  }
  getToken() {
    return this.token
  }
}
