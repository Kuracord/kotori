const EventEmitter = require('events')
const Gateway = require('./Gateway')
const Db = require("./GlobalDatabase")
// TODO: I HATE EVENTEMITTER
module.exports = class Client extends EventEmitter {
    constructor(token, options = {}) {
        super()
        if (!token) throw new Error("Missing token")
        if (token.startsWith("Bot ")) token = token.slice(4)
        if (options.apiUrl) Db.set("apiUrl", options.apiUrl)
        Db.set("token", token)
        Db.set("heartbeat_interval", 0)
        this.gateway = new Gateway(options.ws)
        this.messages = []
        this.gateway.on("raw_messageCreate", (rawMessage) => {
            this.messages.push({ key: rawMessage.id, value: rawMessage })
            this.emit("messageCreate", rawMessage)
        })
        this.gateway.on("raw_messageUpdate", (rawMessage) => {
            let oldMessage = this.messages.find(a => a.key == rawMessage.id)?.value
            if (oldMessage) {
                this.emit("messageUpdate", oldMessage, rawMessage)
                this.messages[this.messages.findIndex(a=>a==oldMessage)] = rawMessage
            }
        })
        this.gateway.on("raw_messageDelete", (rawPacket) => {
            let rawMessage = this.messages.find(a => a.key == rawPacket.id)?.value
            if (rawMessage) {
            rawMessage.deleted = true;
            this.emit("messageDelete", rawMessage)
            this.messages[this.messages.findIndex(a=>a==rawMessage)] = undefined
            this.messages = this.messages.filter(a=>a)
            }
        })
        this.gateway.on("raw", (packet) => this.emit("raw", packet))
        this.gateway.on("raw_ready", (packet) => {
            this.user = packet.user;
            this.application_id = packet.application.id
            Db.set("session_id", packet.session_id)
            this.emit("ready")
        })
    }
    getToken() {
        return Db.get("token")
    }
}