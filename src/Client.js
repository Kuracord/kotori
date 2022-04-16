const EventEmitter = require('events')
const Gateway = require('./Gateway')
const Db = new Map()
// TODO: I HATE EVENTEMITTER
/** Client class */
module.exports = class Client extends EventEmitter {
    /**
    * Create a client instance
    */
    constructor(token, options = {}) {
        super()
        if (!token) throw new Error("Missing token")
        if (token.startsWith("Bot ")) token = token.slice(4)
        if (!options.apiUrl) options.apiUrl = "discord.com/api"
        this.selfbot = !!options.selfbot
        Db.set("apiUrl", options.apiUrl)
        Db.set("token", token)
        Db.set("heartbeat_interval", 0)
        this.gateway = new Gateway(this, options.ws)
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
            if (!this.selfbot) this.application_id = packet.application.id
            Db.set("session_id", packet.session_id)
            this.emit("ready")
        })
    }
    /**
     * Allows to use command handler
     */
    async withCommands(prefix = "!", options = {}) {
        // TODO
    }
    /**
     * Get discord API url
     */
    get apiUrl() {
        return Db.get("apiUrl")
    }
    get heartbeat_interval() {
        return Db.get("heartbeat_interval")
    }
    set heartbeat_interval(value) {
        return Db.set("heartbeat_interval", value)
    }
    /**
     * Get a token that instance uses
     */
    getToken(prefix = true) {
        return prefix ? (!this.selfbot ? "Bot " + Db.get("token") : Db.get("token")) : Db.get("token")
    }
}
