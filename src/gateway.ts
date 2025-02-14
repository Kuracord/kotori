// noinspection JSUnusedGlobalSymbols

import WebSocket from "ws"
import EventEmitter from "events"
import Client from "./client";
import {Handler, Handlers} from "./handlers";
import BasePacket from "./packets/BasePacket";
import {Packet} from "./utils";
export default function register(client: Client) {
  return class Gateway extends EventEmitter {
    public ws!: WebSocket;
    constructor() {
      super()
      this.reconnect()
    }
    send(data: BasePacket | string) {
      if (data instanceof BasePacket) data = data.JSON()
      this.ws.send(data)
    }
    reconnect(code?: number) {
      if (code) client.emit("debug", "Gateway closed with code " + code)
      if (client.interval) clearInterval(client.interval)
      this.ws = new WebSocket("wss://gateway.keneshin.de?v=3") // TODO: maybe implement v4 API behavior?
      this.ws.on("message", this.onMessage.bind(this))
      this.ws.on("close", this.reconnect.bind(this))
    }
    onMessage(rawMessage: string) {
      client.emit("debug", "Got message: " + rawMessage)
      let message: Packet = JSON.parse(rawMessage)
      let handler = Handlers.getHandler(message.op)
      if (!handler) return client.emit("debug", "Handler not found for opcode " + message.op)
      handler.execute(client, message)
    }
  }
}
