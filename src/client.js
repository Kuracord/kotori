let EventEmitter = require("events")
let API = require("./api")
let gateway = require("./gateway")
module.exports = class Client extends EventEmitter {
  #token = null
  constructor(token) {
    super()
    this.#token = token
    this.api = API(this)
    this.gateway = new (gateway(this))()
  }
  send(obj) {
    if (typeof obj == "object") obj = JSON.stringify(obj)
    this.gateway.send(obj)
  }
  getToken(botPrefix = true) {
    return botPrefix ? "Bot " + this.#token : this.#token
  }
}
