const fs = require("fs")
module.exports = new (class Handlers {
  #handlers = []
  constructor() {
    this.#handlers = []
    let handlerFiles = fs.readdirSync(__dirname).filter(a=>a!="index.js")
    for (let file of handlerFiles) this.#handlers.push(require("./" + file))
  }
  getHandler(opcode) {
    return this.#handlers.find(a=>a.op==opcode)
  }
})()
