const WebSocket = require("ws")
const EventEmitter = require("events")
const Handlers = require("./handlers")
module.exports = function register(client) {
  const Client = require("./client")
  if (!client instanceof Client) throw new Error("Client must be an instance of Client")
  return class Gateway extends EventEmitter {
    #ws
    constructor() {
      super()
      this.reconnect()
    }
    send(data) {
      if (typeof data == "object") data = JSON.stringify(data)
      this.#ws.send(data)
    }
    reconnect(code) {
      if (code) client.emit("debug", "Gateway closed with code " + code)
      this.#ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json")
      this.#ws.on("message", this.onMessage.bind(this))
      this.#ws.on("close", this.reconnect.bind(this))
    }
    onMessage(message) {
      client.emit("debug", "Got message: " + message)
      message = JSON.parse(message)
      let handler = Handlers.getHandler(message.op)
      if (!handler) return client.emit("debug", "Handler not found for opcode " + message.op)
      message = {
        opcode: message.op,
        eventType: message.t,
        data: message.d,
        sequence: message.s
      }
      handler.execute(client, message)
    }
  }
}
