declare interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    flags?: number;
    public_flags: number;
    bot?: boolean;
    bio?: string;
    pronouns?: string;
}
declare interface Attachment {
    id: string;
    width?: number;
    height?: number;
    url: string;
    size: number;
    proxy_url: string;
    filename: string;
    cotnent_type: string;
}
declare interface Embed {
    // TODO
}
declare interface Message {
    id: string;
    type: number;
    content?: string;
    channel_id: string;
    guild_id?: string;
    attachments: Array<Attachment>;
    mentions: Array<User>
    mention_roles: Array<string>;
    mention_everyone: boolean;
    member: Member;
    flags: number;
    embeds: Array<Embed>;
    timestamp: string | Date;
    edited_timestamp: string | Date;
}
declare interface Guild {
}
declare interface Channel {
}
declare module "API" {
    export = API;
    class API {
        static getMe(token: string): Promise<User>;
        static sendMessage(client: import("Client"), channelId: string, content: string): Promise<Message>;
        static getGuild(client: import("Client"), guildId: string): Promise<Guild>;
        static getChannel(client: import("Client"), channelId: string): Promise<Channel>;
    }
}
declare module "Gateway" {
    export = Gateway;
    class Gateway {
        constructor(client: import("Client"), options: any);
        client: import("Client");
        ws: any;
        send(packet: any): void;
    }
}
declare module "Client" {
    export = Client;
    class Client {
        constructor(token: string, options?: {});
        selfbot: boolean;
        gateway: Gateway;
        messages: Message[];
        user: User;
        application_id: string;
        get apiUrl(): string;
        getToken(prefix?: boolean): string;
    }
    import Gateway = require("Gateway");
}
declare module "index" {
    export const Client: {
        new (token: string, options?: {}): import("Client");
    };
    export const API: {
        new (): import("API");
        getMe(token: string): Promise<User>;
        sendMessage(client: import("Client"), channelId: string, content: string): Promise<Message>;
        getGuild(client: import("Client"), guildId: string): Promise<Guild>;
        getChannel(client: import("Client"), channelId: string): Promise<Channel>;
    };
}
