export interface Packet {
    op: Opcode;
    s?: number;
    t: DispatchEvents | null;
    d: any;
}

export interface SendPacket extends Packet {
    op: ClientOpcode;
    t: null;
}


export enum Opcode {
    Identify = 0,
    Dispatch = 1,
    Resume = 2,
    Ready = 3,
    Hello = 4,
    Heartbeat = 5,
    HeartbeatAck = 6,
}

export type ServerOpcode =
    | Opcode.Dispatch
    | Opcode.Ready
    | Opcode.Hello
    | Opcode.HeartbeatAck;

export type ClientOpcode =
    | Opcode.Identify
    | Opcode.Resume
    | Opcode.Heartbeat;

export type DispatchEvents =
    | "MESSAGE_CREATE"
    | "MESSAGE_UPDATE"
    | "MESSAGE_DELETE"
    | "GUILD_CREATE"
    | "GUILD_UPDATE"
    | "GUILD_DELETE"
    | "CHANNEL_CREATE"
    | "CHANNEL_UPDATE"
    | "CHANNEL_DELETE"
    | "MEMBER_CREATE"
    | "MEMBER_UPDATE"
    | "MEMBER_DELETE"
    | "PRESENCE_UPDATE"
    | "USER_UPDATE"
    | "RELATIONSHIP_UPDATE";

export type ClientStatus = "online" | "idle" | "dnd" | "offline";

export interface IdentifyData {
    token: string;
    presence?: PresenceData;
}

export interface PresenceData {
    status: ClientStatus;
    activities?: Activity[];
}

export interface Activity {
    id: number;
    state?: string;
    name?: string;
    startedAt?: Date | string;
}

export function staticImplements<T>() {
    return <U extends T>(constructor: U) => constructor;
}