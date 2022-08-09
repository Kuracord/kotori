let Opcodes = {}
Opcodes[Opcodes.DISPATCH = 0] = "DISPATCH"
Opcodes[Opcodes.HEARTBEAT = 1] = "HEARTBEAT"
Opcodes[Opcodes.IDENTIFY = 2] = "IDENTIFY"
Opcodes[Opcodes.PRESENCE_UPDATE = 3] = "PRESENCE_UPDATE"
Opcodes[Opcodes.VOICE_STATE_UPDATE = 4] = "VOICE_STATE_UPDATE"
Opcodes[Opcodes.RESUME = 6] = "RESUME"
Opcodes[Opcodes.RECONNECT = 7] = "RECONNECT"
Opcodes[Opcodes.REQUEST_GUILD_MEMBERS = 8] = "REQUEST_GUILD_MEMBERS"
Opcodes[Opcodes.INVALID_SESSION = 9] = "INVALID_SESSION"
Opcodes[Opcodes.HELLO = 10] = "HELLO"
Opcodes[Opcodes.HEARTBEAT_ACK = 11] = "HEARTBEAT_ACK"
module.exports = Opcodes
