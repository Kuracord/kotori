let Opcodes = {}
//Opcodes[Opcodes.HEARTBEAT = 1] = "HEARTBEAT"
//Opcodes[Opcodes.PRESENCE_UPDATE = 3] = "PRESENCE_UPDATE"
//Opcodes[Opcodes.VOICE_STATE_UPDATE = 4] = "VOICE_STATE_UPDATE"
//Opcodes[Opcodes.RECONNECT = 7] = "RECONNECT"
//Opcodes[Opcodes.REQUEST_GUILD_MEMBERS = 8] = "REQUEST_GUILD_MEMBERS"
//Opcodes[Opcodes.INVALID_SESSION = 9] = "INVALID_SESSION"
//Opcodes[Opcodes.HEARTBEAT_ACK = 11] = "HEARTBEAT_ACK"
Opcodes[Opcodes.IDENTIFY = 0] = "IDENTIFY"
Opcodes[Opcodes.DISPATCH = 1] = "DISPATCH"
Opcodes[Opcodes.RESUME = 2] = "RESUME"
Opcodes[Opcodes.READY = 3] = "READY"
Opcodes[Opcodes.HELLO = 4] = "HELLO"
module.exports = Opcodes
