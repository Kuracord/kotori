const EventEmitter = require("events")
const WebSocket = require('ws')
const os = require("os")
module.exports = class Gateway extends EventEmitter {
    constructor(client, options) {
        super()
        if (!options) options = {
            url: "wss://gateway.discord.gg",
            version: 9
        }
        this.client = client
        options.url = new URL(options.url)
        options.url.searchParams.set("v", options.version)
        this.ws = new WebSocket(options.url)
        this.ws.on("message", this.handlePacket.bind(this))
    }
    send(packet) {
        if (typeof packet == "object") packet = JSON.stringify(packet)
        this.ws.send(packet)
    }
    handlePacket(packet) {
        packet = JSON.parse(packet)
        this.emit("raw", packet)
        this.sendPacket(packet)
        if (packet.op == 0) switch(packet.t) {
            case "MESSAGE_CREATE":
                this.emit("raw_messageCreate", packet.d)
                break;
            case "MESSAGE_UPDATE":
                this.emit("raw_messageUpdate", packet.d)
                break;
            case "MESSAGE_DELETE":
                this.emit("raw_messageDelete", packet.d)
                break;
            case "READY":
                this.emit("raw_ready", packet.d)
                break;
        }
    }
    sendPacket(packet) {
        switch(packet.op) {
            case 10:
                setInterval(() => {
                    let heartbeat = client.heartbeat_interval
                    heartbeat += 1
                    client.heartbeat_interval = heartbeat
                    this.emit("debug", "[GATEWAY] Sending heartbeat")
                    this.send(JSON.stringify({
                        op: 1,
                        d: heartbeat
                    }))
                }, packet.d.heartbeat_interval * Math.random())
                this.send(JSON.stringify(
                    {
                        op: 2,
                        d: {
                            token: this.client.getToken(),
                            intents: !this.client.selfbot ? 513 : undefined,
                            properties: {
                                "$os": os.platform(),
                                "$browser": "Keneshin/kotori 0.0.1",
                                "$device": os.platform() + os.hostname()
                            }
                        }
                    }
                ))
                break;
            case 1:
                let heartbeat = client.heartbeat_interval
                heartbeat += 1
                client.heartbeat_interval = heartbeat
                this.send(JSON.stringify({
                    op: 1,
                    d: heartbeat
                }))
                break;
            case 11:
                break;
        }
    }
}
