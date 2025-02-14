import DISPATCH from "./dispatch"
import HELLO from "./hello"
import READY from "./ready"
import {Opcode, Packet} from "../utils";
import Client from "../client";

const handlerList: Handler[] = [
    DISPATCH as unknown as Handler,
    HELLO as unknown as Handler,
    READY as unknown as Handler
]

export interface Handler {
    op: Opcode;
    execute(client: Client, message: Packet): Promise<void> | void
}

export class Handlers {
    public static getHandler(opcode: Opcode): Handler | undefined {
        return handlerList.find((a: Handler) => a.op == opcode);
    }
}